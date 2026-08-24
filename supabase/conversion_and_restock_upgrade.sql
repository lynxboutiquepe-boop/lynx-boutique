-- LYNX · favoritos, reposición, ficha técnica, métricas y envío gratis.
-- Ejecutar en Supabase > SQL Editor. Es seguro volver a ejecutarlo.

alter table public.products add column if not exists color text not null default '';
alter table public.products add column if not exists material text not null default '';
alter table public.products add column if not exists fit_type text not null default '';
alter table public.products add column if not exists care_instructions text not null default '';
alter table public.products add column if not exists weight_grams integer;
alter table public.products add column if not exists measurements jsonb not null default '{}'::jsonb;

create table if not exists public.restock_requests (
  id uuid primary key default gen_random_uuid(),
  product_id bigint references public.products(id) on delete cascade,
  product_slug text not null,
  product_title text not null,
  requested_size text not null,
  email text not null,
  channel text not null default 'email' check (channel in ('email','whatsapp')),
  status text not null default 'pending' check (status in ('pending','notified','cancelled')),
  created_at timestamptz not null default now(),
  notified_at timestamptz
);

create unique index if not exists restock_requests_pending_unique
on public.restock_requests(product_id, requested_size, lower(email))
where status = 'pending';

create index if not exists restock_requests_status_date_idx
on public.restock_requests(status, created_at desc);

alter table public.restock_requests enable row level security;

drop policy if exists "Public can request restock" on public.restock_requests;
create policy "Public can request restock"
on public.restock_requests for insert to anon, authenticated
with check (
  status = 'pending'
  and channel = 'email'
  and char_length(trim(product_slug)) between 2 and 180
  and char_length(trim(requested_size)) between 1 and 20
  and email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
);

drop policy if exists "Admins can manage restock" on public.restock_requests;
create policy "Admins can manage restock"
on public.restock_requests for all to authenticated
using (public.is_admin()) with check (public.is_admin());

grant insert on public.restock_requests to anon, authenticated;
grant select, update on public.restock_requests to authenticated;

create table if not exists public.commerce_events (
  id bigint generated always as identity primary key,
  session_id text not null,
  event_name text not null,
  page_path text not null default '/',
  device_type text not null default 'unknown',
  source text not null default 'direct',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists commerce_events_name_date_idx on public.commerce_events(event_name, created_at desc);
create index if not exists commerce_events_session_idx on public.commerce_events(session_id, created_at);
alter table public.commerce_events enable row level security;
drop policy if exists "Public can record commerce events" on public.commerce_events;
create policy "Public can record commerce events" on public.commerce_events
for insert to anon, authenticated with check (
  char_length(session_id) between 8 and 100
  and char_length(event_name) between 3 and 40
  and jsonb_typeof(payload) = 'object'
);
drop policy if exists "Admins can read commerce events" on public.commerce_events;
create policy "Admins can read commerce events" on public.commerce_events
for select to authenticated using (public.is_admin());
grant insert on public.commerce_events to anon, authenticated;
grant select on public.commerce_events to authenticated;

do $$
declare constraint_name text;
begin
  select conname into constraint_name
  from pg_constraint
  where conrelid = 'public.commerce_events'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) ilike '%event_name%'
  limit 1;
  if constraint_name is not null then
    execute format('alter table public.commerce_events drop constraint %I', constraint_name);
  end if;
end $$;

alter table public.commerce_events
add constraint commerce_events_event_name_check check (event_name in (
  'page_view','view_item_list','search','view_item','select_item',
  'add_to_cart','view_cart','begin_checkout','shipping_selected',
  'generate_lead','discount_signup','discount_verified',
  'favorite_added','favorite_removed','favorites_filter',
  'view_related','select_related','restock_requested','free_shipping_reached'
));

-- La función de pedidos se actualiza desde orders_and_stock.sql. Su versión
-- actual deja el envío por motorizado en S/ 0 cuando el total después del
-- descuento llega a S/ 349.90. Shalom conserva flete por pagar en agencia.
