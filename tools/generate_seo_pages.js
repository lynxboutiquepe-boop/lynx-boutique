const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'catalog-seed.json'), 'utf8'));
const origin = 'https://www.lynx.pe';
const outputDirectory = path.join(root, 'producto');
const lastModified = '2026-07-18';

function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
}

function absoluteUrl(value = '') {
    const source = String(value).trim();
    if (/^https?:\/\//i.test(source)) return source;
    return `${origin}/${source.replace(/^\.?[\\/]+/, '')}`;
}

function optimizedStoreImage(value = '') {
    return String(value).replace(
        /(mockups-finales\/[^?#]+)\.png(?=([?#]|$))/i,
        '$1.webp'
    );
}

function statusContent(product) {
    if (product.status === 'sold_out') {
        return { badge: 'AGOTADO', note: 'AGOTADO POR EL MOMENTO', availability: 'https://schema.org/OutOfStock', sold: true };
    }
    if (product.status === 'preorder') {
        return { badge: 'PREVENTA', note: 'PREVENTA · RESERVA TU PRENDA', availability: 'https://schema.org/PreOrder', sold: false };
    }
    if (product.status === 'low_stock') {
        return { badge: product.badge || 'ÚLTIMAS UNIDADES', note: 'ÚLTIMAS UNIDADES DISPONIBLES', availability: 'https://schema.org/LimitedAvailability', sold: false };
    }
    return {
        badge: product.badge || 'NUEVO DROP',
        note: `${product.stock || 0} ${(product.stock || 0) === 1 ? 'UNIDAD DISPONIBLE' : 'UNIDADES DISPONIBLES'}`,
        availability: (product.stock || 0) > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        sold: (product.stock || 0) < 1
    };
}

function categoryLabel(category) {
    return ({
        'hoodies-jackets': 'Hoodies y jackets',
        'jeans-pants': 'Jeans y pantalones',
        't-shirts': 'T-shirts',
        'conjuntos': 'Conjuntos'
    })[category] || 'Streetwear';
}

function descriptionFor(product) {
    const core = String(product.description || '').replace(/\s+/g, ' ').trim();
    const candidate = `${core} Envíos a todo el Perú.`.trim();
    if (candidate.length <= 160) return candidate;
    const shortened = candidate.slice(0, 157).replace(/\s+\S*$/, '').replace(/[\s,;:.]+$/, '');
    return `${shortened}.`;
}

function titleFor(product) {
    const suffix = ' | LYNX Boutique Perú';
    const fullTitle = `${product.title}${suffix}`;
    if (fullTitle.length <= 68) return fullTitle;
    const available = 68 - suffix.length;
    const shortened = product.title.slice(0, available).replace(/\s+\S*$/, '').replace(/[\s,;:.-]+$/, '');
    return `${shortened}${suffix}`;
}

function productPage(product) {
    const url = `${origin}/producto/${encodeURIComponent(product.slug)}`;
    const images = Array.isArray(product.images) && product.images.length
        ? product.images.filter(Boolean).map(optimizedStoreImage)
        : ['assets/logo-transparent.png'];
    const imageUrls = images.map(absoluteUrl);
    const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['ÚNICA'];
    const status = statusContent(product);
    const title = titleFor(product);
    const description = descriptionFor(product);
    const checkoutId = product.legacy_id ?? product.id;
    const buyUrl = `/?producto=${encodeURIComponent(checkoutId)}&comprar=1&talla=${encodeURIComponent(sizes[0])}&cantidad=1`;
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Product',
                '@id': `${url}#product`,
                name: product.title,
                description: product.description,
                image: imageUrls,
                sku: `LYNX-${checkoutId}`,
                category: categoryLabel(product.category),
                size: sizes.join(', '),
                offers: {
                    '@type': 'Offer',
                    url,
                    priceCurrency: 'PEN',
                    price: Number(product.price).toFixed(2),
                    availability: status.availability,
                    itemCondition: 'https://schema.org/NewCondition',
                    seller: { '@id': `${origin}/#store` }
                }
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'LYNX Boutique Perú', item: `${origin}/` },
                    { '@type': 'ListItem', position: 2, name: product.title, item: url }
                ]
            }
        ]
    };
    const schemaJson = JSON.stringify(schema).replace(/</g, '\\u003c');
    const thumbnails = images.map((source, index) => `
                        <button type="button" class="${index === 0 ? 'active' : ''}" aria-label="Ver foto ${index + 1} de ${escapeHtml(product.title)}">
                            <img src="${escapeHtml(absoluteUrl(source))}" alt="" loading="${index === 0 ? 'eager' : 'lazy'}" fetchpriority="${index === 0 ? 'high' : 'low'}">
                        </button>`).join('');
    const sizeButtons = sizes.map((size, index) => `<button type="button" class="${index === 0 ? 'active' : ''}">${escapeHtml(size)}</button>`).join('');

    return `<!DOCTYPE html>
<html lang="es-PE">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#ffffff">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
    <link rel="canonical" href="${escapeHtml(url)}">
    <link rel="icon" type="image/png" href="/assets/favicon-lynx.png?v=20260716-v1">
    <link rel="apple-touch-icon" href="/assets/favicon-lynx.png?v=20260716-v1">
    <meta property="og:locale" content="es_PE">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="LYNX Boutique Perú">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(url)}">
    <meta property="og:image" content="${escapeHtml(imageUrls[0])}">
    <meta property="og:image:alt" content="${escapeHtml(product.title)}">
    <meta property="product:price:amount" content="${Number(product.price).toFixed(2)}">
    <meta property="product:price:currency" content="PEN">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${escapeHtml(imageUrls[0])}">
    <script type="application/ld+json">${schemaJson}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/producto.css?v=20260718-responsive-v6">
</head>
<body>
    <header class="product-header">
        <a class="product-logo" href="/" aria-label="Volver a LYNX Boutique Perú"><img src="/assets/logo-transparent.png" alt="LYNX Boutique Perú"></a>
        <a class="back-link" href="/#catalog">← VOLVER AL CATÁLOGO</a>
    </header>

    <main class="product-page" id="product-page" aria-live="polite">
        <section class="product-loading" id="product-loading" hidden><span class="loading-mark"></span><p>Actualizando prenda...</p></section>
        <section class="product-not-found" id="product-not-found" hidden>
            <p class="eyebrow">LYNX BOUTIQUE</p><h1>Esta prenda ya no está disponible.</h1>
            <p>Puede haberse agotado o retirado del catálogo.</p><a class="primary-button" href="/#catalog">VER CATÁLOGO</a>
        </section>

        <article class="product-view" id="product-view" data-static-product="true">
            <div class="product-gallery">
                <div class="image-frame">
                    <span class="product-badge" id="product-badge">${escapeHtml(status.badge)}</span>
                    <img id="product-main-image" src="${escapeHtml(imageUrls[0])}" alt="${escapeHtml(product.title)}" fetchpriority="high">
                </div>
                <div class="thumbnail-list" id="thumbnail-list" aria-label="Fotos del producto">${thumbnails}
                </div>
            </div>

            <div class="product-copy">
                <p class="eyebrow" id="product-category">${escapeHtml(categoryLabel(product.category).toUpperCase())}</p>
                <h1 id="product-title">${escapeHtml(product.title)}</h1>
                <p class="product-price" id="product-price">S/. ${Number(product.price).toFixed(2)}</p>
                <p class="stock-note ${status.sold ? 'sold' : ''}" id="stock-note">${escapeHtml(status.note)}</p>
                <p class="product-description" id="product-description">${escapeHtml(product.description)}</p>
                <aside class="fit-note" id="fit-note" ${product.category === 'jeans-pants' && product.fit_recommendation !== false ? '' : 'hidden'}>
                    <strong>Recomendación de calce</strong><span>Para un calce más cómodo en jeans Fashion Nova, considera elegir 1 o 2 tallas por encima de tu talla habitual.</span>
                </aside>
                <div class="product-options" id="product-options">
                    <div><span class="option-label">SELECCIONA TU TALLA</span><div class="size-list" id="size-list">${sizeButtons}</div></div>
                    <div class="quantity-option"><span class="option-label">CANTIDAD</span><div class="quantity-control">
                        <button type="button" id="quantity-minus" aria-label="Reducir cantidad">−</button><output id="quantity-value">1</output><button type="button" id="quantity-plus" aria-label="Aumentar cantidad">+</button>
                    </div></div>
                </div>
                <a class="primary-button" id="buy-button" href="${escapeHtml(buyUrl)}" ${status.sold ? 'aria-disabled="true"' : ''}>${status.sold ? 'PRODUCTO AGOTADO' : 'INICIAR PEDIDO'}</a>
                <p class="purchase-note">Inicia sesión en LYNX para finalizar tu pedido de forma segura.</p>
            </div>
        </article>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" defer></script>
    <script src="/supabase-config.js?v=20260716-admin-v1" defer></script>
    <script src="/producto.js?v=20260718-speed-v2" defer></script>
</body>
</html>`;
}

fs.mkdirSync(outputDirectory, { recursive: true });
for (const file of fs.readdirSync(outputDirectory)) {
    if (file.endsWith('.html')) fs.unlinkSync(path.join(outputDirectory, file));
}

for (const product of products) {
    if (!product.slug || product.status === 'archived') continue;
    fs.writeFileSync(path.join(outputDirectory, `${product.slug}.html`), productPage(product), 'utf8');
}

const activeProducts = products.filter(product => product.slug && product.status !== 'archived');
const sitemapUrls = [
    { location: `${origin}/`, priority: '1.0', frequency: 'daily' },
    ...activeProducts.map(product => ({ location: `${origin}/producto/${encodeURIComponent(product.slug)}`, priority: '0.8', frequency: 'weekly' }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(entry => `  <url>
    <loc>${entry.location}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.frequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${activeProducts.length} SEO product pages and sitemap.xml`);
