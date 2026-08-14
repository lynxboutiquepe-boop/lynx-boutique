const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'catalog-seed.json'), 'utf8'));
const origin = 'https://www.lynx.pe';
const outputDirectory = path.join(root, 'producto');
const lastModified = '2026-07-27';
const categoryPages = [
    `${origin}/categoria/hoodies`,
    `${origin}/categoria/jeans-y-pants`,
    `${origin}/categoria/conjuntos`
];

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

function localAssetUrl(value = '') {
    const source = String(value).trim();
    if (!source) return '/assets/logo-transparent.png';
    if (/^https?:\/\//i.test(source)) {
        try {
            const parsed = new URL(source);
            return parsed.hostname === 'www.lynx.pe' || parsed.hostname === 'lynx.pe'
                ? `${parsed.pathname}${parsed.search}`
                : source;
        } catch (_) { return source; }
    }
    return `/${source.replace(/^\.?[\\/]+/, '')}`;
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

function categoryUrl(category) {
    return ({
        'hoodies-jackets': `${origin}/categoria/hoodies`,
        'jeans-pants': `${origin}/categoria/jeans-y-pants`,
        'conjuntos': `${origin}/categoria/conjuntos`
    })[category] || `${origin}/#catalog`;
}

function categoryFileUrl(category) {
    return ({
        'hoodies-jackets': '../categoria/hoodies.html',
        'jeans-pants': '../categoria/jeans-y-pants.html',
        'conjuntos': '../categoria/conjuntos.html'
    })[category] || '/#catalog';
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

function inferProductSpecs(product) {
    const content = `${product.title || ''} ${product.description || ''}`.toLowerCase();
    const fit = /oversized|holgad|ampli/.test(content) ? 'Oversized' : /skinny/.test(content) ? 'Skinny' : /baggy/.test(content) ? 'Baggy' : /flare|acampanad/.test(content) ? 'Flare' : /cropped/.test(content) ? 'Cropped' : 'Regular';
    const material = /cuero sint|faux leather/.test(content) ? 'Cuero sintético' : /denim|jean/.test(content) ? 'Denim' : /algod[oó]n/.test(content) ? 'Algodón mixto' : /poli[eé]ster/.test(content) ? 'Mezcla de poliéster' : 'Consultar composición';
    const colorMatch = String(product.title || '').match(/\s-\s(.+)$/);
    return {
        fit: product.fit_type || fit,
        material: product.material || material,
        color: product.color || colorMatch?.[1] || 'Según imagen',
        care: product.care_instructions || (material === 'Cuero sintético' ? 'Paño húmedo · no secadora' : 'Lavado frío · al revés')
    };
}

function persuasiveBenefit(product, fit) {
    if (product.category === 'jeans-pants') return `${fit === 'Flare' || fit === 'Skinny' ? 'Su silueta alarga visualmente las piernas y marca el outfit sin esfuerzo.' : 'Su volumen aporta una silueta streetwear relajada y actual.'} Úsalo con un hoodie o jacket LYNX para construir un look completo.`;
    if (product.category === 'conjuntos') return 'Un look coordinado elimina las dudas al combinar: úsalo completo para máximo impacto o separa las piezas para multiplicar tus outfits.';
    if (fit === 'Oversized') return 'El fit oversized aporta presencia y comodidad sin verse descuidado. Funciona solo o en capas y eleva un jean básico al instante.';
    return 'Una pieza protagonista que convierte un outfit sencillo en un look con identidad. Combínala con denim oscuro o flare para equilibrar la silueta.';
}

function productPage(product) {
    const url = `${origin}/producto/${encodeURIComponent(product.slug)}`;
    const images = Array.isArray(product.images) && product.images.length
        ? product.images.filter(Boolean).map(optimizedStoreImage)
        : ['assets/logo-transparent.png'];
    const imageUrls = images.map(absoluteUrl);
    const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['ÚNICA'];
    const status = statusContent(product);
    const specs = inferProductSpecs(product);
    const benefit = persuasiveBenefit(product, specs.fit);
    const title = titleFor(product);
    const description = descriptionFor(product);
    const checkoutId = product.legacy_id ?? product.id;
    const buyUrl = `/?producto=${encodeURIComponent(checkoutId)}&comprar=1&talla=${encodeURIComponent(sizes[0])}&cantidad=1`;
    const addUrl = `/?producto=${encodeURIComponent(checkoutId)}&agregar=1&talla=${encodeURIComponent(sizes[0])}&cantidad=1`;
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
                    { '@type': 'ListItem', position: 2, name: categoryLabel(product.category), item: categoryUrl(product.category) },
                    { '@type': 'ListItem', position: 3, name: product.title, item: url }
                ]
            }
        ]
    };
    const schemaJson = JSON.stringify(schema).replace(/</g, '\\u003c');
    const thumbnails = images.map((source, index) => `
                        <button type="button" class="${index === 0 ? 'active' : ''}" aria-label="Ver foto ${index + 1} de ${escapeHtml(product.title)}">
                            <img src="${escapeHtml(localAssetUrl(source))}" alt="" loading="${index === 0 ? 'eager' : 'lazy'}" fetchpriority="${index === 0 ? 'high' : 'low'}">
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
    <link rel="stylesheet" href="/producto.css?v=20260725-fusion-v8">
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
                    <img id="product-main-image" src="${escapeHtml(localAssetUrl(images[0]))}" alt="${escapeHtml(product.title)}" fetchpriority="high">
                </div>
                <div class="thumbnail-list" id="thumbnail-list" aria-label="Fotos del producto">${thumbnails}
                </div>
            </div>

            <div class="product-copy">
                <a class="eyebrow" id="product-category" href="${escapeHtml(categoryFileUrl(product.category))}">${escapeHtml(categoryLabel(product.category).toUpperCase())}</a>
                <h1 id="product-title">${escapeHtml(product.title)}</h1>
                <p class="product-price" id="product-price">S/. ${Number(product.price).toFixed(2)}</p>
                <p class="stock-note ${status.sold ? 'sold' : ''}" id="stock-note">${escapeHtml(status.note)}</p>
                <div class="product-proof-row" aria-label="Beneficios de compra"><span><i data-lucide="badge-check"></i> Prenda original</span><span><i data-lucide="truck"></i> Envíos a todo el Perú</span></div>
                <p class="product-description" id="product-description">${escapeHtml(product.description)}</p>
                <div class="product-benefit-copy"><strong>POR QUÉ TE VA A GUSTAR</strong><p id="product-benefit">${escapeHtml(benefit)}</p></div>
                <div class="product-specs" id="product-specs" aria-label="Características de la prenda"><div><span>FIT</span><strong id="product-fit">${escapeHtml(specs.fit)}</strong></div><div><span>MATERIAL</span><strong id="product-material">${escapeHtml(specs.material)}</strong></div><div><span>COLOR</span><strong id="product-color">${escapeHtml(specs.color)}</strong></div><div><span>CUIDADO</span><strong id="product-care">${escapeHtml(specs.care)}</strong></div><div id="product-weight-row" ${Number(product.weight_grams) ? '' : 'hidden'}><span>PESO</span><strong id="product-weight">${Number(product.weight_grams) ? `${Number(product.weight_grams)} g aprox.` : ''}</strong></div></div>
                <aside class="fit-note" id="fit-note" ${product.category === 'jeans-pants' && product.fit_recommendation !== false ? '' : 'hidden'}>
                    <strong>Recomendación de calce</strong><span>El calce cambia según el modelo. Compara cintura y cadera con la guía; si quedas entre dos tallas, elige la mayor para mayor comodidad.</span>
                </aside>
                <div class="product-options" id="product-options">
                    <div><div class="option-heading"><span class="option-label">SELECCIONA TU TALLA</span><button class="size-guide-trigger" id="size-guide-trigger" type="button">GUÍA DE TALLAS</button></div><div class="size-list" id="size-list">${sizeButtons}</div><p class="size-selection-note" id="size-selection-note">Selecciona una talla para continuar.</p></div>
                    <div class="quantity-option"><span class="option-label">CANTIDAD</span><div class="quantity-control">
                        <button type="button" id="quantity-minus" aria-label="Reducir cantidad">−</button><output id="quantity-value">1</output><button type="button" id="quantity-plus" aria-label="Aumentar cantidad">+</button>
                    </div></div>
                </div>
                <div class="purchase-actions">
                    <a class="primary-button" id="add-cart-button" href="${escapeHtml(addUrl)}" ${status.sold ? 'aria-disabled="true"' : ''}>${status.sold ? 'PRODUCTO AGOTADO' : 'AGREGAR AL CARRITO'}</a>
                    <a class="secondary-button" id="buy-button" href="${escapeHtml(buyUrl)}" ${status.sold ? 'aria-disabled="true"' : ''}>${status.sold ? 'PRODUCTO AGOTADO' : 'COMPRAR · COMPLETAR ENTREGA'}</a>
                </div>
                <p class="purchase-note"><i data-lucide="shield-check"></i> No necesitas crear una cuenta. Confirmamos stock, talla y total por WhatsApp antes de cualquier pago.</p>
                <div class="product-trust-accordion"><details open><summary>Envíos y tiempos</summary><p><strong>Lima:</strong> motorizado, normalmente en 24–48 horas. <strong>Provincias:</strong> Shalom, normalmente en 2–3 días hábiles; el flete se paga en agencia.</p></details><details><summary>Reserva y medios de pago</summary><p>En Lima puedes separar con S/ 50. Aceptamos Yape y transferencias BCP o BBVA; compartimos las cuentas oficiales durante la confirmación.</p></details><details><summary>Cambios y condición de la prenda</summary><p>Confirma las condiciones y el plazo de cambio con nuestro equipo antes de pagar. La prenda debe conservar etiquetas y no presentar uso, lavado, manchas ni daños.</p></details></div>
            </div>
        </article>
    </main>
    <dialog class="size-guide-dialog" id="size-guide-dialog" aria-labelledby="size-guide-title"><div class="size-guide-card"><button class="size-guide-close" id="size-guide-close" type="button" aria-label="Cerrar guía">×</button><span class="eyebrow">ELIGE CON SEGURIDAD</span><h2 id="size-guide-title">GUÍA DE TALLAS</h2><p class="size-guide-intro" id="size-guide-intro">Mide una prenda similar sobre una superficie plana y compara los centímetros.</p><div class="size-howto"><span><b>1</b> Usa una cinta métrica</span><span><b>2</b> No estires la tela</span><span><b>3</b> Si dudas, escríbenos</span></div><div class="size-table-wrap"><table><thead id="size-guide-head"></thead><tbody id="size-guide-body"></tbody></table></div><p class="size-guide-disclaimer">Medidas corporales referenciales en centímetros. El corte puede variar entre modelos. Si estás entre dos tallas, confirma el fit por WhatsApp.</p><a class="size-guide-help" id="size-guide-help" href="https://wa.me/51962210278?text=Hola%20LYNX%2C%20necesito%20ayuda%20para%20elegir%20mi%20talla." target="_blank" rel="noopener noreferrer">NECESITO AYUDA CON MI TALLA</a></div></dialog>
    <script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" defer></script>
    <script src="/supabase-config.js?v=20260716-admin-v1" defer></script>
    <script src="/commerce-tracking.js?v=20260813-cro-v1" defer></script>
    <script src="/producto.js?v=20260814-photo-fix-v2" defer></script>
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

require('./generate_category_pages.js');

const activeProducts = products.filter(product => product.slug && product.status !== 'archived');
const sitemapUrls = [
    { location: `${origin}/`, priority: '1.0', frequency: 'daily' },
    ...categoryPages.map(location => ({ location, priority: '0.9', frequency: 'daily' })),
    { location: `${origin}/guia/lynx-streetwear-peru`, priority: '0.7', frequency: 'monthly' },
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
