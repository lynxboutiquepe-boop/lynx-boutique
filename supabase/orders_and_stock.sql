-- LYNX: pedidos iniciados desde la web y confirmación administrativa.
-- No descuenta stock al abrir WhatsApp. El stock se descuenta solo cuando
-- una administradora confirma que el cliente realmente hizo el pedido.

alter table public.products add column if not exists size_stock jsonb not null default '{}'::jsonb;
alter table public.sales add column if not exists size text not null default '';

grant select (size_stock) on public.products to anon, authenticated;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique default ('LX-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  status text not null default 'pending_whatsapp' check (status in ('pending_whatsapp','confirmed','paid','shipped','completed','cancelled')),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  customer_dni text not null default '',
  city text not null,
  delivery_address text not null,
  shipping_method text not null check (shipping_method in ('shalom','lima')),
  payment_method text not null check (payment_method in ('yape-plin','transferencia','tarjeta-link')),
  discount_code text not null default '',
  discount_percent integer not null default 0 check (discount_percent between 0 and 100),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  shipping_cost numeric(12,2) not null default 0 check (shipping_cost >= 0),
  total numeric(12,2) not null check (total >= 0),
  customer_user_id uuid references auth.users(id) on delete set null,
  confirmed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.orders add column if not exists discount_percent integer not null default 0;
alter table public.orders add column if not exists discount_amount numeric(12,2) not null default 0;

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id bigint not null references public.products(id),
  product_title text not null,
  size text not null,
  quantity integer not null check (quantity > 0 and quantity <= 20),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) not null check (line_total >= 0)
);

create index if not exists orders_status_date_idx on public.orders(status, created_at desc);
create index if not exists order_items_order_idx on public.order_items(order_id);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at before update on public.orders
for each row execute function public.set_updated_at();

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Admins can read orders" on public.orders;
create policy "Admins can read orders" on public.orders for select to authenticated using (public.is_admin());
drop policy if exists "Admins can update orders" on public.orders;
create policy "Admins can update orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "Admins can read order items" on public.order_items;
create policy "Admins can read order items" on public.order_items for select to authenticated using (public.is_admin());

grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;

