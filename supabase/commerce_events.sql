-- LYNX CRO: embudo anónimo y respetuoso de privacidad.
-- Ejecutar en Supabase > SQL Editor. No guarda nombres, teléfonos ni direcciones.

create table if not exists public.commerce_events (
  id bigint generated always as identity primary key,
  session_id text not null,
  event_name text not null check (event_name in (
    'page_view', 'view_item_list', 'search', 'view_item', 'select_item',
    'add_to_cart', 'view_cart', 'begin_checkout', 'shipping_selected',
    'generate_lead', 'discount_signup', 'discount_verified'
  )),
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
create policy "Public can record commerce events"
on public.commerce_events for insert
to anon, authenticated
with check (
  char_length(session_id) between 8 and 100
  and char_length(event_name) between 3 and 40
  and jsonb_typeof(payload) = 'object'
);

drop policy if exists "Admins can read commerce events" on public.commerce_events;
create policy "Admins can read commerce events"
on public.commerce_events for select
to authenticated
using (public.is_admin());

grant insert on public.commerce_events to anon, authenticated;
grant select on public.commerce_events to authenticated;
