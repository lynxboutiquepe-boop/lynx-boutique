const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'catalog-seed.json'), 'utf8'))
    .filter(product => product.status !== 'archived');
const errors = [];

function localPath(source = '') {
    if (!source || /^https?:\/\//i.test(source)) return null;
    return path.join(root, source.replace(/^\.?[\\/]+/, ''));
}

for (const product of products) {
    if (!product.slug) errors.push(`Producto sin slug: ${product.title}`);
    if (!Array.isArray(product.images) || !product.images.length) {
        errors.push(`Producto sin imágenes: ${product.slug || product.title}`);
        continue;
    }
    for (const source of product.images) {
        const file = localPath(source);
        if (file && !fs.existsSync(file)) errors.push(`Imagen ausente: ${source}`);
    }
    const page = path.join(root, 'producto', `${product.slug}.html`);
    if (!fs.existsSync(page)) errors.push(`Ficha ausente: ${product.slug}`);
}

const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const accountFile of ['cuenta.html', 'cuenta.css', 'cuenta.js']) {
    if (!fs.existsSync(path.join(root, accountFile))) errors.push(`Falta archivo de cuenta: ${accountFile}`);
}
for (const required of [
    'id="trending-track"',
    'class="trending-card-image product-detail-link"',
    'href="/cuenta"',
    'product-image-overrides.js?v=20260822-mockups-v1',
    'app.js?v=20260822-commerce-v27',
    'tiktok-videos.js?v=20260813-controls-fix-v3'
]) {
    if (!home.includes(required) && !fs.readFileSync(path.join(root, 'app.js'), 'utf8').includes(required)) {
        errors.push(`Falta referencia crítica: ${required}`);
    }
}

for (const required of [
    'id="checkout-email"',
    'name="payment-method"',
    'id="checkout-review-panel"',
    'id="review-fit"',
    'href="/guia/tallas"'
]) {
    if (!home.includes(required)) errors.push(`Falta flujo comercial: ${required}`);
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const required of ['validateCartStock', 'create_whatsapp_order', 'getAvailableProductSize']) {
    if (!app.includes(required)) errors.push(`Falta validación de comercio: ${required}`);
}

for (const file of [
    'size-guide-data.js',
    'guia-tallas.css',
    'guia/tallas.html',
    'supabase/orders_and_stock.sql',
    'supabase/review_fit_metadata.sql',
    'supabase/functions/send-order-confirmation/index.ts'
]) {
    if (!fs.existsSync(path.join(root, file))) errors.push(`Falta archivo de actualización: ${file}`);
}

const ids = [...home.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
for (const id of new Set(ids)) {
    if (ids.filter(candidate => candidate === id).length > 1) errors.push(`ID duplicado en Home: ${id}`);
}

if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`Storefront validado: ${products.length} productos, fichas e imágenes locales presentes.`);
