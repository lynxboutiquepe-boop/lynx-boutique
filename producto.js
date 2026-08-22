const productPage = document.getElementById('product-page');
const productLoading = document.getElementById('product-loading');
const productNotFound = document.getElementById('product-not-found');
const productView = document.getElementById('product-view');
const productMainImage = document.getElementById('product-main-image');
const productBadge = document.getElementById('product-badge');
const thumbnailList = document.getElementById('thumbnail-list');
const sizeList = document.getElementById('size-list');
const quantityValue = document.getElementById('quantity-value');
const quantityMinus = document.getElementById('quantity-minus');
const quantityPlus = document.getElementById('quantity-plus');
const addCartButton = document.getElementById('add-cart-button');
const buyButton = document.getElementById('buy-button');
const sizeGuideDialog = document.getElementById('size-guide-dialog');
const sizeGuideTrigger = document.getElementById('size-guide-trigger');
const sizeGuideClose = document.getElementById('size-guide-close');
const sizeSelectionNote = document.getElementById('size-selection-note');
const PRODUCT_IMAGE_CACHE_VERSION = '20260814-photo-fix-v1';

const SIZE_GUIDES = {
    tops: {
        intro: 'Mide tu cuerpo sin apretar la cinta. Para un fit oversized, elige tu talla habitual; baja una talla si prefieres un resultado menos amplio.',
        columns: ['Talla', 'Pecho', 'Cintura'],
        rows: [['S', '89–94', '74–79'], ['M', '97–102', '81–86'], ['L', '104–109', '89–94'], ['XL', '112–117', '97–102']]
    },
    jeans: {
        intro: 'Mide la cintura donde usarás el jean y la cadera en la parte más ancha. En denim ajustado o poco elástico, deja margen para moverte.',
        columns: ['Talla', 'Cintura', 'Cadera'],
        rows: [['30', '76–79', '91–94'], ['32', '81–84', '97–99'], ['34', '86–89', '102–104'], ['36', '91–94', '107–109'], ['38', '97–99', '112–114']]
    }
};

// Vercel conserva la URL bonita en el navegador aunque sirva producto.html
// por dentro; por eso leemos el slug tanto de la query como de la propia ruta.
const queryProductSlug = new URLSearchParams(location.search).get('slug');
const pathProductSlug = location.pathname.match(/^\/producto\/([^/]+)\/?$/i)?.[1];
const productReference = decodeURIComponent(queryProductSlug || pathProductSlug || '').trim().toLowerCase();
const productId = /^\d+$/.test(productReference) ? Number(productReference) : null;
const productSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(productReference) ? productReference : '';
let selectedSize = '';
let selectedQuantity = 1;
let currentProduct = null;

function text(value = '') {
    return String(value ?? '');
}

