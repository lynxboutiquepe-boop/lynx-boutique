-- LYNX: registro por correo, consentimiento y código de bienvenida.
-- Ejecutar en Supabase SQL Editor antes de publicar el nuevo flujo.

alter table public.customer_profiles alter column full_name set default '';
alter table public.customer_profiles alter column phone set default '';
alter table public.customer_profiles add column if not exists welcome_discount_sent_at timestamptz;

create table if not exists public.welcome_discount_codes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  code text not null unique,
  discount_percent integer not null default 10 check (discount_percent = 10),
  sent_at timestamptz,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.welcome_discount_codes enable row level security;
revoke all on public.welcome_discount_codes from anon, authenticated;

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
    new.id, '', '', coalesce(new.email, ''), new.email_confirmed_at is not null,
    v_marketing, case when v_marketing then now() else null end
  )
  on conflict (user_id) do update set
    email = excluded.email,
    email_verified = excluded.email_verified,
    marketing_opt_in = excluded.marketing_opt_in,
    marketing_opt_in_at = coalesce(customer_profiles.marketing_opt_in_at, excluded.marketing_opt_in_at);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_customer on auth.users;
create trigger on_auth_user_created_customer
after insert on auth.users
for each row execute function public.handle_new_customer();

-- El envío real se realiza mediante la Edge Function send-welcome-discount.
-- La función debe comprobar email_confirmed_at antes de generar o enviar el código.

-- Validación pública mínima para mostrar el ahorro en el carrito. No expone
-- correos ni permite consultar códigos: solo responde sobre el código exacto.
create or replace function public.preview_welcome_discount(p_code text)
returns table(valid boolean, discount_percent integer)
language sql
stable
security definer
set search_path = public
as $$
  select
    exists (
      select 1 from public.welcome_discount_codes w
      where w.code = upper(trim(coalesce(p_code, '')))
        and w.sent_at is not null
        and w.redeemed_at is null
    ) as valid,
    case when exists (
      select 1 from public.welcome_discount_codes w
      where w.code = upper(trim(coalesce(p_code, '')))
        and w.sent_at is not null
        and w.redeemed_at is null
    ) then 10 else 0 end as discount_percent;
$$;

-- Validación final: el código debe pertenecer al mismo correo ingresado en
-- checkout. El descuento definitivo también se recalcula dentro del pedido.
create or replace function public.validate_welcome_discount(p_code text, p_email text)
returns table(valid boolean, discount_percent integer)
language sql
stable
security definer
set search_path = public
as $$
  select
    exists (
      select 1 from public.welcome_discount_codes w
      where w.code = upper(trim(coalesce(p_code, '')))
        and lower(w.email) = lower(trim(coalesce(p_email, '')))
        and w.sent_at is not null
        and w.redeemed_at is null
    ) as valid,
    case when exists (
      select 1 from public.welcome_discount_codes w
      where w.code = upper(trim(coalesce(p_code, '')))
        and lower(w.email) = lower(trim(coalesce(p_email, '')))
        and w.sent_at is not null
        and w.redeemed_at is null
    ) then 10 else 0 end as discount_percent;
$$;

revoke all on function public.preview_welcome_discount(text) from public;
revoke all on function public.validate_welcome_discount(text,text) from public;
grant execute on function public.preview_welcome_discount(text) to anon, authenticated;
grant execute on function public.validate_welcome_discount(text,text) to anon, authenticated;
