-- Corrige los 12 slugs que Admin regeneró al editar títulos.
-- Conserva como canónica la URL ya generada, publicada e indexada.

update public.products
set slug = case legacy_id
  when 2 then 'tyson-lost-saints'
  when 3 then 'stacked-skinny-sun-damage'
  when 14 then 'malcom-x-hoodie'
  when 27 then 'pearl-wildin-camo-button-up-shirt'
  when 28 then 'ghost-distressed-printed-denim-jacket'
  when 29 then 'saints-rhinestones-sweatpants'
  when 30 then 'stacked-skinny-flare-be-brave-be-fearless-embridered-jean'
  when 35 then 'pearl-wildin-camo-cargo-baggy-pants'
  when 36 then 'baggy-ghost-distressed-printed-jean'
  when 37 then 'saints-rhinestones-oversized-hoodie'
  when 48 then 'lakers-wavey-oversized-zip-hoodie-purple'
  when 49 then 'lakers-wavey-wide-sweatpants-purple'
  else slug
end
where legacy_id in (2, 3, 14, 27, 28, 29, 30, 35, 36, 37, 48, 49);

alter table public.products alter column slug set not null;
create unique index if not exists products_slug_unique_idx on public.products (slug);

