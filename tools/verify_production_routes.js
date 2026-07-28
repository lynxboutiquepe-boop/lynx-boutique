const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const config = fs.readFileSync(path.join(root, 'supabase-config.js'), 'utf8');
const redirects = JSON.parse(fs.readFileSync(path.join(root, 'product-slug-redirects.json'), 'utf8'));
const categoryPaths = [
    '/categoria/hoodies',
    '/categoria/jeans-y-pants',
    '/categoria/conjuntos'
];
const supabaseUrl = config.match(/url:\s*'([^']+)'/)?.[1];
const supabaseKey = config.match(/publishableKey:\s*'([^']+)'/)?.[1];
const siteUrl = process.env.LYNX_SITE_URL || 'https://www.lynx.pe';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('No se encontró la configuración pública de Supabase.');
}

async function responseStatus(url, redirect = 'follow') {
    const response = await fetch(url, { redirect });
    return {
        status: response.status,
        location: response.headers.get('location') || '',
        finalUrl: response.url
    };
}

async function main() {
    const catalogResponse = await fetch(
        `${supabaseUrl}/rest/v1/products?select=legacy_id,title,slug,status&status=neq.archived&order=sort_order.asc`,
        { headers: { apikey: supabaseKey } }
    );
    if (!catalogResponse.ok) {
        throw new Error(`Supabase respondió ${catalogResponse.status}.`);
    }

    const products = await catalogResponse.json();
    const invalidSlugs = products.filter(product => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug || ''));
    const duplicates = products.filter((product, index) =>
        products.findIndex(candidate => candidate.slug === product.slug) !== index
    );
    const productChecks = await Promise.all(products.map(async product => ({
        slug: product.slug,
        ...await responseStatus(`${siteUrl}/producto/${encodeURIComponent(product.slug)}`)
    })));
    const brokenProducts = productChecks.filter(result => result.status !== 200);

    const redirectChecks = await Promise.all(redirects.map(async redirect => ({
        ...redirect,
        ...await responseStatus(`${siteUrl}/producto/${encodeURIComponent(redirect.old_slug)}`, 'manual')
    })));
    const brokenRedirects = redirectChecks.filter(result =>
        ![301, 302, 307, 308].includes(result.status)
        || !result.location.endsWith(`/producto/${result.canonical_slug}`)
    );

    const fallback = await responseStatus(`${siteUrl}/producto/verificacion-ruta-dinamica-lynx`);
    const categoryChecks = await Promise.all(categoryPaths.map(async categoryPath => ({
        path: categoryPath,
        ...await responseStatus(`${siteUrl}${categoryPath}`)
    })));
    const brokenCategories = categoryChecks.filter(result => result.status !== 200);
    const homeResponse = await fetch(`${siteUrl}/`);
    const homeHtml = await homeResponse.text();
    const officialSocialProfiles = [
        'https://www.instagram.com/boutique_lynx/',
        'https://www.tiktok.com/@boutique_lynx'
    ];
    const missingSocialProfiles = officialSocialProfiles.filter(profile => !homeHtml.includes(profile));
    const summary = {
        products: products.length,
        validProductRoutes: productChecks.length - brokenProducts.length,
        invalidSlugs: invalidSlugs.length,
        duplicateSlugs: duplicates.length,
        validLegacyRedirects: redirectChecks.length - brokenRedirects.length,
        validCategoryRoutes: categoryChecks.length - brokenCategories.length,
        officialSocialProfiles: officialSocialProfiles.length - missingSocialProfiles.length,
        dynamicFallbackStatus: fallback.status
    };
    console.log(JSON.stringify(summary, null, 2));

    if (
        invalidSlugs.length
        || duplicates.length
        || brokenProducts.length
        || brokenRedirects.length
        || brokenCategories.length
        || missingSocialProfiles.length
        || fallback.status !== 200
    ) {
        if (brokenProducts.length) console.error('Rutas rotas:', brokenProducts);
        if (brokenRedirects.length) console.error('Redirecciones rotas:', brokenRedirects);
        if (brokenCategories.length) console.error('Categorías rotas:', brokenCategories);
        if (missingSocialProfiles.length) console.error('Perfiles sociales ausentes:', missingSocialProfiles);
        process.exit(1);
    }
}

main().catch(error => {
    console.error(error.message);
    process.exit(1);
});
