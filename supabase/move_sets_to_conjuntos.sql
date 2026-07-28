-- Agrupa las cuatro combinaciones completas en la categoría Conjuntos.
update public.products
set category = 'conjuntos'
where legacy_id in (27, 28, 29, 35, 36, 37, 48, 49);