create or replace function public.register_sale_with_size(
  p_product_id bigint,
  p_quantity integer,
  p_size text default '',
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
  v_size_stock integer;
begin
  if not public.is_admin() then raise exception 'Acceso no autorizado'; end if;
  if p_quantity is null or p_quantity <= 0 then raise exception 'La cantidad debe ser mayor que cero'; end if;
  select * into v_product from public.products where id=p_product_id for update;
  if not found then raise exception 'Producto no encontrado'; end if;
  if v_product.status in ('sold_out','archived') then raise exception 'Este producto no está disponible'; end if;
  if v_product.status <> 'preorder' and v_product.stock < p_quantity then raise exception 'Stock insuficiente'; end if;
  if trim(coalesce(p_size,'')) <> '' and v_product.size_stock ? trim(p_size) then
    v_size_stock := coalesce((v_product.size_stock->>trim(p_size))::integer,0);
    if v_product.status <> 'preorder' and v_size_stock < p_quantity then raise exception 'Stock insuficiente en talla %',p_size; end if;
  end if;

  v_total := v_product.price*p_quantity;
  v_new_stock := greatest(v_product.stock-p_quantity,0);
  insert into public.sales(product_id,quantity,unit_price,total,size,note,created_by)
  values(v_product.id,p_quantity,v_product.price,v_total,trim(coalesce(p_size,'')),coalesce(p_note,''),auth.uid()) returning id into v_sale_id;
  update public.products set
    stock=v_new_stock,
    size_stock=case when trim(coalesce(p_size,''))<>'' and size_stock ? trim(p_size)
      then jsonb_set(size_stock,array[trim(p_size)],to_jsonb(greatest(coalesce((size_stock->>trim(p_size))::integer,0)-p_quantity,0)),true)
      else size_stock end,
    status=case when v_product.status='preorder' then 'preorder' when v_new_stock=0 then 'sold_out' when v_new_stock<=2 then 'low_stock' else 'available' end
  where id=v_product.id;
  insert into public.finance_entries(entry_type,category,amount,description,entry_date,sale_id,created_by)
  values('income','Venta automática',v_total,v_product.title||' x'||p_quantity||case when trim(coalesce(p_size,''))<>'' then ' · talla '||p_size else '' end,current_date,v_sale_id,auth.uid());
  return v_sale_id;
end;
$$;

revoke all on function public.register_sale_with_size(bigint,integer,text,text) from public;
grant execute on function public.register_sale_with_size(bigint,integer,text,text) to authenticated;

create or replace function public.create_whatsapp_order(
  p_customer_name text,
  p_customer_phone text,
  p_customer_email text,
  p_customer_dni text,
  p_city text,
  p_delivery_address text,
  p_shipping_method text,
  p_payment_method text,
  p_discount_code text,
  p_items jsonb
)
returns table(order_id uuid, order_code text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order_id uuid;
  v_order_code text;
  v_item jsonb;
  v_product public.products%rowtype;
  v_qty integer;
  v_size text;
  v_subtotal numeric(12,2) := 0;
  v_shipping numeric(12,2) := 0;
  v_discount_percent integer := 0;
  v_discount_amount numeric(12,2) := 0;
begin
  if char_length(trim(coalesce(p_customer_name,''))) < 3 then raise exception 'Nombre inválido'; end if;
  if char_length(trim(coalesce(p_customer_phone,''))) < 9 then raise exception 'WhatsApp inválido'; end if;
  if position('@' in coalesce(p_customer_email,'')) < 2 then raise exception 'Correo inválido'; end if;
  if p_shipping_method not in ('shalom','lima') then raise exception 'Envío inválido'; end if;
  if p_payment_method not in ('yape-plin','transferencia','tarjeta-link') then raise exception 'Pago inválido'; end if;
  if p_shipping_method = 'shalom' and p_customer_dni !~ '^[0-9]{8}$' then raise exception 'DNI inválido'; end if;
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items) > 20 then raise exception 'Pedido inválido'; end if;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_qty := greatest(1, least(20, coalesce((v_item->>'quantity')::integer, 1)));
    v_size := left(trim(coalesce(v_item->>'size','ÚNICA')), 20);
    select * into v_product from public.products where id = (v_item->>'product_id')::bigint for share;
    if not found or v_product.status in ('sold_out','archived') then raise exception 'Una prenda ya no está disponible'; end if;
    if v_product.status <> 'preorder' and v_product.stock < v_qty then raise exception 'Stock insuficiente para %', v_product.title; end if;
    if v_product.status <> 'preorder' and v_product.size_stock ? v_size and coalesce((v_product.size_stock->>v_size)::integer,0) < v_qty then raise exception 'Stock insuficiente en talla % para %',v_size,v_product.title; end if;
    v_subtotal := v_subtotal + (v_product.price * v_qty);
  end loop;

  if trim(coalesce(p_discount_code,'')) <> '' then
    select w.discount_percent into v_discount_percent
    from public.welcome_discount_codes w
    where w.code = upper(trim(p_discount_code))
      and lower(w.email) = lower(trim(p_customer_email))
      and w.sent_at is not null
      and w.redeemed_at is null
    for share;
    if not found then raise exception 'Código de descuento inválido, usado o vinculado a otro correo'; end if;
    v_discount_amount := round(v_subtotal * v_discount_percent / 100.0, 2);
  end if;

  if p_shipping_method = 'lima' then v_shipping := 15; end if;
  insert into public.orders (
    customer_name,customer_phone,customer_email,customer_dni,city,delivery_address,
    shipping_method,payment_method,discount_code,discount_percent,discount_amount,
    subtotal,shipping_cost,total,customer_user_id
  ) values (
    trim(p_customer_name),trim(p_customer_phone),lower(trim(p_customer_email)),trim(coalesce(p_customer_dni,'')),
    trim(p_city),trim(p_delivery_address),p_shipping_method,p_payment_method,upper(trim(coalesce(p_discount_code,''))),
    v_discount_percent,v_discount_amount,v_subtotal,v_shipping,v_subtotal-v_discount_amount+v_shipping,auth.uid()
  ) returning id, orders.order_code into v_order_id, v_order_code;

  for v_item in select * from jsonb_array_elements(p_items)
  loop
    v_qty := greatest(1, least(20, coalesce((v_item->>'quantity')::integer, 1)));
    v_size := left(trim(coalesce(v_item->>'size','ÚNICA')), 20);
    select * into v_product from public.products where id = (v_item->>'product_id')::bigint;
    insert into public.order_items(order_id,product_id,product_title,size,quantity,unit_price,line_total)
    values(v_order_id,v_product.id,v_product.title,v_size,v_qty,v_product.price,v_product.price*v_qty);
  end loop;

  return query select v_order_id,v_order_code;
end;
$$;

revoke all on function public.create_whatsapp_order(text,text,text,text,text,text,text,text,text,jsonb) from public;
grant execute on function public.create_whatsapp_order(text,text,text,text,text,text,text,text,text,jsonb) to anon, authenticated;

create or replace function public.confirm_web_order(p_order_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_item public.order_items%rowtype;
  v_discount_user_id uuid;
begin
  if not public.is_admin() then raise exception 'Acceso no autorizado'; end if;
  select * into v_order from public.orders where id = p_order_id for update;
  if not found then raise exception 'Pedido no encontrado'; end if;
  if v_order.status <> 'pending_whatsapp' then raise exception 'Este pedido ya fue procesado'; end if;

  if trim(coalesce(v_order.discount_code,'')) <> '' then
    select w.user_id into v_discount_user_id
    from public.welcome_discount_codes w
    where w.code = v_order.discount_code
      and lower(w.email) = lower(v_order.customer_email)
      and w.sent_at is not null
      and w.redeemed_at is null
    for update;
    if not found then raise exception 'El código de descuento ya fue usado o dejó de ser válido'; end if;
  end if;

  for v_item in select * from public.order_items where order_id = p_order_id order by id
  loop
    perform public.register_sale_with_size(v_item.product_id,v_item.quantity,v_item.size,'Pedido web ' || v_order.order_code);
  end loop;

  if v_discount_user_id is not null then
    update public.welcome_discount_codes set redeemed_at = now() where user_id = v_discount_user_id;
  end if;

  update public.orders set status='confirmed',confirmed_by=auth.uid(),confirmed_at=now() where id=p_order_id;
end;
$$;

revoke all on function public.confirm_web_order(uuid) from public;
grant execute on function public.confirm_web_order(uuid) to authenticated;
