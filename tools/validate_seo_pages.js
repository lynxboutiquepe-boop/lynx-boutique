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
const sitemapCount = (sitemap.match(/<url>/g) || []).length;
if (sitemapCount !== products.length + 1) errors.push(`Expected ${products.length + 1} sitemap URLs, found ${sitemapCount}`);

const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap: https://lynx-boutique.vercel.app/sitemap.xml')) errors.push('robots.txt does not declare sitemap');

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (!home.includes('<link rel="canonical" href="https://lynx-boutique.vercel.app/">')) errors.push('Home canonical missing');
if (!home.includes('"@type": "OnlineStore"')) errors.push('OnlineStore schema missing');

if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`SEO validation passed: ${products.length} product pages, ${sitemapCount} sitemap URLs, unique canonicals and valid Product schema.`);
