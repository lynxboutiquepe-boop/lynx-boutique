-- Mantiene los costos de compra fuera del catálogo público.
-- Los visitantes solo pueden leer los campos necesarios para comprar.
-- El panel administrador obtiene el registro completo mediante una función protegida.

revoke select on public.products from anon, authenticated;

grant select (
  id,
  legacy_id,
  title,
  slug,
  category,
  price,
  stock,
  sizes,
  images,
  description,
  badge,
  status,
  fit_recommendation,
  sort_order,
  created_at,
  updated_at
) on public.products to anon, authenticated;

create or replace function public.get_admin_products()
returns setof public.products
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Acceso administrativo requerido';
  end if;

  return query
  select product.*
  from public.products as product
  order by product.sort_order asc, product.id asc;
end;
$$;

revoke all on function public.get_admin_products() from public;
grant execute on function public.get_admin_products() to authenticated;
