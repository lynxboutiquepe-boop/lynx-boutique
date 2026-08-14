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
for (const required of [
    'id="trending-track"',
    'class="trending-card-image product-detail-link"',
    'app.js?v=20260814-modal-gallery-v13',
    'tiktok-videos.js?v=20260813-controls-fix-v3'
]) {
    if (!home.includes(required) && !fs.readFileSync(path.join(root, 'app.js'), 'utf8').includes(required)) {
        errors.push(`Falta referencia crítica: ${required}`);
    }
}

if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
}

console.log(`Storefront validado: ${products.length} productos, fichas e imágenes locales presentes.`);
