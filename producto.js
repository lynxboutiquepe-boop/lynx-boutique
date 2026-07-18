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
const buyButton = document.getElementById('buy-button');

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
    if (!value) return '/assets/logo-transparent.png';
    // Las fotos locales deben resolverse desde la raíz, no desde la URL de la ficha.
    if (/^(?:https?:|data:|\/)/i.test(value)) return value;
    return `/${value.replace(/^\.?(?:\/|\\)/, '')}`;
}

function statusCopy(product) {
    if (product.status === 'sold_out') return { badge: 'AGOTADO', note: 'AGOTADO POR EL MOMENTO', sold: true };
    if (product.status === 'preorder') return { badge: 'PREVENTA', note: 'PREVENTA · RESERVA TU PRENDA' };
    if (product.status === 'low_stock') return { badge: product.badge || 'ÚLTIMAS UNIDADES', note: 'ÚLTIMAS UNIDADES DISPONIBLES' };
    return { badge: product.badge || 'NUEVO DROP', note: product.stock ? `${product.stock} ${product.stock === 1 ? 'UNIDAD DISPONIBLE' : 'UNIDADES DISPONIBLES'}` : '' };
}

function setImage(images, index) {
    const image = images[index];
    productMainImage.onerror = () => {
        productMainImage.onerror = null;
        productMainImage.src = '/assets/logo-transparent.png';
    };
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
    updateBuyLink();
}

function updateBuyLink() {
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
}

function renderProduct(product) {
    currentProduct = product;
    const images = Array.isArray(product.images) && product.images.length ? product.images.filter(Boolean) : ['/assets/logo-transparent.png'];
    const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['ÚNICA'];
    const status = statusCopy(product);
    selectedSize = sizes[0];

    document.title = `${text(product.title)} | LYNX`;
    document.querySelector('meta[name="description"]').content = text(product.description).slice(0, 155) || `Compra ${text(product.title)} en LYNX.`;
    document.getElementById('product-category').textContent = text(product.category).replaceAll('-', ' ').toUpperCase();
    document.getElementById('product-title').textContent = text(product.title);
    document.getElementById('product-price').textContent = `S/. ${Number(product.price || 0).toFixed(2)}`;
    document.getElementById('product-description').textContent = text(product.description);
    document.getElementById('stock-note').textContent = status.note;
    document.getElementById('stock-note').classList.toggle('sold', Boolean(status.sold));
    productBadge.textContent = status.badge;
    document.getElementById('fit-note').hidden = product.category !== 'jeans-pants' || product.fit_recommendation === false;

    thumbnailList.innerHTML = '';
    images.forEach((source, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = index === 0 ? 'active' : '';
        button.setAttribute('aria-label', `Ver foto ${index + 1} de ${product.title}`);
        const image = document.createElement('img');
        image.onerror = () => {
            image.onerror = null;
            image.src = '/assets/logo-transparent.png';
        };
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
            updateBuyLink();
        });
        sizeList.append(button);
    });

    quantityMinus.addEventListener('click', () => { selectedQuantity -= 1; updateQuantity(); });
    quantityPlus.addEventListener('click', () => { selectedQuantity += 1; updateQuantity(); });
    updateQuantity();

    if (status.sold) {
        buyButton.textContent = 'PRODUCTO AGOTADO';
        buyButton.setAttribute('aria-disabled', 'true');
    } else {
        updateBuyLink();
    }

    productLoading.hidden = true;
    productView.hidden = false;
}

async function loadProduct() {
    if ((!Number.isInteger(productId) || productId < 1) && !productSlug) throw new Error('Producto inválido');
    const client = window.getLynxSupabase?.();
    if (!client) throw new Error('No se pudo conectar al catálogo');
    const request = client.from('products').select('*').neq('status', 'archived').limit(1);
    const { data, error } = productSlug
        ? await request.eq('slug', productSlug).maybeSingle()
        : await request.or(`id.eq.${productId},legacy_id.eq.${productId}`).maybeSingle();
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
