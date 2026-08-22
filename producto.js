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

let sizeGuideUnit = 'cm';

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
    const sizedStock = currentProduct.status !== 'preorder' && currentProduct.size_stock && Object.prototype.hasOwnProperty.call(currentProduct.size_stock,selectedSize) ? Number(currentProduct.size_stock[selectedSize]) : null;
    const numericStock = Number(currentProduct.stock);
    const max = currentProduct.status === 'preorder' ? 20 : Number.isFinite(sizedStock) ? sizedStock : Number.isFinite(numericStock) ? numericStock : 99;
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

function guideRowMatchesSizes(row, sizes) {
    if (sizes.includes(String(row.size).toUpperCase())) return true;
    const range = String(row.bottom?.in || '').match(/(\d+)\D+(\d+)/);
    return range && sizes.some(size => {
        // “30/32” es una sola talla de jean (cintura/entrepierna), no dos
        // variantes separadas. Para ubicarla en la guía usamos la cintura 30.
        const numeric = Number(String(size).match(/^\d+/)?.[0]);
        return Number.isFinite(numeric) && numeric >= Number(range[1]) && numeric <= Number(range[2]);
    });
}

function renderSizeGuide(product) {
    const data = window.LynxSizeGuide;
    const guide = product.category === 'jeans-pants' ? data?.guides.bottoms : data?.guides.tops;
    if (!guide) return;
    document.getElementById('size-guide-intro').textContent = guide.intro;
    const customMeasurements = product.measurements && typeof product.measurements === 'object' ? product.measurements : {};
    const customSizes = Object.keys(customMeasurements);
    const kind = document.getElementById('size-guide-kind');
    const disclaimer = document.getElementById('size-guide-disclaimer');
    const source = document.getElementById('size-guide-source');
    if (customSizes.length) {
        const measurementKeys = [...new Set(customSizes.flatMap(size => Object.keys(customMeasurements[size] || {})))];
        document.getElementById('size-guide-head').innerHTML = `<tr><th scope="col">Talla</th>${measurementKeys.map(key => `<th scope="col">${text(key).replaceAll('_', ' ')}</th>`).join('')}</tr>`;
        document.getElementById('size-guide-body').innerHTML = customSizes.map(size => `<tr class="is-available"><th scope="row">${size}</th>${measurementKeys.map(key => {
            const raw = customMeasurements[size]?.[key];
            const value = raw === undefined ? '—' : sizeGuideUnit === 'in' && Number.isFinite(Number(raw)) ? (Number(raw) / 2.54).toFixed(1) : text(raw);
            return `<td>${value}${raw !== undefined ? ` ${sizeGuideUnit}` : ''}</td>`;
        }).join('')}</tr>`).join('');
        document.getElementById('size-guide-intro').textContent = 'Medidas reales registradas para este modelo. Revisa si cada dato indica ancho o contorno antes de comparar.';
        kind.textContent = 'MEDIDAS REALES DE LA PRENDA';
        disclaimer.textContent = 'Estas medidas corresponden a la prenda, no al cuerpo, y pueden variar aproximadamente 1–2 cm. Sigue el método indicado en cada dato.';
        source.hidden = true;
    } else {
        const sizes = (product.sizes || []).map(size => String(size).toUpperCase());
        document.getElementById('size-guide-head').innerHTML = `<tr>${guide.columns.map(column => `<th scope="col">${column.label}</th>`).join('')}</tr>`;
        document.getElementById('size-guide-body').innerHTML = guide.rows.map(row => `<tr class="${guideRowMatchesSizes(row, sizes) ? 'is-available' : ''}">${guide.columns.map((column, index) => {
            const value = column.key === 'size' ? row.size : data.valueForUnit(row[column.key], sizeGuideUnit);
            return index ? `<td>${value} ${sizeGuideUnit}</td>` : `<th scope="row">${value}</th>`;
        }).join('')}</tr>`).join('');
        kind.textContent = 'MEDIDAS CORPORALES · FASHION NOVA MEN';
        disclaimer.textContent = 'Tabla corporal de referencia basada en Fashion Nova Men. No representa el ancho de la prenda extendida. El corte puede variar por modelo; las medidas reales de la prenda, cuando aparezcan, tienen prioridad.';
        source.hidden = false;
        source.href = data.sourceUrl;
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
    if (product.status !== 'preorder' && Number(product.stock) <= 0) {
        status.sold = true;
        status.badge = 'AGOTADO';
        status.note = 'AGOTADO POR EL MOMENTO';
    }
    selectedSize = product.status === 'preorder' ? sizes[0] : sizes.find(size => !(product.size_stock && Object.prototype.hasOwnProperty.call(product.size_stock,size)) || Number(product.size_stock[size]) > 0) || '';
    if (!selectedSize) {
        status.sold = true;
        status.badge = 'AGOTADO';
        status.note = 'Todas las tallas están agotadas';
    }

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
        const unavailable = product.status !== 'preorder' && product.size_stock && Object.prototype.hasOwnProperty.call(product.size_stock,size) && Number(product.size_stock[size]) <= 0;
        button.disabled = unavailable;
        button.className = size === selectedSize ? 'active' : '';
        if (unavailable) button.setAttribute('aria-label', `Talla ${size} agotada`);
        button.addEventListener('click', () => {
            if (button.disabled) return;
            selectedSize = size;
            sizeList.querySelectorAll('button').forEach(candidate => candidate.classList.toggle('active', candidate === button));
            sizeSelectionNote.textContent = `Talla seleccionada: ${size}`;
            sizeSelectionNote.classList.add('is-selected');
            selectedQuantity = 1;
            updateQuantity();
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
document.getElementById('size-unit-cm')?.addEventListener('click', () => {
    sizeGuideUnit = 'cm';
    document.getElementById('size-unit-cm').classList.add('active');
    document.getElementById('size-unit-in').classList.remove('active');
    document.getElementById('size-unit-cm').setAttribute('aria-pressed', 'true');
    document.getElementById('size-unit-in').setAttribute('aria-pressed', 'false');
    if (currentProduct) renderSizeGuide(currentProduct);
});
document.getElementById('size-unit-in')?.addEventListener('click', () => {
    sizeGuideUnit = 'in';
    document.getElementById('size-unit-in').classList.add('active');
    document.getElementById('size-unit-cm').classList.remove('active');
    document.getElementById('size-unit-in').setAttribute('aria-pressed', 'true');
    document.getElementById('size-unit-cm').setAttribute('aria-pressed', 'false');
    if (currentProduct) renderSizeGuide(currentProduct);
});
addCartButton?.addEventListener('click', () => currentProduct && window.LynxTracking?.track('add_to_cart', { product_id: currentProduct.id, product_name: currentProduct.title, size: selectedSize, quantity: selectedQuantity, value: Number(currentProduct.price || 0) * selectedQuantity }));
buyButton?.addEventListener('click', () => currentProduct && window.LynxTracking?.track('begin_checkout', { source: 'product_page', product_id: currentProduct.id, value: Number(currentProduct.price || 0) * selectedQuantity }));

async function loadProduct() {
    if ((!Number.isInteger(productId) || productId < 1) && !productSlug) throw new Error('Producto inválido');
    const client = window.getLynxSupabase?.();
    if (!client) throw new Error('No se pudo conectar al catálogo');
    const baseFields = 'id,legacy_id,title,slug,category,price,stock,sizes,images,description,badge,status,fit_recommendation,sort_order';
    const extendedFields = `${baseFields},color,material,fit_type,care_instructions,weight_grams,measurements,size_stock`;
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