function productImageUrl(source) {
    const value = text(source).trim().replace(
        /(mockups-finales\/[^?#]+)\.png(?=([?#]|$))/i,
        '$1.webp'
    );
    if (!value) return `/assets/logo-transparent.png?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
    if (/^https?:\/\//i.test(value)) {
        try {
            const parsed = new URL(value);
            if (parsed.hostname === 'www.lynx.pe' || parsed.hostname === 'lynx.pe') return `${parsed.pathname}${parsed.search}`;
        } catch (_) { /* conservar la dirección original */ }
    }
    // Las fotos locales deben resolverse desde la raíz, no desde la URL de la ficha.
    if (/^(?:https?:|data:)/i.test(value)) return value;
    const localPath = value.startsWith('/') ? value : `/${value.replace(/^\.?(?:\/|\\)/, '')}`;
    if (/[?&]lynx_img=/.test(localPath)) return localPath;
    return `${localPath}${localPath.includes('?') ? '&' : '?'}lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
}

function setProductImageFallback(image) {
    image.onerror = () => {
        const failedPath = new URL(image.currentSrc || image.src, location.href).pathname;
        if (/\/mockups-finales\/.*\.webp$/i.test(failedPath) && image.dataset.pngFallbackTried !== 'true') {
            image.dataset.pngFallbackTried = 'true';
            image.src = `${failedPath.replace(/\.webp$/i, '.png')}?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
            return;
        }
        image.onerror = null;
        image.src = `/assets/logo-transparent.png?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
    };
}

function statusCopy(product) {
    if (product.status === 'sold_out') return { badge: 'AGOTADO', note: 'AGOTADO POR EL MOMENTO', sold: true };
    if (product.status === 'preorder') return { badge: 'PREVENTA', note: 'PREVENTA · RESERVA TU PRENDA' };
    if (product.status === 'low_stock') return { badge: product.badge || 'ÚLTIMAS UNIDADES', note: 'ÚLTIMAS UNIDADES DISPONIBLES' };
    return { badge: product.badge || 'NUEVO DROP', note: product.stock ? `${product.stock} ${product.stock === 1 ? 'UNIDAD DISPONIBLE' : 'UNIDADES DISPONIBLES'}` : '' };
}

function productCategoryUrl(category) {
    const file = ({
        'hoodies-jackets': 'hoodies.html',
        'jeans-pants': 'jeans-y-pants.html',
        'conjuntos': 'conjuntos.html'
    })[category];
    if (!file) return '/#catalog';
    // Compatible con servidor/Vercel y también al abrir los HTML desde carpeta.
    if (location.protocol === 'file:') {
        return location.pathname.replaceAll('\\', '/').includes('/producto/')
            ? `../categoria/${file}`
            : `categoria/${file}`;
    }
    return `/categoria/${file}`;
}

function setImage(images, index) {
    const image = images[index];
    setProductImageFallback(productMainImage);
    productMainImage.src = productImageUrl(image);
    productMainImage.alt = currentProduct.title;
    thumbnailList.querySelectorAll('button').forEach((button, buttonIndex) => button.classList.toggle('active', buttonIndex === index));
}

function updateQuantity() {
    const max = currentProduct.stock || 99;
    selectedQuantity = Math.max(1, Math.min(selectedQuantity, max));
    quantityValue.textContent = String(selectedQuantity);
    quantityMinus.disabled = selectedQuantity <= 1;
    quantityPlus.disabled = selectedQuantity >= max;
    updateActionLinks();
}

function updateActionLinks() {
    if (!currentProduct || currentProduct.status === 'sold_out') return;
    // Los productos creados desde Admin no tienen legacy_id; app.js los
    // identifica con este mismo rango para mantener el carrito compatible.
    const checkoutProductId = currentProduct.legacy_id ?? (1000000 + Number(currentProduct.id));
    const params = new URLSearchParams({
        producto: String(checkoutProductId),
        comprar: '1',
        talla: selectedSize,
        cantidad: String(selectedQuantity)
    });
    buyButton.href = `/?${params.toString()}`;
    params.delete('comprar');
    params.set('agregar', '1');
    addCartButton.href = `/?${params.toString()}`;
}

function inferProductSpecs(product) {
    const content = `${text(product.title)} ${text(product.description)}`.toLowerCase();
    const fit = /oversized|holgad|ampli/.test(content) ? 'Oversized' : /skinny/.test(content) ? 'Skinny' : /baggy/.test(content) ? 'Baggy' : /flare|acampanad/.test(content) ? 'Flare' : /cropped/.test(content) ? 'Cropped' : 'Regular';
    const material = /cuero sint|faux leather/.test(content) ? 'Cuero sintético' : /denim|jean/.test(content) ? 'Denim' : /algod[oó]n/.test(content) ? 'Algodón mixto' : /poli[eé]ster/.test(content) ? 'Mezcla de poliéster' : 'Consultar composición';
    const colorMatch = text(product.title).match(/\s-\s(.+)$/);
    return { fit, material, color: colorMatch?.[1] || 'Según imagen', care: material === 'Cuero sintético' ? 'Paño húmedo · no secadora' : 'Lavado frío · al revés' };
}

function renderSizeGuide(product) {
    const guide = product.category === 'jeans-pants' ? SIZE_GUIDES.jeans : SIZE_GUIDES.tops;
    document.getElementById('size-guide-intro').textContent = guide.intro;
    const customMeasurements = product.measurements && typeof product.measurements === 'object' ? product.measurements : {};
    const customSizes = Object.keys(customMeasurements);
    if (customSizes.length) {
        const measurementKeys = [...new Set(customSizes.flatMap(size => Object.keys(customMeasurements[size] || {})))];
        document.getElementById('size-guide-head').innerHTML = `<tr><th scope="col">Talla</th>${measurementKeys.map(key => `<th scope="col">${text(key).replaceAll('_', ' ')}</th>`).join('')}</tr>`;
        document.getElementById('size-guide-body').innerHTML = customSizes.map(size => `<tr><th scope="row">${size}</th>${measurementKeys.map(key => `<td>${text(customMeasurements[size]?.[key] ?? '—')}${customMeasurements[size]?.[key] !== undefined ? ' cm' : ''}</td>`).join('')}</tr>`).join('');
        document.getElementById('size-guide-intro').textContent = 'Medidas reales registradas para este modelo. Compara con una prenda similar colocada sobre una superficie plana.';
    } else {
        document.getElementById('size-guide-head').innerHTML = `<tr>${guide.columns.map(column => `<th scope="col">${column}</th>`).join('')}</tr>`;
        document.getElementById('size-guide-body').innerHTML = guide.rows.map(row => `<tr>${row.map((value, index) => index ? `<td>${value} cm</td>` : `<th scope="row">${value}</th>`).join('')}</tr>`).join('');
    }
    const help = document.getElementById('size-guide-help');
    help.href = `https://wa.me/51962210278?text=${encodeURIComponent(`Hola LYNX, necesito ayuda con la talla de ${product.title}. Mis medidas son:`)}`;
}

function persuasiveBenefit(product, fit) {
    if (product.category === 'jeans-pants') return `${fit === 'Flare' || fit === 'Skinny' ? 'Su silueta alarga visualmente las piernas y marca el outfit sin esfuerzo.' : 'Su volumen aporta una silueta streetwear relajada y actual.'} Úsalo con un hoodie o jacket LYNX para construir un look completo.`;
    if (product.category === 'conjuntos') return 'Un look coordinado elimina las dudas al combinar: úsalo completo para máximo impacto o separa las piezas para multiplicar tus outfits.';
    if (fit === 'Oversized') return 'El fit oversized aporta presencia y comodidad sin verse descuidado. Funciona solo o en capas y eleva un jean básico al instante.';
    return 'Una pieza protagonista que convierte un outfit sencillo en un look con identidad. Combínala con denim oscuro o flare para equilibrar la silueta.';
}

function renderProduct(product) {
    currentProduct = product;
    const sourceImages = Array.isArray(product.images) && product.images.length ? product.images.filter(Boolean) : [];
    const images = window.LynxProductImages?.withMockup(product.slug, sourceImages) || sourceImages;
    if (!images.length) images.push('/assets/logo-transparent.png');
    const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['ÚNICA'];
    const status = statusCopy(product);
    selectedSize = sizes[0];

    document.title = `${text(product.title)} | LYNX`;
    document.querySelector('meta[name="description"]').content = text(product.description).slice(0, 155) || `Compra ${text(product.title)} en LYNX.`;
    const categoryLink = document.getElementById('product-category');
    categoryLink.textContent = text(product.category).replaceAll('-', ' ').toUpperCase();
    categoryLink.href = productCategoryUrl(product.category);
    document.getElementById('product-title').textContent = text(product.title);
    document.getElementById('product-price').textContent = `S/. ${Number(product.price || 0).toFixed(2)}`;
    document.getElementById('product-description').textContent = text(product.description);
    document.getElementById('stock-note').textContent = status.note;
    document.getElementById('stock-note').classList.toggle('sold', Boolean(status.sold));
    productBadge.textContent = status.badge;
    document.getElementById('fit-note').hidden = product.category !== 'jeans-pants' || product.fit_recommendation === false;
    const inferredSpecs = inferProductSpecs(product);
    const specs = {
        fit: text(product.fit_type).trim() || inferredSpecs.fit,
        material: text(product.material).trim() || inferredSpecs.material,
        color: text(product.color).trim() || inferredSpecs.color,
        care: text(product.care_instructions).trim() || inferredSpecs.care
    };
    document.getElementById('product-fit').textContent = specs.fit;
    document.getElementById('product-material').textContent = specs.material;
    document.getElementById('product-color').textContent = specs.color;
    document.getElementById('product-care').textContent = specs.care;
    document.getElementById('product-benefit').textContent = persuasiveBenefit(product, specs.fit);
    const weightRow = document.getElementById('product-weight-row');
    weightRow.hidden = !Number(product.weight_grams);
    if (!weightRow.hidden) document.getElementById('product-weight').textContent = `${Number(product.weight_grams)} g aprox.`;
    renderSizeGuide(product);

    thumbnailList.innerHTML = '';
    images.forEach((source, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = index === 0 ? 'active' : '';
        button.setAttribute('aria-label', `Ver foto ${index + 1} de ${product.title}`);
        const image = document.createElement('img');
        setProductImageFallback(image);
        image.src = productImageUrl(source);
        image.alt = '';
        image.loading = index === 0 ? 'eager' : 'lazy';
        image.fetchPriority = index === 0 ? 'high' : 'low';
        button.append(image);
        button.addEventListener('click', () => setImage(images, index));
        thumbnailList.append(button);
    });
    setImage(images, 0);

    sizeList.innerHTML = '';
    sizes.forEach((size, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = size;
        button.className = index === 0 ? 'active' : '';
        button.addEventListener('click', () => {
            selectedSize = size;
            sizeList.querySelectorAll('button').forEach(candidate => candidate.classList.toggle('active', candidate === button));
            sizeSelectionNote.textContent = `Talla seleccionada: ${size}`;
            sizeSelectionNote.classList.add('is-selected');
            updateActionLinks();
        });
        sizeList.append(button);
    });

    quantityMinus.addEventListener('click', () => { selectedQuantity -= 1; updateQuantity(); });
    quantityPlus.addEventListener('click', () => { selectedQuantity += 1; updateQuantity(); });
    updateQuantity();

    if (status.sold) {
        addCartButton.textContent = 'PRODUCTO AGOTADO';
        addCartButton.setAttribute('aria-disabled', 'true');
        buyButton.textContent = 'PRODUCTO AGOTADO';
        buyButton.setAttribute('aria-disabled', 'true');
    } else {
        updateActionLinks();
    }

    productLoading.hidden = true;
    productView.hidden = false;
    window.LynxTracking?.track('view_item', { product_id: product.id, product_name: product.title, category: product.category, value: Number(product.price || 0) });
    window.lucide?.createIcons();
}

sizeGuideTrigger?.addEventListener('click', () => sizeGuideDialog?.showModal());
sizeGuideClose?.addEventListener('click', () => sizeGuideDialog?.close());
sizeGuideDialog?.addEventListener('click', event => { if (event.target === sizeGuideDialog) sizeGuideDialog.close(); });
addCartButton?.addEventListener('click', () => currentProduct && window.LynxTracking?.track('add_to_cart', { product_id: currentProduct.id, product_name: currentProduct.title, size: selectedSize, quantity: selectedQuantity, value: Number(currentProduct.price || 0) * selectedQuantity }));
buyButton?.addEventListener('click', () => currentProduct && window.LynxTracking?.track('begin_checkout', { source: 'product_page', product_id: currentProduct.id, value: Number(currentProduct.price || 0) * selectedQuantity }));

async function loadProduct() {
    if ((!Number.isInteger(productId) || productId < 1) && !productSlug) throw new Error('Producto inválido');
    const client = window.getLynxSupabase?.();
    if (!client) throw new Error('No se pudo conectar al catálogo');
    const baseFields = 'id,legacy_id,title,slug,category,price,stock,sizes,images,description,badge,status,fit_recommendation,sort_order';
    const extendedFields = `${baseFields},color,material,fit_type,care_instructions,weight_grams,measurements`;
    const queryProduct = async fields => {
        const request = client.from('products').select(fields).neq('status', 'archived').limit(1);
        return productSlug
            ? request.eq('slug', productSlug).maybeSingle()
            : request.or(`id.eq.${productId},legacy_id.eq.${productId}`).maybeSingle();
    };
    let { data, error } = await queryProduct(extendedFields);
    if (error && /column|schema cache|color|material|measurements/i.test(error.message || '')) {
        ({ data, error } = await queryProduct(baseFields));
    }
    if (error) throw error;
    if (!data) throw new Error('Producto no encontrado');
    return data;
}

loadProduct().then(renderProduct).catch(() => {
    productLoading.hidden = true;
    // Las fichas SEO generadas ya contienen una copia completa del producto.
    // Si Supabase falla temporalmente, conservamos ese contenido rastreable y
    // utilizable en vez de reemplazarlo por un falso "no disponible".
    if (productView.dataset.staticProduct !== 'true') {
        productNotFound.hidden = false;
    }
});
