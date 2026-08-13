const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'catalog-seed.json'), 'utf8'))
    .filter(product => product.slug && product.status !== 'archived');
const pageDirectory = path.join(root, 'producto');
const errors = [];
const canonicals = new Set();

function match(content, pattern) {
    return content.match(pattern)?.[1] || '';
}

const files = fs.readdirSync(pageDirectory).filter(file => file.endsWith('.html'));
if (files.length !== products.length) errors.push(`Expected ${products.length} product pages, found ${files.length}`);

for (const product of products) {
    const file = path.join(pageDirectory, `${product.slug}.html`);
    if (!fs.existsSync(file)) {
        errors.push(`Missing page for ${product.slug}`);
        continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    const title = match(html, /<title>([^<]+)<\/title>/);
    const description = match(html, /<meta name="description" content="([^"]+)">/);
    const canonical = match(html, /<link rel="canonical" href="([^"]+)">/);
    const h1 = match(html, /<h1 id="product-title">([^<]+)<\/h1>/);
    const schemaSource = match(html, /<script type="application\/ld\+json">([\s\S]+?)<\/script>/);

    if (!title || title.length > 68) errors.push(`Invalid title for ${product.slug}: ${title.length}`);
    if (!description || description.length > 160) errors.push(`Invalid description for ${product.slug}: ${description.length}`);
    if (!canonical.endsWith(`/producto/${product.slug}`)) errors.push(`Invalid canonical for ${product.slug}`);
    if (canonicals.has(canonical)) errors.push(`Duplicate canonical: ${canonical}`);
    canonicals.add(canonical);
    if (!h1) errors.push(`Missing H1 for ${product.slug}`);
    try {
        const schema = JSON.parse(schemaSource);
        const productSchema = schema['@graph']?.find(entry => entry['@type'] === 'Product');
        if (!productSchema?.offers?.price || !productSchema?.offers?.availability) errors.push(`Incomplete Product schema for ${product.slug}`);
    } catch {
        errors.push(`Invalid JSON-LD for ${product.slug}`);
    }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const categoryPaths = [
    '/categoria/hoodies',
    '/categoria/jeans-y-pants',
    '/categoria/conjuntos'
];
const sitemapCount = (sitemap.match(/<url>/g) || []).length;
if (sitemapCount !== products.length + 2 + categoryPaths.length) {
    errors.push(`Expected ${products.length + 2 + categoryPaths.length} sitemap URLs, found ${sitemapCount}`);
}
if (!sitemap.includes('<loc>https://www.lynx.pe/guia/lynx-streetwear-peru</loc>')) errors.push('SEO guide missing from sitemap');
for (const categoryPath of categoryPaths) {
    if (!sitemap.includes(`<loc>https://www.lynx.pe${categoryPath}</loc>`)) {
        errors.push(`Category missing from sitemap: ${categoryPath}`);
    }
    const categoryFile = path.join(root, `${categoryPath}.html`.replace(/^\//, ''));
    if (!fs.existsSync(categoryFile)) {
        errors.push(`Missing category page: ${categoryPath}`);
        continue;
    }
    const categoryHtml = fs.readFileSync(categoryFile, 'utf8');
    if ((categoryHtml.match(/<h1[ >]/g) || []).length !== 1) errors.push(`Category must have one H1: ${categoryPath}`);
    if (!categoryHtml.includes(`<link rel="canonical" href="https://www.lynx.pe${categoryPath}">`)) {
        errors.push(`Invalid category canonical: ${categoryPath}`);
    }
    if (!categoryHtml.includes('"@type":"CollectionPage"') || !categoryHtml.includes('"@type":"ItemList"')) {
        errors.push(`Category structured data incomplete: ${categoryPath}`);
    }
}
const conjuntosHtml = fs.readFileSync(path.join(root, 'categoria', 'conjuntos.html'), 'utf8');
const conjuntoSlugs = [
    'in-the-cut-camo-sweatpants-grey-combo',
    'in-the-cut-camo-zip-up-hoodie-grey-combo',
    'pearl-wildin-camo-button-up-shirt',
    'pearl-wildin-camo-cargo-baggy-pants',
    'ghost-distressed-printed-denim-jacket',
    'baggy-ghost-distressed-printed-jean',
    'saints-rhinestones-oversized-hoodie',
    'saints-rhinestones-sweatpants',
    'lakers-wavey-oversized-zip-hoodie-purple',
    'lakers-wavey-wide-sweatpants-purple'
];
for (const slug of conjuntoSlugs) {
    if (!conjuntosHtml.includes(`/producto/${slug}`)) errors.push(`Conjunto product missing: ${slug}`);
}
if ((conjuntosHtml.match(/class="category-product"/g) || []).length !== conjuntoSlugs.length) {
    errors.push(`Expected ${conjuntoSlugs.length} products in Conjuntos`);
}

const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://www.lynx.pe/sitemap.xml')) errors.push('robots.txt does not declare sitemap');

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (!home.includes('<link rel="canonical" href="https://www.lynx.pe/">')) errors.push('Home canonical missing');
if (!home.includes('"@type": "OnlineStore"')) errors.push('OnlineStore schema missing');
for (const categoryPath of categoryPaths) {
    const categoryFileLink = `${categoryPath.replace(/^\//, '')}.html`;
    const categoryKey = ({
        '/categoria/hoodies': 'hoodies-jackets',
        '/categoria/jeans-y-pants': 'jeans-pants',
        '/categoria/conjuntos': 'conjuntos'
    })[categoryPath];
    if (!home.includes(`href="${categoryPath}"`) && !home.includes(`href="${categoryFileLink}"`) && !home.includes(`data-category="${categoryKey}"`)) {
        errors.push(`Home link missing for ${categoryPath}`);
    }
}
if (!home.includes('https://www.instagram.com/boutique_lynx/') || !home.includes('https://www.tiktok.com/@boutique_lynx')) {
    errors.push('Official social profiles are missing from home');
}

const vercelConfig = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const slugRedirects = JSON.parse(fs.readFileSync(path.join(root, 'product-slug-redirects.json'), 'utf8'));
const productFallback = vercelConfig.rewrites?.find(route =>
    route.source === '/producto/:slug' && route.destination === '/producto?slug=:slug'
);
if (!productFallback) errors.push('Dynamic product fallback is missing from vercel.json');
for (const redirect of slugRedirects) {
    const matchingRoute = vercelConfig.redirects?.find(route =>
        route.source === `/producto/${redirect.old_slug}`
        && route.destination === `/producto/${redirect.canonical_slug}`
        && route.permanent === true
    );
    if (!matchingRoute) errors.push(`Missing permanent redirect for ${redirect.old_slug}`);
    if (!products.some(product => product.slug === redirect.canonical_slug)) {
        errors.push(`Redirect target is not a catalog product: ${redirect.canonical_slug}`);
    }
}

const guide = fs.readFileSync(path.join(root, 'guia', 'lynx-streetwear-peru.html'), 'utf8');
if (!guide.includes('<link rel="canonical" href="https://www.lynx.pe/guia/lynx-streetwear-peru">')) errors.push('SEO guide canonical missing');
if ((guide.match(/<h1[ >]/g) || []).length !== 1) errors.push('SEO guide must have exactly one H1');
if (!guide.includes('"@type": "Article"') || !guide.includes('"@type": "FAQPage"')) errors.push('SEO guide structured data incomplete');

if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`SEO validation passed: ${products.length} product pages, ${sitemapCount} sitemap URLs, unique canonicals and valid Product schema.`);
