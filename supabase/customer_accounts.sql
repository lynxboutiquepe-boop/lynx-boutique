-- LYNX Boutique: registro de clientes y consentimiento para novedades.
-- Ejecutar una vez en Supabase > SQL Editor.

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

create index if not exists customer_profiles_created_at_idx on public.customer_profiles(created_at desc);
create index if not exists customer_profiles_marketing_idx on public.customer_profiles(marketing_opt_in) where marketing_opt_in = true;

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

alter table public.customer_profiles enable row level security;

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
