(function () {
    const PRODUCT_IMAGE_CACHE_VERSION = '20260916-mockups-v7';
    const CATEGORY_BY_PATH = {
        '/categoria/hoodies': 'hoodies-jackets',
        '/categoria/t-shirts': 't-shirts',
        '/categoria/jeans-y-pants': 'jeans-pants',
        '/categoria/conjuntos': 'conjuntos',
        '/categoria/preventa': 'preorder',
        '/categoria/outlet': 'outlet'
    };

    const CATEGORY_LABELS = {
        'hoodies-jackets': 'Hoodies & Jackets',
        't-shirts': 'T-Shirts',
        'jeans-pants': 'Jeans & Pants',
        conjuntos: 'Conjuntos',
        preorder: 'PREVENTA',
        outlet: 'OUTLET'
    };
    const PRODUCT_CATEGORY_LABELS = {
        'hoodies-jackets': 'Hoodies & Jackets',
        't-shirts': 'T-Shirts',
        'jeans-pants': 'Jeans & Pants',
        conjuntos: 'Conjuntos',
        preorder: 'Preventa'
    };
    let categoryProducts = [];
    const pendingUnits = product => Object.values(product?.preorder_stock || {}).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);

    function renderCategory(products, category) {
        const grid = document.querySelector('.category-grid');
        if (!grid) return;
        grid.innerHTML = products.length
            ? products.map(product => productCard(product, category)).join('')
            : '<div class="category-empty"><h2>Sin resultados</h2><p>Prueba otra búsqueda o desactiva el filtro de disponibilidad.</p></div>';
        grid.querySelectorAll('img').forEach(bindImageFallback);
    }

    function bindImageFallback(image) {
        if (image.dataset.fallbackBound) return;
        image.dataset.fallbackBound = 'true';
        const isSecondary = image.classList.contains('category-product-secondary-img');
        const card = image.closest('.category-product');
        const markSecondaryReady = () => {
            if (isSecondary && image.naturalWidth > 0) card?.classList.add('has-secondary-image');
        };
        image.addEventListener('load', markSecondaryReady, { once: true });
        if (image.complete) markSecondaryReady();
        const handleError = () => {
            if (isSecondary) {
                card?.classList.remove('has-secondary-image');
                image.remove();
                return;
            }
            const failedPath = new URL(image.currentSrc || image.src, location.href).pathname;
            if (/\/mockups-finales\/.*\.webp$/i.test(failedPath) && image.dataset.pngFallbackTried !== 'true') {
                image.dataset.pngFallbackTried = 'true';
                image.src = `${failedPath.replace(/\.webp$/i, '.png')}?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
                return;
            }
            if (failedPath.endsWith('/assets/logo-transparent.png')) return;
            image.src = `/assets/logo-transparent.png?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
        };
        image.addEventListener('error', handleError);
    }

    function applyCategoryFilters(category) {
        const query = document.getElementById('category-search')?.value.trim().toLowerCase() || '';
        const sort = document.getElementById('category-sort')?.value || 'featured';
        const inStock = document.getElementById('category-in-stock')?.checked || false;
        const products = categoryProducts.filter(product => (!query || `${product.title} ${product.description || ''}`.toLowerCase().includes(query)) && (!inStock || (product.status !== 'sold_out' && (product.status === 'preorder' || Number(product.stock || 0) > 0 || pendingUnits(product) > 0))));
        if (sort === 'price-asc') products.sort((a, b) => Number(a.price) - Number(b.price));
        if (sort === 'price-desc') products.sort((a, b) => Number(b.price) - Number(a.price));
        renderCategory(products, category);
    }

    function escapeHtml(value) {
        const node = document.createElement('span');
        node.textContent = String(value ?? '');
        return node.innerHTML;
    }

    function productBadge(product, category) {
        const stock = Number(product.stock || 0);
        if (product.status === 'sold_out' || (product.status !== 'preorder' && stock <= 0)) return 'AGOTADO';
        if (category === 'outlet' && productDiscountInfo(product)) return 'OUTLET';
        if (product.status === 'preorder' || pendingUnits(product) > 0) return 'PREVENTA';
        if (productDiscountInfo(product)) return 'OUTLET';
        if (product.status === 'low_stock') return stock === 1 ? 'ÚLTIMA UNIDAD' : `ÚLTIMAS ${stock} UNIDADES`;
        if (product.badge) return product.badge;
        const sizes = Array.isArray(product.sizes) ? product.sizes.filter(Boolean) : [];
        if (sizes.length === 1) return `TALLA ${sizes[0]}`;
        if (sizes.length > 1) return `TALLAS ${sizes.join(' Y ')}`;
        return 'DISPONIBLE';
    }

    function productDiscountInfo(product) {
        const current = Number(product?.price);
        const previous = Number(product?.compare_at_price ?? product?.compareAtPrice);
        if (!Number.isFinite(current) || !Number.isFinite(previous) || current <= 0 || previous <= current) return null;
        return { current, previous, percent: Math.round(((previous - current) / previous) * 100) };
    }

    function normalizeImageUrl(value) {
        let image = String(value || '').trim();
        if (!image) return `/assets/logo-transparent.png?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
        if (!/^\/?assets\/mockups-finales\/[^?#]+\.png(?:[?#]|$)/i.test(image)) {
            image = image.replace(/(mockups-finales\/[^?#]+)\.png(?=([?#]|$))/i, '$1.webp');
        }
        if (/^(https?:\/\/|data:image\/)/i.test(image)) return image;
        image = image.startsWith('/') ? image : `/${image.replace(/^\.\//, '')}`;
        if (!/[?&]lynx_img=/.test(image)) image += `${image.includes('?') ? '&' : '?'}lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
        return image;
    }

    function productCard(product, category) {
        const stock = Number(product.stock || 0);
        const soldOut = product.status === 'sold_out' || (product.status !== 'preorder' && stock <= 0);
        const sourceImages = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
        const images = window.LynxProductImages?.withMockup(product.slug, sourceImages) || sourceImages;
        const image = normalizeImageUrl(images[0]);
        const secondaryImage = images[1] ? normalizeImageUrl(images[1]) : '';
        const slug = encodeURIComponent(product.slug || '');
        const discount = productDiscountInfo(product);
        const originalCategory = PRODUCT_CATEGORY_LABELS[product.category] || product.category || CATEGORY_LABELS[category] || category;
        return `
            <a class="category-product${soldOut ? ' is-sold-out' : ''}" href="/producto/${slug}" ${soldOut ? 'aria-label="Agotado: ' + escapeHtml(product.title) + '"' : ''}>
                <figure>
                    <span>${escapeHtml(productBadge(product, category))}</span>
                    ${discount ? `<b class="category-product-discount" aria-label="${discount.percent}% de descuento">-${discount.percent}%</b>` : ''}
                    <img class="category-product-primary-img" src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}" loading="lazy" decoding="async" width="640" height="800">
                    ${secondaryImage ? `<img class="category-product-secondary-img" src="${escapeHtml(secondaryImage)}" alt="" aria-hidden="true" loading="lazy" decoding="async" width="640" height="800">` : ''}
                </figure>
                <p>${escapeHtml(originalCategory)}</p>
                <h2>${escapeHtml(product.title)}</h2>
                <div class="category-product-pricing">${discount ? `<del>Antes S/. ${discount.previous.toFixed(2)}</del>` : ''}<strong>Ahora S/. ${Number(product.price || 0).toFixed(2)}</strong></div>
                ${pendingUnits(product) > 0 ? `<small class="category-preorder-stock">${Number(product.stock || 0)} en stock · ${pendingUnits(product)} en preventa</small>` : ''}
            </a>`;
    }

    async function refreshCategory() {
        const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
        const category = CATEGORY_BY_PATH[path];
        const grid = document.querySelector('.category-grid');
        const client = window.getLynxSupabase?.();
        if (!category || !grid || !client) return;

        const loadProducts = async includeDiscount => {
            let query = client
                .from('products')
                .select(`id,title,slug,category,price,${includeDiscount ? 'compare_at_price,' : ''}stock,sizes,images,badge,status,sort_order,preorder_stock`)
                .order('sort_order', { ascending: true })
                .order('id', { ascending: true });

            if (category === 'preorder') return query.neq('status', 'archived');
            if (category === 'outlet') return query.neq('status', 'archived');
            return query.eq('category', category).neq('status', 'archived').neq('status', 'preorder');
        };
        let { data, error } = await loadProducts(true);
        if (error && /compare_at_price|column|schema cache/i.test(error.message || '')) ({ data, error } = await loadProducts(false));

        if (error) {
            console.warn('No se pudo actualizar la categoría; se conserva el catálogo de respaldo.', error.message);
            return;
        }

        categoryProducts = category === 'preorder'
            ? (data || []).filter(product => product.status === 'preorder' || pendingUnits(product) > 0)
            : category === 'outlet'
                ? (data || []).filter(product => productDiscountInfo(product))
                : (data || []);
        grid.innerHTML = categoryProducts.length
            ? categoryProducts.map(product => productCard(product, category)).join('')
            : '<div class="category-empty"><h2>Próximamente</h2><p>Estamos preparando nuevas prendas para esta colección.</p><div><a href="/#catalog">Ver catálogo</a></div></div>';
        grid.querySelectorAll('img').forEach(bindImageFallback);

        const count = document.querySelector('.category-hero small');
        if (count) count.textContent = `${categoryProducts.length} ${categoryProducts.length === 1 ? 'prenda' : 'prendas'} en catálogo`;
        ['category-search', 'category-sort', 'category-in-stock'].forEach(id => document.getElementById(id)?.addEventListener(id === 'category-search' ? 'input' : 'change', () => applyCategoryFilters(category)));
    }

    document.addEventListener('DOMContentLoaded', refreshCategory);
}());
