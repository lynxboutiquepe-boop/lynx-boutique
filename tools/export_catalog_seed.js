const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const appPath = path.join(projectRoot, 'app.js');
const outputPath = path.join(projectRoot, 'catalog-seed.json');
const sqlOutputPath = path.join(projectRoot, 'supabase', 'seed.sql');
const source = fs.readFileSync(appPath, 'utf8');
const marker = '\nlet PRODUCTS = [];';
const markerIndex = source.indexOf(marker);

if (markerIndex < 0) {
    throw new Error('No se encontró el final de DEFAULT_PRODUCTS en app.js');
}

const catalogSource = source.slice(0, markerIndex);
const products = new Function(`${catalogSource}\nreturn DEFAULT_PRODUCTS;`)();

function slugFor(product) {
    const asset = product.images?.find(image => /^assets\//.test(image));
    const folderMatch = asset?.match(/^assets\/([^/]+)\//);
    if (folderMatch) return folderMatch[1];

    return product.title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

const seed = products.map((product, index) => {
    const stock = Number.isInteger(product.stock) ? product.stock : 1;
    const isLowStock = /última|limitad|stock/i.test(product.badge || '') || stock <= 2;

    return {
        legacy_id: product.id,
        title: product.title,
        slug: slugFor(product),
        category: product.category,
        price: product.price,
        cost: 0,
        stock,
        sizes: product.sizes || ['S', 'M', 'L', 'XL'],
        images: product.images || [product.image].filter(Boolean),
        description: product.description || '',
        badge: product.badge || 'NUEVO',
        status: isLowStock ? 'low_stock' : 'available',
        fit_recommendation: product.fitRecommendation !== false,
        sort_order: index + 1
    };
});

const seedJson = JSON.stringify(seed, null, 2);
const seedSql = `-- LYNX Boutique: catálogo inicial generado desde app.js.
-- Puede ejecutarse varias veces sin duplicar productos.

insert into public.products (
  legacy_id, title, slug, category, price, cost, stock, sizes, images,
  description, badge, status, fit_recommendation, sort_order
)
select
  legacy_id, title, slug, category, price, cost, stock, sizes, images,
  description, badge, status, fit_recommendation, sort_order
from jsonb_to_recordset($lynx_catalog$
${seedJson}
$lynx_catalog$::jsonb) as catalog(
  legacy_id integer,
  title text,
  slug text,
  category text,
  price numeric,
  cost numeric,
  stock integer,
  sizes text[],
  images text[],
  description text,
  badge text,
  status text,
  fit_recommendation boolean,
  sort_order integer
)
on conflict (legacy_id) do update set
  title = excluded.title,
  slug = excluded.slug,
  category = excluded.category,
  price = excluded.price,
  sizes = excluded.sizes,
  images = excluded.images,
  description = excluded.description,
  badge = excluded.badge,
  fit_recommendation = excluded.fit_recommendation,
  sort_order = excluded.sort_order;
`;

fs.writeFileSync(outputPath, `${seedJson}\n`, 'utf8');
fs.writeFileSync(sqlOutputPath, seedSql, 'utf8');
console.log(`Catálogo exportado: ${seed.length} productos -> ${outputPath}`);
console.log(`SQL generado -> ${sqlOutputPath}`);
