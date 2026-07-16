-- LYNX Boutique: esquema seguro para catálogo, inventario y caja.
-- Ejecutar una sola vez en Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text not null,
  email text not null,
  email_verified boolean not null default false,
  marketing_opt_in boolean not null default false,
  marketing_opt_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.customer_profiles add column if not exists email_verified boolean not null default false;

create table if not exists public.products (
  id bigint generated always as identity primary key,
  legacy_id integer unique,
  title text not null,
  slug text,
  category text not null check (category in ('hoodies-jackets', 't-shirts', 'jeans-pants', 'conjuntos')),
  price numeric(12,2) not null check (price >= 0),
  cost numeric(12,2) not null default 0 check (cost >= 0),
  stock integer not null default 0 check (stock >= 0),
  sizes text[] not null default '{}',
  images text[] not null default '{}',
  description text not null default '',
  badge text not null default 'NUEVO',
  status text not null default 'available' check (status in ('available', 'low_stock', 'sold_out', 'preorder', 'archived')),
  fit_recommendation boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  product_id bigint not null references public.products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  total numeric(12,2) not null check (total >= 0),
  note text not null default '',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.finance_entries (
  id uuid primary key default gen_random_uuid(),
  entry_type text not null check (entry_type in ('income', 'expense')),
  category text not null,
  amount numeric(12,2) not null check (amount > 0),
  description text not null,
  entry_date date not null default current_date,
  sale_id uuid unique references public.sales(id) on delete set null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists products_status_idx on public.products(status);
create index if not exists products_category_idx on public.products(category);
create index if not exists finance_entries_date_idx on public.finance_entries(entry_date desc);
create index if not exists sales_created_at_idx on public.sales(created_at desc);
create index if not exists customer_profiles_created_at_idx on public.customer_profiles(created_at desc);
create index if not exists customer_profiles_marketing_idx on public.customer_profiles(marketing_opt_in) where marketing_opt_in = true;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists customer_profiles_set_updated_at on public.customer_profiles;
create trigger customer_profiles_set_updated_at
before update on public.customer_profiles
for each row execute function public.set_updated_at();

create or replace function public.handle_new_customer()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_marketing boolean;
begin
  v_marketing := lower(coalesce(new.raw_user_meta_data ->> 'marketing_opt_in', 'false')) in ('true', '1', 'yes', 'si', 'sí');
  insert into public.customer_profiles (user_id, full_name, phone, email, email_verified, marketing_opt_in, marketing_opt_in_at)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(coalesce(new.email, ''), '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    coalesce(new.email, ''),
    new.email_confirmed_at is not null,
    v_marketing,
    case when v_marketing then now() else null end
  )
  on conflict (user_id) do update set email = excluded.email, email_verified = excluded.email_verified;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_customer on auth.users;
create trigger on_auth_user_created_customer
after insert on auth.users
for each row execute function public.handle_new_customer();

create or replace function public.sync_customer_email_verified()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.customer_profiles
  set email = coalesce(new.email, email),
      email_verified = new.email_confirmed_at is not null
  where user_id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_email_verified on auth.users;
create trigger on_auth_user_email_verified
after update of email, email_confirmed_at on auth.users
for each row execute function public.sync_customer_email_verified();

update public.customer_profiles as profile
set email = coalesce(auth_user.email, profile.email),
    email_verified = auth_user.email_confirmed_at is not null
from auth.users as auth_user
where profile.user_id = auth_user.id;

create or replace function public.register_sale(
  p_product_id bigint,
  p_quantity integer,
  p_note text default ''
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_product public.products%rowtype;
  v_sale_id uuid;
  v_total numeric(12,2);
  v_new_stock integer;
begin
  if not public.is_admin() then
    raise exception 'Acceso no autorizado';
  end if;

  if p_quantity is null or p_quantity <= 0 then
    raise exception 'La cantidad debe ser mayor que cero';
  end if;

  select * into v_product
  from public.products
  where id = p_product_id
  for update;

  if not found then
    raise exception 'Producto no encontrado';
  end if;

  if v_product.status in ('sold_out', 'archived') then
    raise exception 'Este producto no está disponible para venta';
  end if;

  if v_product.status <> 'preorder' and v_product.stock < p_quantity then
    raise exception 'Stock insuficiente';
  end if;

  v_total := v_product.price * p_quantity;
  v_new_stock := greatest(v_product.stock - p_quantity, 0);

  insert into public.sales (product_id, quantity, unit_price, total, note, created_by)
  values (v_product.id, p_quantity, v_product.price, v_total, coalesce(p_note, ''), auth.uid())
  returning id into v_sale_id;

  update public.products
  set stock = v_new_stock,
      status = case
        when v_product.status = 'preorder' then 'preorder'
        when v_new_stock = 0 then 'sold_out'
        when v_new_stock <= 2 then 'low_stock'
        else 'available'
      end
  where id = v_product.id;

  insert into public.finance_entries (
    entry_type, category, amount, description, entry_date, sale_id, created_by
  ) values (
    'income',
    'Venta automática',
    v_total,
    v_product.title || ' x' || p_quantity,
    current_date,
    v_sale_id,
    auth.uid()
  );

  return v_sale_id;
end;
$$;

revoke all on function public.register_sale(bigint, integer, text) from public;
grant execute on function public.register_sale(bigint, integer, text) to authenticated;

alter table public.admin_users enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.products enable row level security;
alter table public.sales enable row level security;
alter table public.finance_entries enable row level security;

drop policy if exists "Admin can read own role" on public.admin_users;
create policy "Admin can read own role"
on public.admin_users for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Customers and admins can read profiles" on public.customer_profiles;
create policy "Customers and admins can read profiles"
on public.customer_profiles for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

drop policy if exists "Customers can create own profile" on public.customer_profiles;
create policy "Customers can create own profile"
on public.customer_profiles for insert
to authenticated
with check (user_id = auth.uid());

drop policy if exists "Customers can update own profile" on public.customer_profiles;
create policy "Customers can update own profile"
on public.customer_profiles for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

grant select, insert, update on public.customer_profiles to authenticated;

drop policy if exists "Public can read catalog products" on public.products;
create policy "Public can read catalog products"
on public.products for select
to anon, authenticated
using (status <> 'archived');

drop policy if exists "Admin can read archived products" on public.products;
create policy "Admin can read archived products"
on public.products for select
to authenticated
using (public.is_admin());

drop policy if exists "Admin can insert products" on public.products;
create policy "Admin can insert products"
on public.products for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admin can update products" on public.products;
create policy "Admin can update products"
on public.products for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can delete products" on public.products;
create policy "Admin can delete products"
on public.products for delete
to authenticated
using (public.is_admin());

drop policy if exists "Admin can manage sales" on public.sales;
create policy "Admin can manage sales"
on public.sales for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admin can manage finances" on public.finance_entries;
create policy "Admin can manage finances"
on public.finance_entries for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects for select
to public
using (bucket_id = 'product-images');

drop policy if exists "Admin can upload product images" on storage.objects;
create policy "Admin can upload product images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admin can update product images" on storage.objects;
create policy "Admin can update product images"
on storage.objects for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admin can delete product images" on storage.objects;
create policy "Admin can delete product images"
on storage.objects for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());
