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
