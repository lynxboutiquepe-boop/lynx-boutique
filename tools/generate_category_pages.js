const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const products = JSON.parse(fs.readFileSync(path.join(root, 'catalog-seed.json'), 'utf8'))
    .filter(product => product.slug && product.status !== 'archived');
const origin = 'https://www.lynx.pe';
const outputDirectory = path.join(root, 'categoria');
const categories = [
    {
        slug: 'hoodies',
        productCategory: 'hoodies-jackets',
        navLabel: 'Hoodies',
        h1: 'Hoodies y jackets LYNX',
        title: 'Hoodies y Jackets LYNX | Streetwear Premium Perú',
        description: 'Compra hoodies oversized, casacas y jackets LYNX para hombre. Streetwear premium, stock limitado y envíos seguros a todo el Perú.',
        intro: 'Hoodies oversized, casacas y jackets elegidos para combinar comodidad, abrigo y una estética streetwear que destaque.'
    },
    {
        slug: 'jeans-y-pants',
        productCategory: 'jeans-pants',
        navLabel: 'Jeans & Pants',
        h1: 'Jeans y pants LYNX',
        title: 'Jeans y Pants LYNX | Flared Jeans en Perú',
        description: 'Descubre jeans flare, stacked jeans, cargos y pants LYNX. Cortes streetwear para hombre con envíos a Lima y todo el Perú.',
        intro: 'Jeans flare, stacked jeans, cargos y pants para construir outfits urbanos con una silueta moderna y personalidad propia.'
    },
    {
        slug: 'conjuntos',
        productCategory: 'conjuntos',
        navLabel: 'Conjuntos',
        h1: 'Conjuntos LYNX',
        title: 'Conjuntos LYNX | Streetwear para Hombre en Perú',
        description: 'Conoce los próximos conjuntos LYNX para hombre. Streetwear coordinado, drops limitados y novedades en Instagram y TikTok.',
        intro: 'Estamos preparando conjuntos coordinados para que armes un outfit completo sin perder el estilo LYNX. Síguenos para enterarte del próximo drop.'
    }
];

function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
}

function absoluteImage(value = '') {
    const source = String(value).replace(
        /(mockups-finales\/[^?#]+)\.png(?=([?#]|$))/i,
        '$1.webp'
    );
    if (/^https?:\/\//i.test(source)) return source;
    return `${origin}/${source.replace(/^\.?[\\/]+/, '')}`;
}

function categoryPage(category) {
    const url = `${origin}/categoria/${category.slug}`;
    const categoryProducts = products.filter(product => product.category === category.productCategory);
    const itemList = categoryProducts.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${origin}/producto/${encodeURIComponent(product.slug)}`,
        name: product.title
    }));
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': `${url}#collection`,
                url,
                name: category.h1,
                description: category.description,
                isPartOf: { '@id': `${origin}/#store` },
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: categoryProducts.length,
                    itemListElement: itemList
                }
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'LYNX Boutique Perú', item: `${origin}/` },
                    { '@type': 'ListItem', position: 2, name: category.navLabel, item: url }
                ]
            }
        ]
    };
    const cards = categoryProducts.map(product => {
        const image = absoluteImage(product.images?.[0] || product.image || 'assets/logo-transparent.png');
        const badge = product.status === 'sold_out'
            ? 'AGOTADO'
            : product.status === 'preorder'
                ? 'PREVENTA'
                : product.badge || 'STOCK LIMITADO';
        return `
            <a class="category-product" href="/producto/${escapeHtml(product.slug)}">
                <figure>
                    <span>${escapeHtml(badge)}</span>
                    <img src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}" loading="lazy" width="640" height="800">
                </figure>
                <p>${escapeHtml(category.navLabel)}</p>
                <h2>${escapeHtml(product.title)}</h2>
                <strong>S/. ${Number(product.price || 0).toFixed(2)}</strong>
            </a>`;
    }).join('');
    const catalogContent = cards || `
        <div class="category-empty">
            <h2>Próximo drop en camino</h2>
            <p>Los conjuntos LYNX se publicarán aquí apenas estén disponibles.</p>
            <div>
                <a href="https://www.instagram.com/boutique_lynx/" target="_blank" rel="noopener noreferrer">Ver Instagram oficial</a>
                <a href="https://www.tiktok.com/@boutique_lynx" target="_blank" rel="noopener noreferrer">Ver TikTok oficial</a>
            </div>
        </div>`;

    return `<!DOCTYPE html>
<html lang="es-PE">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#070707">
    <title>${escapeHtml(category.title)}</title>
    <meta name="description" content="${escapeHtml(category.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="${url}">
    <link rel="icon" type="image/png" href="/assets/favicon-lynx.png?v=20260716-v1">
    <meta property="og:locale" content="es_PE">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="LYNX Boutique Perú">
    <meta property="og:title" content="${escapeHtml(category.title)}">
    <meta property="og:description" content="${escapeHtml(category.description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${categoryProducts.length ? escapeHtml(absoluteImage(categoryProducts[0].images?.[0])) : `${origin}/assets/hero-lynx-model-cinematic-v2.webp`}">
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/categoria.css?v=20260727-v1">
</head>
<body>
    <header class="category-header">
        <a class="category-logo" href="/" aria-label="Ir al inicio de LYNX">
            <img src="/assets/logo-transparent.png" alt="LYNX Boutique Perú" width="120" height="55">
        </a>
        <nav aria-label="Categorías principales">
            <a href="/categoria/hoodies"${category.slug === 'hoodies' ? ' aria-current="page"' : ''}>Hoodies</a>
            <a href="/categoria/jeans-y-pants"${category.slug === 'jeans-y-pants' ? ' aria-current="page"' : ''}>Jeans & Pants</a>
            <a href="/categoria/conjuntos"${category.slug === 'conjuntos' ? ' aria-current="page"' : ''}>Conjuntos</a>
        </nav>
        <a class="category-catalog-link" href="/#catalog">Ver catálogo</a>
    </header>

    <main>
        <section class="category-hero">
            <p>COLECCIÓN LYNX · PERÚ</p>
            <h1>${escapeHtml(category.h1)}</h1>
            <span>${escapeHtml(category.intro)}</span>
            <small>${categoryProducts.length} ${categoryProducts.length === 1 ? 'prenda disponible' : 'prendas disponibles'}</small>
        </section>
        <section class="category-grid" aria-label="Productos de ${escapeHtml(category.navLabel)}">
            ${catalogContent}
        </section>
    </main>

    <footer class="category-footer">
        <div>
            <strong>LYNX Boutique Perú</strong>
            <p>Streetwear premium para hombre con envíos a todo el Perú.</p>
        </div>
        <nav aria-label="Categorías LYNX">
            <a href="/categoria/hoodies">Hoodies</a>
            <a href="/categoria/jeans-y-pants">Jeans & Pants</a>
            <a href="/categoria/conjuntos">Conjuntos</a>
        </nav>
        <nav aria-label="Redes oficiales de LYNX">
            <a href="https://www.instagram.com/boutique_lynx/" target="_blank" rel="noopener noreferrer">Instagram oficial</a>
            <a href="https://www.tiktok.com/@boutique_lynx" target="_blank" rel="noopener noreferrer">TikTok oficial</a>
        </nav>
    </footer>
</body>
</html>`;
}

fs.mkdirSync(outputDirectory, { recursive: true });
for (const category of categories) {
    fs.writeFileSync(path.join(outputDirectory, `${category.slug}.html`), categoryPage(category), 'utf8');
}

console.log(`Generated ${categories.length} SEO category pages`);
