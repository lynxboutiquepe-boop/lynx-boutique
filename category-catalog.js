(function () {
    const CATEGORY_BY_PATH = {
        '/categoria/hoodies': 'hoodies-jackets',
        '/categoria/jeans-y-pants': 'jeans-pants',
        '/categoria/conjuntos': 'conjuntos'
    };

    const CATEGORY_LABELS = {
        'hoodies-jackets': 'Hoodies & Jackets',
        'jeans-pants': 'Jeans & Pants',
        conjuntos: 'Conjuntos'
    };
    let categoryProducts = [];

    function renderCategory(products, category) {
        const grid = document.querySelector('.category-grid');
        if (!grid) return;
        grid.innerHTML = products.length
            ? products.map(product => productCard(product, category)).join('')
            : '<div class="category-empty"><h2>Sin resultados</h2><p>Prueba otra búsqueda o desactiva el filtro de disponibilidad.</p></div>';
        grid.querySelectorAll('img').forEach(image => image.addEventListener('error', () => { image.src = '/assets/logo-transparent.png'; }, { once: true }));
    }

    function applyCategoryFilters(category) {
        const query = document.getElementById('category-search')?.value.trim().toLowerCase() || '';
        const sort = document.getElementById('category-sort')?.value || 'featured';
        const inStock = document.getElementById('category-in-stock')?.checked || false;
        const products = categoryProducts.filter(product => (!query || `${product.title} ${product.description || ''}`.toLowerCase().includes(query)) && (!inStock || (product.status !== 'sold_out' && (product.status === 'preorder' || Number(product.stock || 0) > 0))));
        if (sort === 'price-asc') products.sort((a, b) => Number(a.price) - Number(b.price));
        if (sort === 'price-desc') products.sort((a, b) => Number(b.price) - Number(a.price));
        renderCategory(products, category);
    }

    function escapeHtml(value) {
        const node = document.createElement('span');
        node.textContent = String(value ?? '');
        return node.innerHTML;
    }

    function productBadge(product) {
        const stock = Number(product.stock || 0);
        if (product.status === 'sold_out' || (product.status !== 'preorder' && stock <= 0)) return 'AGOTADO';
        if (product.status === 'preorder') return 'PREVENTA';
        if (product.status === 'low_stock') return stock === 1 ? 'ÚLTIMA UNIDAD' : `ÚLTIMAS ${stock} UNIDADES`;
        if (product.badge) return product.badge;
        const sizes = Array.isArray(product.sizes) ? product.sizes.filter(Boolean) : [];
        if (sizes.length === 1) return `TALLA ${sizes[0]}`;
        if (sizes.length > 1) return `TALLAS ${sizes.join(' Y ')}`;
        return 'DISPONIBLE';
    }

    function normalizeImageUrl(value) {
        let image = String(value || '').trim();
        if (!image) return '/assets/logo-transparent.png';
        image = image.replace(/(mockups-finales\/[^?#]+)\.png(?=([?#]|$))/i, '$1.webp');
        if (/^(https?:\/\/|data:image\/|\/)/i.test(image)) return image;
        return `/${image.replace(/^\.\//, '')}`;
    }

    function productCard(product, category) {
        const stock = Number(product.stock || 0);
        const soldOut = product.status === 'sold_out' || (product.status !== 'preorder' && stock <= 0);
        const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
        const image = normalizeImageUrl(images[0]);
        const slug = encodeURIComponent(product.slug || '');
        return `
            <a class="category-product${soldOut ? ' is-sold-out' : ''}" href="/producto/${slug}" ${soldOut ? 'aria-label="Agotado: ' + escapeHtml(product.title) + '"' : ''}>
                <figure>
                    <span>${escapeHtml(productBadge(product))}</span>
                    <img src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}" loading="lazy" width="640" height="800">
                </figure>
                <p>${escapeHtml(CATEGORY_LABELS[category] || category)}</p>
                <h2>${escapeHtml(product.title)}</h2>
                <strong>S/. ${Number(product.price || 0).toFixed(2)}</strong>
            </a>`;
    }

    async function refreshCategory() {
        const path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
        const category = CATEGORY_BY_PATH[path];
        const grid = document.querySelector('.category-grid');
        const client = window.getLynxSupabase?.();
        if (!category || !grid || !client) return;

        const { data, error } = await client
            .from('products')
            .select('id,title,slug,category,price,stock,sizes,images,badge,status,sort_order')
            .eq('category', category)
            .neq('status', 'archived')
            .order('sort_order', { ascending: true })
            .order('id', { ascending: true });

        if (error) {
            console.warn('No se pudo actualizar la categoría; se conserva el catálogo de respaldo.', error.message);
            return;
        }

        categoryProducts = data || [];
        grid.innerHTML = categoryProducts.length
            ? categoryProducts.map(product => productCard(product, category)).join('')
            : '<div class="category-empty"><h2>Próximamente</h2><p>Estamos preparando nuevas prendas para esta colección.</p><div><a href="/#catalog">Ver catálogo</a></div></div>';

        const count = document.querySelector('.category-hero small');
        if (count) count.textContent = `${categoryProducts.length} ${categoryProducts.length === 1 ? 'prenda' : 'prendas'} en catálogo`;
        ['category-search', 'category-sort', 'category-in-stock'].forEach(id => document.getElementById(id)?.addEventListener(id === 'category-search' ? 'input' : 'change', () => applyCategoryFilters(category)));
    }

    document.addEventListener('DOMContentLoaded', refreshCategory);
}());
