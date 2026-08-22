const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'catalog-seed.json');
const mockupDirectory = path.join(root, 'mockups-agosto-22-finales');
const products = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const mockupFiles = fs.readdirSync(mockupDirectory).filter(file => file.endsWith('-mockup.webp'));
const slugs = new Set(mockupFiles.map(file => file.replace(/-mockup\.webp$/, '')));
let updated = 0;

for (const product of products) {
    if (!slugs.has(product.slug)) continue;
    const mockup = `mockups-agosto-22-finales/${product.slug}-mockup.webp`;
    const originals = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
    product.images = [mockup, ...originals.filter(image => image.replace(/^\//, '') !== mockup)];
    updated += 1;
}

const missingProducts = [...slugs].filter(slug => !products.some(product => product.slug === slug));
if (missingProducts.length) throw new Error(`Mockups sin producto: ${missingProducts.join(', ')}`);
if (updated !== mockupFiles.length) throw new Error(`Se esperaban ${mockupFiles.length} productos y se actualizaron ${updated}`);

fs.writeFileSync(catalogPath, `${JSON.stringify(products, null, 2)}\n`, 'utf8');
console.log(`Mockups integrados: ${updated}. Las fotos originales se conservaron.`);
