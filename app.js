// LYNX STREETWEAR DEPT. - APP LOGIC
// El CDN de iconos puede ser bloqueado por algunos navegadores o redes.
// Este respaldo mantiene todos los flujos funcionales aunque los iconos no carguen.
window.lucide = window.lucide || { createIcons() {} };
const PRODUCT_IMAGE_CACHE_VERSION = '20260814-photo-fix-v1';

const PRODUCT_MOCKUPS = {
    'stacked-skinny-sun-damage': 'mockups-finales/stacked-skinny-sun-damage-1-mockup.png',
    'day-to-day-cable-knit': 'mockups-finales/day-to-day-cable-knit-1-mockup.png',
    'carried-cargo-black': 'mockups-finales/carried-cargo-black-1-mockup.png',
    'be-brave-fearless': 'mockups-finales/be-brave-fearless-1-mockup.png',
    'through-it-ripped': 'mockups-finales/through-it-ripped-1-mockup.png',
    'simi-fray-cargo': 'mockups-finales/simi-fray-cargo-1-mockup.png',
    'loyalty-royalty-hoodie': 'mockups-finales/loyalty-royalty-hoodie-1-mockup.png',
    'cornell-slim-flare': 'mockups-finales/cornell-slim-flare-1-mockup.png',
    'on-the-set-stacked': 'mockups-finales/on-the-set-stacked-1-mockup.png',
    'get-started-cargo': 'mockups-finales/get-started-cargo-1-mockup.png',
    'tapestry-hit-jean': 'mockups-finales/tapestry-hit-jean-1-mockup.png',
    'malcom-x-hoodie': 'mockups-finales/malcom-x-hoodie-1-mockup.png',
    'paisley-jacquard-parka': 'mockups-finales/paisley-jacquard-parka-1-mockup.png',
    'phantom-bomber-charcoal': 'mockups-finales/phantom-bomber-charcoal-1-mockup.png',
    'sherpa-aviator-brown': 'mockups-finales/sherpa-aviator-brown-1-mockup.png',
    'cropped-moto-black': 'mockups-finales/cropped-moto-black-3-mockup.png',
    'contrast-varsity-blue': 'mockups-finales/contrast-varsity-blue-1-mockup.png',
    'tyson-trust-issues': 'mockups-finales/tyson-trust-issues-1-mockup.png',
    'bulls-campus-zip': 'mockups-finales/bulls-campus-zip-6-mockup.png',
    'dope-dreams-hoodie': 'mockups-finales/dope-dreams-hoodie-1-mockup.png',
    'saints-and-sinners-lifecycle-oversized-hoodie': 'mockups-finales/saints-and-sinners-lifecycle-oversized-hoodie-1-mockup.png',
    'dope-dreams-varsity-jacket': 'mockups-finales/dope-dreams-varsity-jacket-1-mockup.png',
    'cropped-coated-padded-faux-leather-bomber-jacket': 'mockups-finales/cropped-coated-padded-faux-leather-bomber-jacket-3-mockup.png',
    'faux-suede-embroidered-blossom-bomber-jacket': 'mockups-finales/faux-suede-embroidered-blossom-bomber-jacket-1-mockup.png',
    'ghost-distressed-printed-denim-jacket': 'mockups-finales/ghost-distressed-printed-denim-jacket-1-mockup.png',
    'saints-rhinestones-sweatpants': 'mockups-finales/saints-rhinestones-sweatpants-1-mockup.png',
    'stacked-skinny-flare-be-brave-be-fearless-embridered-jean': 'mockups-finales/stacked-skinny-flare-be-brave-be-fearless-embridered-jean-1-mockup.png',
    'about-fray-stacked-skinny-flare-jeans-black-wash': 'mockups-finales/about-fray-stacked-skinny-flare-jeans-black-wash-1-mockup.png',
    'move-up-plaid-shacket': 'mockups-finales/move-up-plaid-shacket-1-mockup.png',
    'oversized-corduroy-hooded-bomber-jacket': 'mockups-finales/oversized-corduroy-hooded-bomber-jacket-1-mockup.png',
    'pearl-wildin-camo-cargo-baggy-pants': 'mockups-finales/pearl-wildin-camo-cargo-baggy-pants-1-mockup.png',
    'baggy-ghost-distressed-printed-jean': 'mockups-finales/baggy-ghost-distressed-printed-jean-1-mockup.png',
    'saints-rhinestones-oversized-hoodie': 'mockups-finales/saints-rhinestones-oversized-hoodie-1-mockup.png',
    'about-fray-stacked-skinny-flare-jeans-light-wash': 'mockups-finales/about-fray-stacked-skinny-flare-jeans-light-wash-1-mockup.png',
    'stacked-skinny-flare-frayed-along-panel-jean': 'mockups-finales/stacked-skinny-flare-frayed-along-panel-jean-1-mockup.png',
    'straight-flare-static-drip-jeweled-jean': 'mockups-finales/straight-flare-static-drip-jeweled-jean-1-mockup.png',
    'padded-hooded-faux-trim-iced-out-parka': 'mockups-finales/padded-hooded-faux-trim-iced-out-parka-1-mockup.png',
    'cowboys-monster-oversized-zip-up-hoodie': 'mockups-finales/cowboys-monster-oversized-zip-up-hoodie-1-mockup.png',
    'heartbreakers-players-club-skinny-flare-sweatpants-black': 'mockups-finales/heartbreakers-players-club-skinny-flare-sweatpants-black-1-mockup.png',
    'unknown-fate-flared-sweatpants-black': 'mockups-finales/unknown-fate-flared-sweatpants-black-1-mockup.png',
    'all-around-fray-stacked-skinny-flare-pants-brown-combo': 'mockups-finales/all-around-fray-stacked-skinny-flare-pants-brown-combo-1-mockup.png',
    'bold-flock-hoodie-black': 'mockups-finales/bold-flock-hoodie-black-1-mockup.png',
    'look-at-me-stacked-skinny-jeans-vintage-blue-wash': 'mockups-finales/look-at-me-stacked-skinny-jeans-vintage-blue-wash-1-mockup.png',
    'lakers-wavey-oversized-zip-hoodie-purple': 'mockups-finales/lakers-wavey-oversized-zip-hoodie-purple-1-mockup.png',
    'lakers-wavey-wide-sweatpants-purple': 'mockups-finales/lakers-wavey-wide-sweatpants-purple-1-mockup.png',
    'tumble-slim-flare-jeans-light-blue-wash': 'mockups-finales/tumble-slim-flare-jeans-light-blue-wash-1-mockup.png',
    'contrast-skinny-stacked-flared-cargo-pants-camouflage': 'mockups-finales/contrast-skinny-stacked-flared-cargo-pants-camouflage-1-mockup.png',
    'textured-cable-knit-cabin-puffer-jacket-yellow': 'mockups-finales/textured-cable-knit-cabin-puffer-jacket-yellow-1-mockup.png',
    'in-the-cut-camo-sweatpants-grey-combo': 'mockups-finales/in-the-cut-camo-sweatpants-grey-combo-1-mockup.png',
    'in-the-cut-camo-zip-up-hoodie-grey-combo': 'mockups-finales/in-the-cut-camo-zip-up-hoodie-grey-combo-1-mockup.png',
    'tyson-die-rich-quarter-zip-sweatshirt-black-wash': 'mockups-finales/tyson-die-rich-quarter-zip-sweatshirt-black-wash-1-mockup.png',
    'antisocial-rhinestone-pearl-oversized-hoodie-navy': 'mockups-finales/antisocial-rhinestone-pearl-oversized-hoodie-navy-1-mockup.png',
    'cropped-utility-corduroy-collar-work-jacket-olive': 'mockups-finales/cropped-utility-corduroy-collar-work-jacket-olive-1-mockup.png',
    'relaxed-96-faux-pebble-leather-varsity-jacket-navy': 'mockups-finales/relaxed-96-faux-pebble-leather-varsity-jacket-navy-1-mockup.png',
    'rosa-parks-nah-embroidered-hoodie-black': 'mockups-finales/rosa-parks-nah-embroidered-hoodie-black-1-mockup.png',
    'heartbreakers-players-club-hoodie-black': 'mockups-finales/heartbreakers-players-club-hoodie-black-1-mockup.png',
    'nyc-all-star-hoodie-powder-blue': 'mockups-finales/nyc-all-star-hoodie-powder-blue-1-mockup.png',
    'skeleton-stars-embroidered-oversized-hoodie-black': 'mockups-finales/skeleton-stars-embroidered-oversized-hoodie-black-1-mockup.png',
    'cropped-paisley-jacquard-denim-work-jacket-dark-wash': 'mockups-finales/cropped-paisley-jacquard-denim-work-jacket-dark-wash-1-mockup.png'
};

function optimizedStoreImage(source = '') {
    const optimized = String(source).replace(
        /(mockups-finales\/[^?#]+)\.png(?=([?#]|$))/i,
        '$1.webp'
    );
    if (!optimized || /^(?:https?:|data:|blob:)/i.test(optimized)) return optimized;
    if (!/[?&]lynx_img=/.test(optimized)) {
        const [path, hash = ''] = optimized.split('#', 2);
        const separator = path.includes('?') ? '&' : '?';
        return `${path}${separator}lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}${hash ? `#${hash}` : ''}`;
    }
    // Keep store assets relative so they work on localhost and when index.html
    // is opened directly from its folder (file://).
    return optimized.replace(/^\.\//, '');
}

function productImages(slug, count = 8) {
    const photos = Array.from({ length: count }, (_, index) => `assets/${slug}/${slug}-${index + 1}.webp`);
    const mockup = PRODUCT_MOCKUPS[slug];
    return mockup ? [optimizedStoreImage(mockup), ...photos] : photos;
}

const LOCAL_PRODUCT_IMAGE_OVERRIDES = {
    '49ers-monster-oversized-zip-up-hoodie-red': [
        'mockups-finales/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-51-32_98672_PXF-mockup.webp',
        'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-1.jpg',
        'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-2.jpg',
        'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-3.jpg',
        'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-4.jpg'
    ]
};

// 1. DATA DE PRODUCTOS POR DEFECTO
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        title: '49ers Monster Oversized Zip Up Hoodie - Red',
        category: 'hoodies-jackets',
        price: 109.90,
        images: [
            'mockups-finales/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-51-32_98672_PXF-mockup.png',
            'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-1.jpg',
            'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-2.jpg',
            'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-3.jpg',
            'assets/49ers-monster-oversized-zip-up-hoodie-red/49ers-monster-oversized-zip-up-hoodie-red-4.jpg'
        ],
        get image() { return this.images[0]; },
        description: 'Hoodie oversized de los 49ers con cierre completo. Confeccionado en 60% Algodón y 40% Poliéster. Fit amplio y cómodo, perfecto para el día a día.',
        badge: 'NUEVO DROP'
    },
    {
        id: 2,
        title: 'Tyson Lost Saints Oversized Hoodie - Negro/Combinado',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['S'],
        images: [
            'mockups-finales/tyson-lost-saints-1-mockup.png',
            'assets/tyson-lost-saints/tyson-lost-saints-1.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-2.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-3.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-4.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-5.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-6.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-7.webp',
            'assets/tyson-lost-saints/tyson-lost-saints-8.webp'
        ],
        get image() { return this.images[0]; },
        description: 'Sudadera holgada con capucha en color negro combinado y gráficos Lost Saints. Diseño oversized, cómodo y abrigador. Disponible únicamente en talla S.',
        badge: 'TALLA S'
    },
    {
        id: 3,
        title: 'Stacked Skinny Flare Sun Damage Nova Stretch Jean - Vintage Wash',
        category: 'jeans-pants',
        price: 159.90,
        sizes: ['36'],
        images: productImages('stacked-skinny-sun-damage'),
        get image() { return this.images[0]; },
        description: 'Jean Nova Stretch en lavado vintage, con silueta skinny apilada, pierna acampanada y detalles desgastados Sun Damage. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 4,
        title: 'Day To Day Cable Knit Crewneck Sweater - Hueso',
        category: 'hoodies-jackets',
        price: 99.90,
        sizes: ['L'],
        images: productImages('day-to-day-cable-knit'),
        get image() { return this.images[0]; },
        description: 'Suéter de cuello redondo en tono hueso, con tejido trenzado clásico y un estilo versátil para combinar en capas. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 5,
        title: 'Carried Cargo Stacked Skinny Flared Jeans - Negro',
        category: 'jeans-pants',
        price: 219.90,
        sizes: ['36'],
        images: productImages('carried-cargo-black'),
        get image() { return this.images[0]; },
        description: 'Jean cargo negro con corte skinny apilado, pierna acampanada y bolsillos utilitarios que aportan un look urbano. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 6,
        title: 'Stacked Skinny Flare Be Brave Be Fearless Embroidered Jean - Deslavado Oscuro',
        category: 'jeans-pants',
        price: 189.90,
        sizes: ['36'],
        images: productImages('be-brave-fearless'),
        get image() { return this.images[0]; },
        description: 'Jean de lavado oscuro con corte skinny apilado, pierna acampanada y detalles bordados Be Brave Be Fearless. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 7,
        title: 'Through It Ripped Skinny Flared Jeans - Deslavado Antiguo Azul',
        category: 'jeans-pants',
        price: 189.90,
        sizes: ['36'],
        images: productImages('through-it-ripped'),
        get image() { return this.images[0]; },
        description: 'Jean azul de lavado vintage con corte skinny, pierna acampanada y acabados rasgados para un look desgastado. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 8,
        title: 'Simi Fray Cargo Stacked Skinny Flare Jeans - Negro',
        category: 'jeans-pants',
        price: 189.90,
        sizes: ['36', '38'],
        images: productImages('simi-fray-cargo'),
        get image() { return this.images[0]; },
        description: 'Jean cargo negro con silueta apilada, pierna acampanada y detalles deshilachados. Disponible en tallas 36 y 38.',
        badge: 'TALLAS 36 Y 38'
    },
    {
        id: 9,
        title: 'Loyalty Royalty Oversized Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['L'],
        images: productImages('loyalty-royalty-hoodie'),
        get image() { return this.images[0]; },
        description: 'Sudadera negra con capucha, gráficos Loyalty Royalty y silueta oversized para un fit amplio de inspiración urbana. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 10,
        title: 'Cornell Slim Flare Jeans - Deslavado Antiguo Azul',
        category: 'jeans-pants',
        price: 189.90,
        sizes: ['36'],
        images: productImages('cornell-slim-flare', 7),
        get image() { return this.images[0]; },
        description: 'Jean azul de lavado vintage con corte slim y pierna acampanada para una silueta moderna. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 11,
        title: 'On The Set Stacked Skinny Snap Flare Jeans - Vintage Wash',
        category: 'jeans-pants',
        price: 219.90,
        sizes: ['36'],
        images: productImages('on-the-set-stacked'),
        get image() { return this.images[0]; },
        description: 'Jean de lavado vintage con corte skinny apilado, pierna acampanada y detalle de broches en el bajo. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 12,
        title: 'Get Started Cargo Stacked Skinny Flare Jeans - Deslavado Medio',
        category: 'jeans-pants',
        price: 219.90,
        sizes: ['36'],
        images: productImages('get-started-cargo'),
        get image() { return this.images[0]; },
        description: 'Jean cargo en lavado medio con corte skinny apilado, pierna acampanada y bolsillos utilitarios. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 13,
        title: 'Stacked Skinny Flare With Tapestry Hit Jean - Vintage Wash',
        category: 'jeans-pants',
        price: 189.90,
        sizes: ['34', '36'],
        images: productImages('tapestry-hit-jean'),
        get image() { return this.images[0]; },
        description: 'Jean de lavado vintage con corte skinny apilado, pierna acampanada y detalles decorativos tipo tapestry. Disponible en tallas 34 y 36.',
        badge: 'TALLAS 34 Y 36'
    },
    {
        id: 14,
        title: 'Malcom X Embroidered Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['L'],
        images: productImages('malcom-x-hoodie', 7),
        get image() { return this.images[0]; },
        description: 'Sudadera negra con capucha y detalles bordados inspirados en Malcolm X, ideal para un look urbano con identidad. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 15,
        title: 'Hooded Paisley Jacquard Padded Parka - Azul',
        category: 'hoodies-jackets',
        price: 119.90,
        sizes: ['L'],
        images: productImages('paisley-jacquard-parka'),
        get image() { return this.images[0]; },
        description: 'Parka acolchada azul con capucha y acabado jacquard de inspiración paisley, diseñada para destacar en climas fríos. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 16,
        title: 'Oversized Paneled Phantom Bomber Jacket - Carbón',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('phantom-bomber-charcoal'),
        get image() { return this.images[0]; },
        description: 'Bomber acolchada en tono carbón con construcción por paneles y silueta oversized para un fit amplio y contemporáneo. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 17,
        title: 'Sherpa Collared Aviator Jacket - Café',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['L'],
        images: productImages('sherpa-aviator-brown'),
        get image() { return this.images[0]; },
        description: 'Chaqueta aviador en color café con cuello sherpa, de estética clásica y abrigadora para elevar conjuntos casuales. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 18,
        title: 'Cropped Elevated Moto Faux Leather Jacket - Negro',
        category: 'hoodies-jackets',
        price: 119.90,
        sizes: ['L'],
        images: productImages('cropped-moto-black'),
        get image() { return this.images[0]; },
        description: 'Chaqueta moto negra de piel sintética con corte cropped y detalles elevados para un look moderno y estructurado. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 19,
        title: 'Contrast Panel Faux Suede Varsity Jacket - Azul',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['L'],
        images: productImages('contrast-varsity-blue'),
        get image() { return this.images[0]; },
        description: 'Chaqueta varsity azul de gamuza sintética con paneles en contraste y estilo universitario contemporáneo. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 20,
        title: 'Tyson Trust Issues Oversized Hoodie - Gris',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('tyson-trust-issues'),
        get image() { return this.images[0]; },
        description: 'Sudadera gris con capucha, gráficos Trust Issues y silueta oversized para un fit relajado de inspiración urbana. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 21,
        title: 'Bulls Campus Zip Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('bulls-campus-zip'),
        get image() { return this.images[0]; },
        description: 'Sudadera negra con cierre, capucha y gráficos de los Bulls, inspirada en el estilo deportivo universitario. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 22,
        title: 'Dope Dreams Oversized Hoodie - Deslavado Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M', 'L'],
        images: productImages('dope-dreams-hoodie', 7),
        get image() { return this.images[0]; },
        description: 'Sudadera con capucha en negro deslavado, gráficos Dope Dreams y corte oversized para un estilo urbano relajado. Disponible en tallas M y L.',
        badge: 'TALLAS M Y L'
    },
    {
        id: 23,
        title: 'Saints And Sinners Lifecycle Oversized Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('saints-and-sinners-lifecycle-oversized-hoodie', 4),
        get image() { return this.images[0]; },
        description: 'Sudadera negra con capucha, gráfico Saints And Sinners Lifecycle y silueta oversized para un fit amplio y urbano. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 24,
        title: 'Dope Dreams Varsity Jacket - Azul Marino Combinado',
        category: 'hoodies-jackets',
        price: 149.90,
        sizes: ['L'],
        images: productImages('dope-dreams-varsity-jacket', 4),
        get image() { return this.images[0]; },
        description: 'Chaqueta varsity azul marino combinada con gráficos Dope Dreams y estética universitaria contemporánea. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 25,
        title: 'Cropped Coated Padded Faux Leather Bomber Jacket - Negro',
        category: 'hoodies-jackets',
        price: 119.90,
        sizes: ['L'],
        images: productImages('cropped-coated-padded-faux-leather-bomber-jacket', 4),
        get image() { return this.images[0]; },
        description: 'Bomber cropped negra de cuero sintético revestido, con construcción acolchada y una silueta moderna. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 26,
        title: 'Faux Suede Embroidered Blossom Bomber Jacket - Camel',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('faux-suede-embroidered-blossom-bomber-jacket', 4),
        get image() { return this.images[0]; },
        description: 'Bomber de gamuza sintética en tono camel con bordados Blossom y acabado suave de inspiración retro. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 27,
        title: 'Pearl Wildin Camo Button Up Shirt - Negro',
        category: 'conjuntos',
        price: 129.90,
        sizes: ['L'],
        images: productImages('pearl-wildin-camo-button-up-shirt', 4),
        get image() { return this.images[0]; },
        description: 'Camisa negra abotonada con estampado camuflado Pearl Wildin, ideal para usar sola o como sobrecamisa. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 28,
        title: 'Ghost Distressed Printed Denim Jacket - Negro',
        category: 'conjuntos',
        price: 129.90,
        sizes: ['L'],
        images: productImages('ghost-distressed-printed-denim-jacket', 4),
        get image() { return this.images[0]; },
        description: 'Chaqueta denim negra con estampado Ghost y acabados desgastados que aportan una estética urbana marcada. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 29,
        title: 'Saints Rhinestones Sweatpants - Azul Marino',
        category: 'conjuntos',
        price: 109.90,
        sizes: ['XL'],
        fitRecommendation: false,
        images: productImages('saints-rhinestones-sweatpants', 4),
        get image() { return this.images[0]; },
        description: 'Jogger azul marino con detalles Saints en pedrería y fit relajado para un look cómodo con brillo sutil. Disponible en talla XL.',
        badge: 'TALLA XL'
    },
    {
        id: 30,
        title: 'Stacked Skinny Flare Be Brave Be Fearless Embroidered Jean - Deslavado Azul Vintage',
        category: 'jeans-pants',
        price: 189.90,
        sizes: ['36'],
        images: productImages('stacked-skinny-flare-be-brave-be-fearless-embridered-jean', 4),
        get image() { return this.images[0]; },
        description: 'Jean azul vintage con corte skinny apilado, pierna acampanada y bordados Be Brave Be Fearless. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 31,
        title: 'About Fray Stacked Skinny Flare Jeans - Deslavado Negro',
        category: 'jeans-pants',
        price: 199.90,
        sizes: ['38'],
        images: productImages('about-fray-stacked-skinny-flare-jeans-black-wash', 4),
        get image() { return this.images[0]; },
        description: 'Jean negro deslavado con corte skinny apilado, pierna acampanada y detalles deshilachados About Fray. Disponible en talla 38.',
        badge: 'TALLA 38'
    },
    {
        id: 32,
        title: 'High Stepper Faux Leather Button Up Shirt - Gris Oscuro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['L'],
        images: productImages('high-stepper-faux-leather-button-up-shirt', 4),
        get image() { return this.images[0]; },
        description: 'Camisa abotonada de cuero sintético en gris oscuro, con acabado limpio y una estructura moderna. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 33,
        title: 'Move Up Plaid Shacket - Camel',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('move-up-plaid-shacket', 4),
        get image() { return this.images[0]; },
        description: 'Sobrecamisa gruesa a cuadros en tono camel, ideal para combinar en capas con un fit relajado. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 34,
        title: 'Oversized Corduroy Hooded Bomber Jacket - Café',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['L'],
        images: productImages('oversized-corduroy-hooded-bomber-jacket', 4),
        get image() { return this.images[0]; },
        description: 'Bomber oversized de corduroy café con capucha y una silueta amplia de inspiración urbana. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 35,
        title: 'Pearl Wildin Camo Cargo Baggy Pants - Negro',
        category: 'conjuntos',
        price: 129.90,
        sizes: ['L'],
        fitRecommendation: false,
        images: productImages('pearl-wildin-camo-cargo-baggy-pants', 4),
        get image() { return this.images[0]; },
        description: 'Pantalón cargo baggy negro con estampado camuflado Pearl Wildin, bolsillos utilitarios y fit amplio. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 36,
        title: 'Baggy Ghost Distressed Printed Jean - Negro',
        category: 'conjuntos',
        price: 109.90,
        sizes: ['36'],
        images: productImages('baggy-ghost-distressed-printed-jean', 4),
        get image() { return this.images[0]; },
        description: 'Jean baggy negro con estampado Ghost y acabados desgastados. Disponible en talla 36, equivalente aproximado a L.',
        badge: 'TALLA 36 (L)'
    },
    {
        id: 37,
        title: 'Saints Rhinestones Oversized Hoodie - Azul Marino',
        category: 'conjuntos',
        price: 109.90,
        sizes: ['L'],
        images: productImages('saints-rhinestones-oversized-hoodie', 4),
        get image() { return this.images[0]; },
        description: 'Sudadera oversized azul marino con capucha y detalles Saints en pedrería para un acabado llamativo. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 38,
        title: 'About Fray Stacked Skinny Flare Jeans - Deslavado Claro',
        category: 'jeans-pants',
        price: 199.90,
        sizes: ['38'],
        images: productImages('about-fray-stacked-skinny-flare-jeans-light-wash', 4),
        get image() { return this.images[0]; },
        description: 'Jean de lavado claro con corte skinny apilado, pierna acampanada y detalles deshilachados About Fray. Disponible en talla 38.',
        badge: 'TALLA 38'
    },
    {
        id: 39,
        title: 'Stacked Skinny Flare Frayed Along Panel Jean - Deslavado Azul Medio',
        category: 'jeans-pants',
        price: 159.90,
        sizes: ['36'],
        images: productImages('stacked-skinny-flare-frayed-along-panel-jean', 4),
        get image() { return this.images[0]; },
        description: 'Jean azul medio con corte skinny apilado, pierna acampanada y paneles laterales deshilachados. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 40,
        title: 'Straight Flare Static Drip Jeweled Jean - Deslavado Negro',
        category: 'jeans-pants',
        price: 159.90,
        sizes: ['36'],
        images: productImages('straight-flare-static-drip-jeweled-jean', 4),
        get image() { return this.images[0]; },
        description: 'Jean negro deslavado de corte recto acampanado con detalles Static Drip en pedrería. Disponible en talla 36.',
        badge: 'TALLA 36'
    },
    {
        id: 41,
        title: 'Padded Hooded Faux Trim Iced Out Parka - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        stock: 3,
        images: productImages('padded-hooded-faux-trim-iced-out-parka', 4),
        get image() { return this.images[0]; },
        description: 'Parka negra acolchada con capucha, borde de piel sintética y detalles Iced Out. Disponible en talla M; quedan 3 unidades.',
        badge: 'ÚLTIMAS 3 UNIDADES'
    },
    {
        id: 42,
        title: 'Cowboys Monster Oversized Zip Up Hoodie - Azul Marino',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        stock: 2,
        images: productImages('cowboys-monster-oversized-zip-up-hoodie', 4),
        get image() { return this.images[0]; },
        description: 'Sudadera oversized azul marino con cierre completo, capucha y gráficos Cowboys Monster. Disponible en talla M; quedan 2 unidades.',
        badge: 'ÚLTIMAS 2 UNIDADES'
    },
    {
        id: 43,
        title: 'Heartbreakers Players Club Skinny Flare Sweatpants - Negro',
        category: 'jeans-pants',
        price: 109.90,
        sizes: ['L'],
        stock: 2,
        fitRecommendation: false,
        images: productImages('heartbreakers-players-club-skinny-flare-sweatpants-black', 4),
        get image() { return this.images[0]; },
        description: 'Jogger negro de corte skinny acampanado con gráficos Heartbreakers Players Club. Disponible en talla L; quedan 2 unidades.',
        badge: 'ÚLTIMAS 2 UNIDADES'
    },
    {
        id: 44,
        title: 'Unknown Fate Flared Sweatpants - Negro',
        category: 'jeans-pants',
        price: 109.90,
        sizes: ['M'],
        fitRecommendation: false,
        images: productImages('unknown-fate-flared-sweatpants-black', 4),
        get image() { return this.images[0]; },
        description: 'Jogger negro Unknown Fate con pierna acampanada y fit relajado para un look urbano cómodo. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 45,
        title: 'All Around Fray Stacked Skinny Flare Pants - Café Combinado',
        category: 'jeans-pants',
        price: 159.90,
        sizes: ['38'],
        fitRecommendation: false,
        images: productImages('all-around-fray-stacked-skinny-flare-pants-brown-combo', 4),
        get image() { return this.images[0]; },
        description: 'Pantalón café combinado con corte skinny apilado, pierna acampanada y detalles deshilachados. Disponible en talla 38.',
        badge: 'TALLA 38'
    },
    {
        id: 46,
        title: 'Bold Flock Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('bold-flock-hoodie-black', 4),
        get image() { return this.images[0]; },
        description: 'Sudadera negra con capucha y gráfico Bold Flock de textura elevada para un acabado urbano. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 47,
        title: 'Look At Me Stacked Skinny Jeans - Deslavado Azul Vintage',
        category: 'jeans-pants',
        price: 169.90,
        sizes: ['38'],
        images: productImages('look-at-me-stacked-skinny-jeans-vintage-blue-wash', 4),
        get image() { return this.images[0]; },
        description: 'Jean azul vintage de corte skinny apilado con detalles Look At Me y una silueta alargada. Disponible en talla 38.',
        badge: 'TALLA 38'
    },
    {
        id: 48,
        title: 'Lakers Wavey Oversized Zip Hoodie - Morado',
        category: 'conjuntos',
        price: 119.90,
        sizes: ['M'],
        images: productImages('lakers-wavey-oversized-zip-hoodie-purple', 4),
        get image() { return this.images[0]; },
        description: 'Sudadera morada oversized con cierre completo, capucha y gráficos Lakers Wavey. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 49,
        title: 'Lakers Wavey Wide Sweatpants - Morado',
        category: 'conjuntos',
        price: 119.90,
        sizes: ['L'],
        fitRecommendation: false,
        images: productImages('lakers-wavey-wide-sweatpants-purple', 4),
        get image() { return this.images[0]; },
        description: 'Jogger morado de pierna ancha con gráficos Lakers Wavey y fit relajado. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 50,
        title: 'Tumble Slim Flare Jeans - Deslavado Azul Claro',
        category: 'jeans-pants',
        price: 159.90,
        sizes: ['34'],
        images: productImages('tumble-slim-flare-jeans-light-blue-wash', 4),
        get image() { return this.images[0]; },
        description: 'Jean azul claro con corte slim y pierna acampanada para una silueta limpia y moderna. Disponible en talla 34.',
        badge: 'TALLA 34'
    },
    {
        id: 51,
        title: 'Contrast Skinny Stacked Flared Cargo Pants - Camuflaje',
        category: 'jeans-pants',
        price: 169.90,
        sizes: ['38'],
        fitRecommendation: false,
        images: productImages('contrast-skinny-stacked-flared-cargo-pants-camouflage', 4),
        get image() { return this.images[0]; },
        description: 'Pantalón cargo camuflado con corte skinny apilado, pierna acampanada y paneles en contraste. Disponible en talla 38.',
        badge: 'TALLA 38'
    },
    {
        id: 52,
        title: 'Textured Cable Knit Cabin Puffer Jacket - Amarillo',
        category: 'hoodies-jackets',
        price: 109.90,
        sizes: ['M'],
        images: productImages('textured-cable-knit-cabin-puffer-jacket-yellow', 4),
        get image() { return this.images[0]; },
        description: 'Chaqueta puffer amarilla con textura de tejido trenzado y volumen acolchado para destacar en climas fríos. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 53,
        title: 'In The Cut Camo Sweatpants - Gris Combinado',
        category: 'conjuntos',
        price: 125.00,
        stock: 1,
        sizes: ['L'],
        fitRecommendation: false,
        images: productImages('in-the-cut-camo-sweatpants-grey-combo', 4),
        get image() { return this.images[0]; },
        description: 'Pantalón deportivo camuflado en gris combinado, de pierna amplia y fit relajado. Combínalo con el hoodie In The Cut para completar el conjunto. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 54,
        title: 'In The Cut Camo Zip Up Hoodie - Gris Combinado',
        category: 'conjuntos',
        price: 125.00,
        stock: 1,
        sizes: ['L'],
        images: productImages('in-the-cut-camo-zip-up-hoodie-grey-combo', 4),
        get image() { return this.images[0]; },
        description: 'Hoodie camuflado gris con cierre completo, capucha y fit relajado. Combínalo con el sweatpant In The Cut para completar el conjunto. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 55,
        title: 'Tyson Die Rich Quarter Zip Sweatshirt - Negro Deslavado',
        category: 'hoodies-jackets',
        price: 109.90,
        stock: 1,
        sizes: ['L'],
        images: productImages('tyson-die-rich-quarter-zip-sweatshirt-black-wash', 4),
        get image() { return this.images[0]; },
        description: 'Sudadera Tyson en negro deslavado con cuello alto, cierre de un cuarto y gráficos Born Broke Die Rich. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 56,
        title: 'Antisocial Rhinestone Pearl Oversized Hoodie - Azul Marino',
        category: 'hoodies-jackets',
        price: 109.90,
        stock: 1,
        sizes: ['M'],
        images: productImages('antisocial-rhinestone-pearl-oversized-hoodie-navy', 4),
        get image() { return this.images[0]; },
        description: 'Hoodie oversized azul marino con lettering brillante, aplicaciones de rhinestones y perlas para un acabado premium. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 57,
        title: 'Cropped Utility Corduroy Collar Work Jacket - Oliva',
        category: 'hoodies-jackets',
        price: 119.90,
        stock: 1,
        sizes: ['M'],
        images: productImages('cropped-utility-corduroy-collar-work-jacket-olive', 4),
        get image() { return this.images[0]; },
        description: 'Chaqueta utility color oliva con corte cropped, bolsillos frontales y cuello de pana en contraste. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 58,
        title: "Relaxed '96 Pebble Leather Varsity Jacket - Azul Marino",
        category: 'hoodies-jackets',
        price: 119.90,
        stock: 1,
        sizes: ['L'],
        images: productImages('relaxed-96-faux-pebble-leather-varsity-jacket-navy', 4),
        get image() { return this.images[0]; },
        description: 'Chaqueta varsity azul marino en cuero sintético texturizado, con aplicaciones estilo 96 y silueta relajada. Disponible en talla L.',
        badge: 'TALLA L'
    },
    {
        id: 59,
        title: 'Rosa Parks Nah Embroidered Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        stock: 4,
        sizes: ['M', 'L'],
        images: productImages('rosa-parks-nah-embroidered-hoodie-black', 4),
        get image() { return this.images[0]; },
        description: 'Hoodie negro con gráfico y bordado Rosa Parks 1955, capucha amplia y fit urbano. Stock: 1 unidad talla M y 3 unidades talla L.',
        badge: 'TALLAS M Y L'
    },
    {
        id: 60,
        title: 'Heartbreakers Players Club Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 109.90,
        stock: 2,
        sizes: ['M', 'L'],
        images: productImages('heartbreakers-players-club-hoodie-black', 4),
        get image() { return this.images[0]; },
        description: 'Hoodie negro Heartbreakers Players Club con gráfico de corazón roto y acabado streetwear. Stock: 1 unidad talla M y 1 unidad talla L.',
        badge: 'TALLAS M Y L'
    },
    {
        id: 61,
        title: 'NYC All Star Hoodie - Celeste',
        category: 'hoodies-jackets',
        price: 109.90,
        stock: 1,
        sizes: ['M'],
        images: productImages('nyc-all-star-hoodie-powder-blue', 4),
        get image() { return this.images[0]; },
        description: 'Hoodie celeste NYC All Star Champions con efecto lavado, gráfico tonal y silueta relajada. Disponible en talla M.',
        badge: 'TALLA M'
    },
    {
        id: 62,
        title: 'Skeleton Stars Embroidered Oversized Hoodie - Negro',
        category: 'hoodies-jackets',
        price: 119.90,
        stock: 2,
        sizes: ['M', 'L'],
        images: productImages('skeleton-stars-embroidered-oversized-hoodie-black', 4),
        get image() { return this.images[0]; },
        description: 'Hoodie oversized negro con bordados Skeleton Stars y detalles de estrellas para un look oscuro y premium. Stock: 1 unidad talla M y 1 unidad talla L.',
        badge: 'TALLAS M Y L'
    },
    {
        id: 63,
        title: 'Cropped Paisley Jacquard Denim Work Jacket - Azul Oscuro',
        category: 'hoodies-jackets',
        price: 119.90,
        stock: 1,
        sizes: ['M'],
        images: productImages('cropped-paisley-jacquard-denim-work-jacket-dark-wash', 4),
        get image() { return this.images[0]; },
        description: 'Chaqueta de denim azul oscuro con jacquard paisley, cierre frontal y corte work jacket cropped. Disponible en talla M.',
        badge: 'TALLA M'
    }
];

let PRODUCTS = [];


// 2. ESTADO DE LA APLICACIÓN
let cart = [];
let productModalReturnUrl = null;
const CART_STORAGE_KEY = 'lynx_cart_v2';
let selectedCategory = 'all';
let searchQuery = '';
let catalogSort = 'featured';
let catalogInStockOnly = false;
const CATALOG_PAGE_SIZE = 24;
const HOME_PRODUCTS_PER_CATEGORY = 6;
let catalogVisibleLimit = CATALOG_PAGE_SIZE;
let catalogExpanded = false;
let currentProduct = null; // Para ver detalles
let catalogScrollFrame = null;
let customerUser = null;
let customerProfile = null;
let pendingCustomerAction = null;
let pendingVerificationEmail = '';
const customerSupabase = window.getLynxSupabase?.() || null;
const DISCOUNT_POPUP_SESSION_KEY = 'lynx_discount_popup_seen_v1';
const DISCOUNT_EMAIL_SENT_KEY = 'lynx_discount_email_requested_v1';

// 3. SELECCIÓN DE ELEMENTOS DEL DOM
const productsGrid = document.getElementById('products-grid-container');
const cartBadge = document.getElementById('cart-badge');
const cartDrawer = document.getElementById('cart-drawer');
const checkoutDrawer = document.getElementById('checkout-drawer');
const productModal = document.getElementById('product-modal');

// Botones de Abrir/Cerrar
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const emptyCartExploreBtn = document.getElementById('empty-cart-explore-btn');
const closeProductModal = document.getElementById('close-product-modal');
const goToCheckoutBtn = document.getElementById('go-to-checkout-btn');
const backToCartBtn = document.getElementById('back-to-cart-btn');
const closeCheckoutBtn = document.getElementById('close-checkout-btn');

// Búsqueda y Filtros
const searchInput = document.getElementById('search-input');
const categoryTags = document.querySelectorAll('#category-tags-container .tag-btn');
const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const headerSearchBtn = document.getElementById('header-search-btn');
const accountBtn = document.getElementById('account-btn');
const accountBtnLabel = document.getElementById('account-btn-label');
const mobileAccountBtn = document.getElementById('mobile-account-btn');
const mobileAccountBtnLabel = document.getElementById('mobile-account-btn-label');
const accountDialog = document.getElementById('account-dialog');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const catalogCountText = document.getElementById('catalog-count-text');
const catalogLoadMore = document.getElementById('catalog-load-more');
const catalogSortSelect = document.getElementById('catalog-sort');
const catalogInStockToggle = document.getElementById('catalog-in-stock');
const trendingTrack = document.getElementById('trending-track');
const trendingViewport = document.getElementById('trending-viewport');
const trendingPrevBtn = document.getElementById('trending-prev');
const trendingNextBtn = document.getElementById('trending-next');
const builderTopOptions = document.getElementById('builder-top-options');
const builderOuterOptions = document.getElementById('builder-outer-options');
const builderBottomOptions = document.getElementById('builder-bottom-options');
const builderLayerTop = document.getElementById('builder-layer-top');
const builderLayerOuter = document.getElementById('builder-layer-outer');
const builderLayerBottom = document.getElementById('builder-layer-bottom');
const builderComposite = document.getElementById('builder-composite');
const builderMannequin = document.querySelector('.builder-mannequin');
const builderUnderwear = document.getElementById('builder-layer-underwear');
const builderTotal = document.getElementById('builder-total');
const builderBuyBtn = document.getElementById('builder-buy-btn');
// Selección del drop más reciente. El orden mezcla categorías para que el
// carrusel se sienta curado y no como una repetición del catálogo.
const TRENDING_PRODUCT_IDS = [93, 90, 73, 89, 92, 64, 97, 94, 80];
const CATALOG_CATEGORY_ORDER = ['hoodies-jackets', 't-shirts', 'jeans-pants', 'conjuntos'];
const CATALOG_CATEGORY_META = {
    'hoodies-jackets': { label: 'HOODIES & JACKETS', moreLabel: 'HOODIES', navId: 'nav-hoodies' },
    't-shirts': { label: 'T-SHIRTS', navId: 'nav-tshirts' },
    'jeans-pants': { label: 'JEANS & PANTS', moreLabel: 'JEANS', navId: 'nav-jeans' },
    'conjuntos': { label: 'CONJUNTOS', moreLabel: 'CONJUNTOS', navId: 'nav-conjuntos' }
};

// Formulario de Checkout e Información de Pago
const checkoutForm = document.getElementById('checkout-form');
const shippingRadios = document.getElementsByName('shipping-method');
const limaPaymentConditionBox = document.getElementById('lima-payment-condition-box');
const limaReserveCheckbox = document.getElementById('lima-reserve-checkbox');
const dynamicPaymentInfo = document.getElementById('dynamic-payment-info');
const paymentExplanationText = document.getElementById('payment-explanation-text');
const submitOrderBtn = document.getElementById('submit-order-btn');

// Desglose de Totales
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutShipping = document.getElementById('checkout-shipping');
const checkoutTotal = document.getElementById('checkout-total');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartItemsContainer = document.getElementById('cart-items-container');

// Modal de Detalles
const modalProductImg = document.getElementById('modal-product-img');
const modalProductBadge = document.getElementById('modal-product-badge');
const modalProductTitle = document.getElementById('modal-product-title');
const modalProductPrice = document.getElementById('modal-product-price');
const modalProductDesc = document.getElementById('modal-product-desc');
const modalFitRecommendation = document.getElementById('modal-fit-recommendation');
const modalSizeContainer = document.getElementById('modal-size-container');
const modalQtyInput = document.getElementById('modal-qty-input');
const modalQtyMinus = document.getElementById('modal-qty-minus');
const modalQtyPlus = document.getElementById('modal-qty-plus');
const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
const reviewsList = document.getElementById('reviews-list');
const reviewForm = document.getElementById('review-form');
const reviewGuestView = document.getElementById('review-guest-view');
const reviewMessage = document.getElementById('review-message');
const reviewImagesInput = document.getElementById('review-images');
const reviewImagesNote = document.getElementById('review-images-note');
const reviewImageModal = document.getElementById('review-image-modal');
const reviewImageGallery = document.getElementById('review-image-gallery');
const publishedReviewImages = new Map();

function escapeHtml(value = '') {
    return String(value).replace(/[&<>'"]/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[character]);
}

function customerErrorMessage(error) {
    const message = String(error?.message || error || 'No se pudo completar la operación.');
    if (/Invalid login credentials/i.test(message)) return 'Correo o contraseña incorrectos.';
    if (/Email not confirmed/i.test(message)) return 'Primero confirma tu correo desde el mensaje que te enviamos.';
    if (/User already registered/i.test(message)) return 'Este correo ya tiene una cuenta. Inicia sesión.';
    if (/Password should be/i.test(message)) return 'La contraseña debe tener al menos 8 caracteres.';
    if (/rate limit/i.test(message)) return 'Se enviaron demasiados intentos. Espera unos minutos y vuelve a probar.';
    return message;
}

function setAccountMessage(elementId, message = '', success = false) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = message;
    element.classList.toggle('success', success);
}

function setCustomerButtonLoading(button, loading, label = 'Procesando...') {
    if (!button) return;
    if (loading) {
        button.dataset.originalText = button.textContent;
        button.disabled = true;
        button.textContent = label;
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

function updateAccountButton() {
    const isVerified = Boolean(customerUser?.email_confirmed_at);
    accountBtn?.classList.toggle('is-authenticated', isVerified);
    accountBtn?.setAttribute('aria-label', isVerified ? 'Abrir mi cuenta LYNX' : 'Ingresar a mi cuenta LYNX');
    if (accountBtnLabel) accountBtnLabel.textContent = isVerified ? 'Mi cuenta' : 'Ingresar';
    if (mobileAccountBtnLabel) mobileAccountBtnLabel.textContent = isVerified ? 'Mi cuenta LYNX' : 'Ingresar a mi cuenta';
}

async function loadCustomerProfile() {
    if (!customerSupabase || !customerUser) {
        customerProfile = null;
        updateAccountButton();
        return null;
    }
    const { data, error } = await customerSupabase.from('customer_profiles').select('*').eq('user_id', customerUser.id).maybeSingle();
    if (error) throw error;
    customerProfile = data || null;
    updateAccountButton();
    prefillCheckoutFromProfile();
    return customerProfile;
}

function prefillCheckoutFromProfile() {
    if (!customerProfile) return;
    const nameInput = document.getElementById('checkout-name');
    const phoneInput = document.getElementById('checkout-phone');
    if (nameInput && !nameInput.value) nameInput.value = customerProfile.full_name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = customerProfile.phone || '';
}

function showDiscountForm() {
    document.getElementById('discount-form-view').hidden = false;
    document.getElementById('discount-sent-view').hidden = true;
    setAccountMessage('customer-email-message');
}

function showDiscountSent(email, verified = false) {
    document.getElementById('discount-form-view').hidden = true;
    document.getElementById('discount-sent-view').hidden = false;
    const message = document.getElementById('discount-sent-message');
    message.textContent = verified
        ? `Correo verificado. Estamos enviando tu código privado del 10% a ${email}. No se mostrará en esta página.`
        : `Enviamos un código a ${email}. Escríbelo abajo; al verificarlo recibirás allí tu descuento privado del 10%.`;
    const otpForm = document.getElementById('discount-otp-form');
    if (otpForm) otpForm.hidden = verified;
}

function openAccountDialog(_mode = 'discount', message = '') {
    if (customerUser?.email_confirmed_at) showDiscountSent(customerUser.email, true);
    else showDiscountForm();
    if (message && !customerUser?.email_confirmed_at) setAccountMessage('customer-email-message', message);
    if (!accountDialog.open) accountDialog.showModal();
    lucide.createIcons();
}

function closeAccountDialog() {
    sessionStorage.setItem(DISCOUNT_POPUP_SESSION_KEY, '1');
    if (accountDialog?.open) accountDialog.close();
}

async function requireCustomerAccount() {
    // Buying no longer requires a customer account. Delivery details are only
    // requested at checkout.
    return true;
}

async function requestWelcomeDiscountEmail() {
    if (!customerSupabase || !customerUser?.email_confirmed_at) return;
    const requestedFor = localStorage.getItem(DISCOUNT_EMAIL_SENT_KEY);
    if (requestedFor === customerUser.email) return;
    const { error } = await customerSupabase.functions.invoke('send-welcome-discount');
    if (error) {
        console.warn('El correo de descuento todavía no pudo enviarse.', error.message);
        return;
    }
    localStorage.setItem(DISCOUNT_EMAIL_SENT_KEY, customerUser.email);
}

function openCheckoutDrawer() {
    cartDrawer.classList.remove('active');
    checkoutDrawer.classList.add('active');
    prefillCheckoutFromProfile();
    updateCheckoutTotals();
}

async function initializeCustomerAccount() {
    if (!customerSupabase) return;
    const { data: { session } } = await customerSupabase.auth.getSession();
    customerUser = session?.user || null;
    if (customerUser) {
        try { await loadCustomerProfile(); } catch (error) { console.warn('No se pudo cargar el perfil del cliente.', error.message); }
    }
    updateAccountButton();
    syncReviewAccess();
    if (customerUser?.email_confirmed_at) {
        await requestWelcomeDiscountEmail();
        if (location.hash.includes('access_token') || location.search.includes('code=')) {
            showDiscountSent(customerUser.email, true);
            if (!accountDialog.open) accountDialog.showModal();
        }
    } else if (!sessionStorage.getItem(DISCOUNT_POPUP_SESSION_KEY)) {
        window.setTimeout(() => openAccountDialog(), 1800);
    }
    customerSupabase.auth.onAuthStateChange((event, nextSession) => {
        window.setTimeout(async () => {
            customerUser = nextSession?.user || null;
            customerProfile = null;
            if (customerUser) {
                try { await loadCustomerProfile(); } catch (error) { console.warn(error.message); }
            } else {
                updateAccountButton();
            }
            syncReviewAccess();
            if (customerUser?.email_confirmed_at && event === 'SIGNED_IN') {
                await requestWelcomeDiscountEmail();
                showDiscountSent(customerUser.email, true);
                if (!accountDialog.open) accountDialog.showModal();
            }
        }, 0);
    });
}

function setupStoreMotion() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = document.getElementById('page-scroll-progress');
    const updateProgress = () => {
        if (!progress) return;
        const available = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        progress.style.transform = `scaleX(${Math.min(1, scrollY / available)})`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    if (reducedMotion) return;
    const revealTargets = document.querySelectorAll([
        '.trending-section', '.outfit-builder-section', '.catalog-header',
        '.catalog-category-heading', '.product-card', '.catalog-category-more',
        '.tiktok-showcase-heading', '.tiktok-video-card', '.reviews-section',
        '.app-footer .footer-container'
    ].join(','));
    revealTargets.forEach((element, index) => {
        element.classList.add('motion-reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
    });
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    revealTargets.forEach(element => revealObserver.observe(element));

    const glow = document.querySelector('.page-pointer-glow');
    if (glow && matchMedia('(hover:hover) and (pointer:fine)').matches) {
        window.addEventListener('pointermove', event => {
            glow.style.transform = `translate3d(${event.clientX - 190}px, ${event.clientY - 190}px, 0)`;
        }, { passive: true });
    }

    document.querySelectorAll('.product-card, .trending-card').forEach(card => {
        card.addEventListener('pointermove', event => {
            if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            card.style.setProperty('--tilt-x', `${-y * 2.2}deg`);
            card.style.setProperty('--tilt-y', `${x * 2.2}deg`);
        });
        card.addEventListener('pointerleave', () => {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
        });
    });
}

function setReviewMessage(message = '', success = false) {
    if (!reviewMessage) return;
    reviewMessage.textContent = message;
    reviewMessage.classList.toggle('success', success);
}

function reviewStars(rating) {
    const normalized = Math.max(1, Math.min(5, Number(rating) || 0));
    return `${'★'.repeat(normalized)}${'☆'.repeat(5 - normalized)}`;
}

function setReviewImagesNote(message = 'JPG, PNG o WebP · hasta 5 MB por foto.', isError = false) {
    if (!reviewImagesNote) return;
    reviewImagesNote.textContent = message;
    reviewImagesNote.classList.toggle('is-error', isError);
}

function selectedReviewImages() {
    return Array.from(reviewImagesInput?.files || []);
}

function validateReviewImages(files) {
    if (files.length > 3) return 'Puedes adjuntar un máximo de 3 fotos.';
    const invalid = files.find(file => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024);
    return invalid ? 'Cada foto debe ser JPG, PNG o WebP y pesar hasta 5 MB.' : '';
}

async function uploadReviewImages(files) {
    if (!files.length) return [];
    const uploadedPaths = [];
    const extensions = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
    try {
        for (const [index, file] of files.entries()) {
            const token = window.crypto?.randomUUID?.() || `${Date.now()}-${index}`;
            const path = `${customerUser.id}/${token}.${extensions[file.type]}`;
            const { error } = await customerSupabase.storage.from('review-images').upload(path, file, {
                cacheControl: '31536000',
                contentType: file.type,
                upsert: false
            });
            if (error) throw error;
            uploadedPaths.push(path);
        }
        return uploadedPaths;
    } catch (error) {
        if (uploadedPaths.length) await customerSupabase.storage.from('review-images').remove(uploadedPaths);
        throw error;
    }
}

async function signedReviewImageUrls(paths) {
    const validPaths = Array.isArray(paths) ? paths.filter(Boolean).slice(0, 3) : [];
    if (!validPaths.length || !customerSupabase) return [];
    const { data, error } = await customerSupabase.storage.from('review-images').createSignedUrls(validPaths, 60 * 60);
    if (error) {
        console.warn('No se pudieron cargar las fotos de una reseña.', error.message);
        return [];
    }
    return (data || []).map(file => file.signedUrl).filter(Boolean);
}

function openReviewImages(reviewId) {
    const imageUrls = publishedReviewImages.get(String(reviewId)) || [];
    if (!reviewImageModal || !reviewImageGallery || !imageUrls.length) return;
    reviewImageGallery.innerHTML = imageUrls.map((url, index) => `<img src="${escapeHtml(url)}" alt="Foto ${index + 1} de la reseña" loading="eager">`).join('');
    reviewImageModal.hidden = false;
    document.body.classList.add('review-image-open');
}

function closeReviewImages() {
    if (!reviewImageModal) return;
    reviewImageModal.hidden = true;
    document.body.classList.remove('review-image-open');
}

function syncReviewAccess() {
    if (!reviewForm || !reviewGuestView) return;
    const canReview = Boolean(customerUser && customerProfile?.email_verified);
    reviewForm.hidden = !canReview;
    reviewGuestView.hidden = canReview;
    if (canReview) setReviewMessage('');
}

async function loadPublishedReviews() {
    if (!reviewsList) return;
    if (!customerSupabase) {
        reviewsList.innerHTML = '<p class="reviews-empty">Las reseñas estarán disponibles pronto.</p>';
        return;
    }
    const { data, error } = await customerSupabase
        .from('customer_reviews')
        .select('id, author_name, rating, comment, images, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(6);

    if (error) {
        console.warn('No se pudieron cargar las reseñas.', error.message);
        reviewsList.innerHTML = '<p class="reviews-empty">Aún no hay reseñas públicas. Sé el primero en compartir tu experiencia.</p>';
        return;
    }

    const reviewsWithImages = await Promise.all((data || []).map(async review => ({
        ...review,
        imageUrls: await signedReviewImageUrls(review.images)
    })));
    publishedReviewImages.clear();
    reviewsWithImages.forEach(review => publishedReviewImages.set(String(review.id), review.imageUrls));

    reviewsList.innerHTML = reviewsWithImages.length ? reviewsWithImages.map(review => `
        <article class="review-card">
            <div class="review-card-header">
                <div><strong class="review-author">${escapeHtml(review.author_name)}</strong><span class="review-date"> · ${new Intl.DateTimeFormat('es-PE', { month: 'short', year: 'numeric' }).format(new Date(review.created_at))}</span></div>
                <span class="review-stars-display" aria-label="${review.rating} de 5 estrellas">${reviewStars(review.rating)}</span>
            </div>
            <p>${escapeHtml(review.comment)}</p>
            ${review.imageUrls.length ? `<button class="review-photo-btn" type="button" data-review-id="${review.id}"><i data-lucide="images"></i> VER ${review.imageUrls.length === 1 ? 'FOTO' : `${review.imageUrls.length} FOTOS`}</button>` : ''}
        </article>
    `).join('') : '<p class="reviews-empty">Aún no hay reseñas públicas. Sé el primero en compartir tu experiencia.</p>';
    lucide.createIcons();
}

function setupReviewEvents() {
    document.getElementById('review-login-btn')?.addEventListener('click', () => {
        window.location.href = '/cuenta?return=%2F%23reviews';
    });

    reviewImagesInput?.addEventListener('change', () => {
        const files = selectedReviewImages();
        const error = validateReviewImages(files);
        setReviewImagesNote(error || (files.length ? `${files.length} ${files.length === 1 ? 'foto seleccionada' : 'fotos seleccionadas'}.` : undefined), Boolean(error));
        if (error) reviewImagesInput.value = '';
    });

    reviewsList?.addEventListener('click', event => {
        const button = event.target.closest('.review-photo-btn');
        if (button) openReviewImages(button.dataset.reviewId);
    });

    reviewImageModal?.addEventListener('click', event => {
        if (event.target.closest('[data-review-image-close]')) closeReviewImages();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !reviewImageModal?.hidden) closeReviewImages();
    });

    reviewForm?.addEventListener('submit', async event => {
        event.preventDefault();
        if (!customerUser || !customerProfile?.email_verified) {
            syncReviewAccess();
            alert('Las reseñas verificadas estarán disponibles nuevamente muy pronto.');
            return;
        }

        const button = event.submitter;
        const rating = Number(reviewForm.querySelector('input[name="review-rating"]:checked')?.value);
        const comment = document.getElementById('review-comment').value.trim();
        const images = selectedReviewImages();
        if (!rating || comment.length < 10) {
            setReviewMessage('Escribe una reseña de al menos 10 caracteres.');
            return;
        }
        const imageError = validateReviewImages(images);
        if (imageError) {
            setReviewImagesNote(imageError, true);
            return;
        }

        setCustomerButtonLoading(button, true, 'ENVIANDO...');
        setReviewMessage('');
        let uploadedPaths = [];
        try {
            uploadedPaths = await uploadReviewImages(images);
            const { error } = await customerSupabase.rpc('submit_customer_review', {
                p_rating: rating,
                p_comment: comment,
                p_images: uploadedPaths
            });
            if (error) throw error;
            reviewForm.reset();
            setReviewImagesNote();
            setReviewMessage('Gracias. Tu reseña fue enviada y aparecerá cuando sea aprobada.', true);
        } catch (error) {
            if (uploadedPaths.length) await customerSupabase.storage.from('review-images').remove(uploadedPaths);
            setReviewMessage(customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
            lucide.createIcons();
        }
    });
}

// 4. LÓGICA DE INICIALIZACIÓN
function mapDatabaseProduct(row) {
    const sourceImages = LOCAL_PRODUCT_IMAGE_OVERRIDES[row.slug]
        || (Array.isArray(row.images) ? row.images : []);
    const images = sourceImages.filter(Boolean).map(optimizedStoreImage);
    const statusBadge = {
        preorder: 'PREVENTA',
        sold_out: 'AGOTADO',
        low_stock: 'ÚLTIMAS UNIDADES'
    }[row.status];

    return {
        id: row.legacy_id ?? (1000000 + Number(row.id)),
        databaseId: row.id,
        slug: row.slug || '',
        title: row.title,
        category: row.category,
        price: Number(row.price),
        stock: Number(row.stock || 0),
        sizes: row.sizes || [],
        images,
        image: images[0] || 'assets/logo-transparent.png',
        description: row.description || '',
        badge: statusBadge || row.badge || 'NUEVO',
        status: row.status || 'available',
        fitRecommendation: row.fit_recommendation !== false,
        color: row.color || '',
        material: row.material || '',
        fitType: row.fit_type || '',
        careInstructions: row.care_instructions || '',
        weightGrams: row.weight_grams ?? null,
        measurements: row.measurements || {}
    };
}

function prepareProducts(products) {
    return products.map(product => {
        const images = Array.isArray(product.images)
            ? product.images.filter(Boolean).map(optimizedStoreImage)
            : [];
        return {
            ...product,
            images,
            image: images[0] || 'assets/logo-transparent.png'
        };
    });
}

function persistCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.map(item => ({
            productId: item.product.id,
            size: item.size,
            qty: item.qty
        }))));
    } catch (error) {
        console.warn('No se pudo guardar el carrito.', error);
    }
}

function restoreCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
        if (!Array.isArray(saved)) return;
        cart = saved.map(item => {
            const product = PRODUCTS.find(candidate => String(candidate.id) === String(item.productId));
            if (!product || product.status === 'sold_out') return null;
            const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['ÚNICA'];
            const size = sizes.includes(item.size) ? item.size : sizes[0];
            const stock = Number(product.stock);
            const max = Number.isFinite(stock) && stock > 0 ? stock : Number.MAX_SAFE_INTEGER;
            const qty = Math.max(1, Math.min(Number(item.qty) || 1, max));
            return { product, size, qty };
        }).filter(Boolean);
    } catch (error) {
        cart = [];
        localStorage.removeItem(CART_STORAGE_KEY);
    }
}

async function loadDatabaseCatalog() {
    const client = window.getLynxSupabase?.();
    if (!client) return null;

    const baseFields = 'id,legacy_id,title,slug,category,price,stock,sizes,images,description,badge,status,fit_recommendation,sort_order';
    const extendedFields = `${baseFields},color,material,fit_type,care_instructions,weight_grams,measurements`;
    const queryCatalog = fields => client
        .from('products')
        .select(fields)
        .neq('status', 'archived')
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true });
    let { data, error } = await queryCatalog(extendedFields);

    // Mantiene la tienda operativa mientras se ejecuta la migración de las
    // nuevas especificaciones de producto en Supabase.
    if (error && /column|schema cache|color|material|measurements/i.test(error.message || '')) {
        ({ data, error } = await queryCatalog(baseFields));
    }

    if (error) {
        console.warn('No se pudo cargar el catálogo conectado. Se usará el catálogo local.', error.message);
        return null;
    }
    return (data || []).map(mapDatabaseProduct);
}

document.addEventListener('DOMContentLoaded', async () => {
    // En la portada compacta, el aviso de stock va debajo del banner visual.
    const hero = document.getElementById('home-hero');
    const stockMarquee = document.querySelector('.stock-marquee');
    if (window.matchMedia('(max-width: 768px)').matches && hero && stockMarquee) {
        hero.insertAdjacentElement('afterend', stockMarquee);
    }

    // Cargar productos: DEFAULT_PRODUCTS como base, más los agregados desde admin
    const startupAdminProducts = localStorage.getItem('lynx_admin_products');
    if (startupAdminProducts) {
        const startupParsed = JSON.parse(startupAdminProducts);
        const startupIds = startupParsed.map(product => product.id);
        const startupDefaults = DEFAULT_PRODUCTS.filter(product => !startupIds.includes(product.id));
        PRODUCTS = prepareProducts([...startupDefaults, ...startupParsed]);
    } else {
        PRODUCTS = prepareProducts(DEFAULT_PRODUCTS);
    }
    restoreCart();
    renderProducts();
    renderTrendingProducts();
    renderCart();

    // Los antiguos resultados de Google usaban rutas /c/CODIGO.
    // Vercel los trae al catálogo mediante ?legacy=CODIGO para evitar un 404.
    const legacyProductCode = new URLSearchParams(window.location.search).get('legacy');
    if (legacyProductCode) {
        requestAnimationFrame(() => {
            document.getElementById('catalog')?.scrollIntoView({ block: 'start' });
            window.history.replaceState(null, '', `${window.location.pathname}#catalog`);
        });
    }
    lucide.createIcons();

    const databaseProducts = await loadDatabaseCatalog();
    if (databaseProducts?.length) {
        PRODUCTS = prepareProducts(databaseProducts);
    } else {
    const adminProducts = localStorage.getItem('lynx_admin_products');
    if (adminProducts) {
        const parsed = JSON.parse(adminProducts);
        // Mezclar: DEFAULT_PRODUCTS primero, luego los del admin que no estén duplicados
        const adminIds = parsed.map(p => p.id);
        const defaults = DEFAULT_PRODUCTS.filter(p => !adminIds.includes(p.id));
        PRODUCTS = prepareProducts([...defaults, ...parsed]);
    } else {
        PRODUCTS = prepareProducts(DEFAULT_PRODUCTS);
    }
    }
    // Limpiar el viejo formato por si acaso
    localStorage.removeItem('lynx_store_products');
    restoreCart();

    renderProducts();
    renderTrendingProducts();
    setupOutfitBuilder();
    setupEventListeners();
    await initializeCustomerAccount();
    setupReviewEvents();
    await loadPublishedReviews();
    syncReviewAccess();
    openProductFromUrl();
    setupTrendingCarousel();
    renderCart();
    setupStoreMotion();
    lucide.createIcons(); // Cargar íconos lucide
});

// 5. FUNCIONES DE RENDERIZACIÓN
function productUrl(product) {
    // Las fichas tienen una URL legible y estable; el nombre se genera solo
    // como respaldo para productos antiguos que aún no tienen slug guardado.
    const identifier = product.slug || product.title
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || product.databaseId || product.id;
    return `/producto/${encodeURIComponent(String(identifier))}`;
}

let modalMainImageRequestId = 0;

function highlightModalThumbnail(selectedThumb) {
    const thumbList = document.getElementById('modal-thumbs');
    thumbList?.querySelectorAll('.modal-thumb').forEach(thumb => {
        const isSelected = thumb === selectedThumb;
        thumb.style.border = `2px solid ${isSelected ? 'var(--accent)' : 'transparent'}`;
        thumb.style.opacity = isSelected ? '1' : '0.6';
    });
}

function setModalMainImage(source, selectedThumb = null) {
    if (!source) return;

    const requestId = ++modalMainImageRequestId;
    const requestedSource = String(source);
    modalProductImg.onload = null;
    modalProductImg.onerror = null;
    modalProductImg.classList.add('is-loading');

    if (selectedThumb) highlightModalThumbnail(selectedThumb);

    modalProductImg.onload = () => {
        if (requestId !== modalMainImageRequestId) return;
        modalProductImg.classList.remove('is-loading');
    };

    modalProductImg.onerror = () => {
        if (requestId !== modalMainImageRequestId) return;

        const failedPath = new URL(requestedSource, location.href).pathname.replace(/\\/g, '/');
        if (/\/mockups-finales\/.*\.webp$/i.test(failedPath)) {
            const pngSource = `${failedPath.replace(/\.webp$/i, '.png')}?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
            setModalMainImage(pngSource, selectedThumb);
            return;
        }

        const thumbList = document.getElementById('modal-thumbs');
        const replacement = [...(thumbList?.querySelectorAll('.modal-thumb') || [])]
            .find(thumb => thumb.complete && thumb.naturalWidth > 0 && thumb.src !== requestedSource);

        if (replacement) {
            setModalMainImage(replacement.src, replacement);
            return;
        }

        modalProductImg.onload = null;
        modalProductImg.onerror = null;
        modalProductImg.classList.remove('is-loading');
        modalProductImg.src = `/assets/logo-transparent.png?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
    };

    modalProductImg.src = requestedSource;
}

function imageFallback(image) {
    if (image.dataset.imageFallbackBound) return;
    image.dataset.imageFallbackBound = 'true';
    const isSecondary = image.classList.contains('product-card-secondary-img') || image.classList.contains('trending-secondary-img');
    const isModalThumb = image.classList.contains('modal-thumb');
    const card = image.closest('.product-card, .trending-card');
    const markSecondaryReady = () => {
        if (isSecondary && image.naturalWidth > 0) card?.classList.add('has-secondary-image');
    };
    image.addEventListener('load', markSecondaryReady, { once: true });
    if (image.complete) markSecondaryReady();
    const handleImageError = () => {
        const failedPath = new URL(image.currentSrc || image.src, location.href).pathname.replace(/\\/g, '/');
        const primary = image.closest('.product-card-img-wrapper, .trending-card-image')
            ?.querySelector('.product-card-primary-img, .trending-primary-img');
        if (isModalThumb) {
            const wasMainImage = new URL(modalProductImg.currentSrc || modalProductImg.src, location.href).pathname === failedPath;
            const thumbList = image.parentElement;
            image.remove();
            if (wasMainImage) {
                const replacement = thumbList?.querySelector('.modal-thumb');
                if (replacement) {
                    setModalMainImage(replacement.src, replacement);
                }
            }
            return;
        }
        if (isSecondary) {
            card?.classList.remove('has-secondary-image');
            image.remove();
            if (primary) primary.style.opacity = '1';
            return;
        }
        if (/\/mockups-finales\/.*\.webp$/i.test(failedPath) && image.dataset.pngFallbackTried !== 'true') {
            image.dataset.pngFallbackTried = 'true';
            image.src = `${failedPath.replace(/\.webp$/i, '.png')}?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
            return;
        }
        if (failedPath.endsWith('/assets/logo-transparent.png')) return;
        image.src = `/assets/logo-transparent.png?lynx_img=${PRODUCT_IMAGE_CACHE_VERSION}`;
    };
    image.addEventListener('error', handleImageError);
}

function renderProducts() {
    const supportsProductHover = window.innerWidth > 768 && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    // Filtrar productos
    let filtered = PRODUCTS.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !catalogInStockOnly || (product.status !== 'sold_out' && (product.status === 'preorder' || Number(product.stock || 0) > 0));
        return matchesCategory && matchesSearch && matchesStock;
    });

    filtered.sort((a, b) => {
        if (catalogSort === 'price-asc') return a.price - b.price;
        if (catalogSort === 'price-desc') return b.price - a.price;
        if (catalogSort === 'newest') return Number(b.databaseId || b.id) - Number(a.databaseId || a.id);
        const categoryDifference = CATALOG_CATEGORY_ORDER.indexOf(a.category) - CATALOG_CATEGORY_ORDER.indexOf(b.category);
        return categoryDifference || a.id - b.id;
    });

    const totalFiltered = filtered.length;
    const isCompactHomeCatalog = selectedCategory === 'all' && !searchQuery.trim() && !catalogExpanded;
    const visibleProducts = isCompactHomeCatalog
        ? CATALOG_CATEGORY_ORDER.flatMap(category =>
            filtered
                .filter(product => product.category === category)
                .sort((a, b) => Number(b.id) - Number(a.id))
                .slice(0, HOME_PRODUCTS_PER_CATEGORY)
        )
        : filtered.slice(0, catalogVisibleLimit);
    const categoryCounts = filtered.reduce((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
    }, {});
    const visibleCategoryCounts = visibleProducts.reduce((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
    }, {});

    // Actualizar texto de cantidad
    catalogCountText.textContent = isCompactHomeCatalog
        ? `Selección de ${visibleProducts.length} prendas · ${totalFiltered} disponibles`
        : totalFiltered === 1
            ? 'Mostrando 1 producto'
            : `Mostrando ${visibleProducts.length} de ${totalFiltered} productos`;

    catalogLoadMore.hidden = isCompactHomeCatalog || totalFiltered <= catalogVisibleLimit;
    catalogLoadMore.textContent = 'VER MÁS PRENDAS';

    if (filtered.length === 0) {
        const isEmptyTshirts = selectedCategory === 't-shirts';
        productsGrid.innerHTML = `
            <div class="no-products-state" style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-muted);">
                <i data-lucide="${isEmptyTshirts ? 'sparkles' : 'frown'}" style="width: 48px; height: 48px; margin-bottom: 16px; color: var(--accent);"></i>
                <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">${isEmptyTshirts ? 'PRÓXIMAMENTE' : 'No encontramos prendas'}</p>
                <p>${isEmptyTshirts ? 'Estamos preparando el primer drop de polos LYNX.' : 'Intenta buscando con otra palabra o limpiando filtros.'}</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    let lastRenderedCategory = null;
    productsGrid.innerHTML = visibleProducts.map((product, productIndex) => {
        const isNewCategory = product.category !== lastRenderedCategory;
        const categoryMeta = CATALOG_CATEGORY_META[product.category] || { label: product.category.toUpperCase() };
        const categoryHeading = isNewCategory ? `
            <div class="catalog-category-heading" id="catalog-group-${product.category}" data-category="${product.category}">
                <div>
                    <span class="catalog-category-kicker">COLECCIÓN LYNX</span>
                    <h3>${categoryMeta.label}</h3>
                </div>
                <span class="catalog-category-count">${isCompactHomeCatalog && visibleCategoryCounts[product.category] < categoryCounts[product.category]
                    ? `${visibleCategoryCounts[product.category]} DE ${categoryCounts[product.category]}`
                    : `${categoryCounts[product.category]} ${categoryCounts[product.category] === 1 ? 'PRENDA' : 'PRENDAS'}`}</span>
            </div>
        ` : '';
        lastRenderedCategory = product.category;

        const isLastVisibleInCategory = visibleProducts[productIndex + 1]?.category !== product.category;
        const categoryMoreButton = isCompactHomeCatalog
            && isLastVisibleInCategory
            && visibleCategoryCounts[product.category] < categoryCounts[product.category]
            ? `<button class="catalog-category-more" type="button" data-category="${product.category}">
                    VER M&Aacute;S ${categoryMeta.moreLabel || categoryMeta.label}
                    <span aria-hidden="true">&rarr;</span>
               </button>`
            : '';

        return `${categoryHeading}
        <article class="product-card" id="product-${product.id}">
            <a class="product-card-img-wrapper product-detail-link" href="${productUrl(product)}" data-product-id="${product.id}" aria-label="Ver detalles de ${escapeHtml(product.title)}">
                <span class="product-card-badge ${product.badge.toLowerCase().includes('stock') || product.badge.toLowerCase().includes('limit') || product.badge.toLowerCase().includes('última') ? 'limited' : ''}">${product.badge}</span>
                <img class="product-card-primary-img" src="${product.image}" alt="${product.title}" loading="eager" decoding="async" fetchpriority="${productIndex < 3 ? 'high' : 'low'}" width="1200" height="1600" style="pointer-events:none;">
                ${supportsProductHover && product.images?.[1] ? `<img class="product-card-secondary-img" src="${product.images[1]}" alt="" aria-hidden="true" loading="eager" decoding="async" style="pointer-events:none;">` : ''}
            </a>
            <div class="product-card-content">
                <span class="product-card-category">${CATALOG_CATEGORY_META[product.category]?.label || product.category}</span>
                <a class="product-card-title product-detail-link" href="${productUrl(product)}" data-product-id="${product.id}">${product.title}</a>
                <span class="product-card-price">S/. ${product.price.toFixed(2)}</span>
                <div class="product-card-footer">
                    <button class="btn btn-primary btn-block product-card-add" type="button" data-product-id="${product.id}" ${product.status === 'sold_out' ? 'disabled' : ''}>
                        ${product.status === 'sold_out' ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
                    </button>
                    <a class="btn btn-secondary btn-block product-detail-link" href="${productUrl(product)}" data-product-id="${product.id}">VER DETALLES</a>
                </div>
            </div>
        </article>${categoryMoreButton}
    `;
    }).join('');

    // Si una foto se elimina o se renombra desde administración, la tarjeta
    // conserva una presentación limpia en vez de mostrar un espacio roto.
    productsGrid.querySelectorAll('img').forEach(imageFallback);

    requestAnimationFrame(updateCatalogNavOnScroll);
}

function renderTrendingProducts() {
    if (!trendingTrack) return;
    const supportsProductHover = window.innerWidth > 768 && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const preferredProducts = TRENDING_PRODUCT_IDS
        .map(id => PRODUCTS.find(product => product.id === id))
        .filter(Boolean);
    const preferredIds = new Set(preferredProducts.map(product => product.id));
    const newestFallbackProducts = [...PRODUCTS]
        .sort((a, b) => Number(b.id) - Number(a.id))
        .filter(product => !preferredIds.has(product.id));
    const featuredProducts = [...preferredProducts, ...newestFallbackProducts]
        .slice(0, TRENDING_PRODUCT_IDS.length);

    const renderGroup = isDuplicate => featuredProducts.map((product, productIndex) => `
        <article class="trending-card" ${isDuplicate ? 'aria-hidden="true"' : ''}>
            <a class="trending-card-image product-detail-link" href="${productUrl(product)}" data-product-id="${product.id}" aria-label="Ver detalles de ${escapeHtml(product.title)}" ${isDuplicate ? 'tabindex="-1"' : ''}>
                <span class="trending-card-badge">${product.badge}</span>
                <img class="trending-primary-img" src="${product.image}" alt="${isDuplicate ? '' : product.title}" loading="${isDuplicate ? 'lazy' : 'eager'}" decoding="async" ${!isDuplicate && productIndex < 2 ? 'fetchpriority="high"' : 'fetchpriority="auto"'}>
                ${supportsProductHover && product.images?.[1] ? `<img class="trending-secondary-img" src="${product.images[1]}" alt="" aria-hidden="true" loading="eager" decoding="async">` : ''}
            </a>
            <a class="trending-card-title product-detail-link" href="${productUrl(product)}" data-product-id="${product.id}" ${isDuplicate ? 'tabindex="-1"' : ''}>${product.title}</a>
            <span class="trending-card-price">S/. ${product.price.toFixed(2)}</span>
        </article>
    `).join('');

    // Tres copias mantienen el bucle fluido sin triplicar trabajo innecesario.
    // La copia central es la accesible; las laterales dan continuidad visual.
    trendingTrack.innerHTML = [0, 1, 2].map(groupIndex => `
        <div class="trending-loop-group" data-loop-group="${groupIndex}">
            ${renderGroup(groupIndex !== 1)}
        </div>
    `).join('');

    trendingTrack.querySelectorAll('img').forEach(imageFallback);

}

const OUTFIT_BUILDER_CONFIG = {
    top: {
        container: () => builderTopOptions,
        layer: builderLayerTop,
        options: [
            { productId: null, label: 'Sin hoodie', image: 'assets/logo.png' },
            { productId: 14, label: 'Malcom X Hoodie', image: 'assets/outfit-layers/malcom-x-hoodie-fitted.png' }
        ]
    },
    outer: {
        container: () => builderOuterOptions,
        layer: builderLayerOuter,
        options: [
            { productId: null, label: 'Sin jacket', image: 'assets/logo.png' },
            { productId: 16, label: 'Phantom Bomber', image: 'assets/outfit-layers/phantom-bomber-charcoal-fitted.png' }
        ]
    },
    bottom: {
        container: () => builderBottomOptions,
        layer: builderLayerBottom,
        options: [
            { productId: null, label: 'Sin jean / pant', image: 'assets/logo.png' },
            { productId: 40, label: 'Static Drip Flare Jean', image: 'assets/outfit-layers/static-drip-flare-fitted.png' }
        ]
    }
};

const outfitSelection = { top: 14, outer: 16, bottom: 40 };
const OUTFIT_REFERENCE_COMPOSITES = {
    '14-16-40': 'assets/outfit-composites/malcom-phantom-static-default.png',
    '14-0-40': 'assets/outfit-composites/malcom-static-no-jacket.png',
    '0-16-40': 'assets/outfit-composites/phantom-static-no-hoodie.png'
};

function setupOutfitBuilder() {
    if (!builderTopOptions || !builderOuterOptions || !builderLayerTop) return;

    Object.entries(OUTFIT_BUILDER_CONFIG).forEach(([slot, config]) => {
        const container = config.container();
        container.innerHTML = config.options.map(option => {
            const product = option.productId ? PRODUCTS.find(item => item.id === option.productId) : null;
            const price = product ? `S/. ${product.price.toFixed(2)}` : '—';
            const isSelected = outfitSelection[slot] === option.productId;
            return `
                <button type="button" class="builder-choice ${isSelected ? 'active' : ''}" data-builder-slot="${slot}" data-product-id="${option.productId ?? ''}">
                    <span class="builder-choice-thumb ${option.productId ? '' : 'is-empty'}">
                        ${option.productId ? `<img src="${option.image}" alt="">` : '<i data-lucide="minus"></i>'}
                    </span>
                    <span class="builder-choice-copy"><strong>${product?.title || option.label}</strong><small>${price}</small></span>
                    <i class="builder-choice-check" data-lucide="check"></i>
                </button>
            `;
        }).join('');
    });

    document.querySelectorAll('.builder-choice').forEach(button => {
        button.addEventListener('click', () => {
            const slot = button.dataset.builderSlot;
            outfitSelection[slot] = button.dataset.productId ? Number(button.dataset.productId) : null;
            renderOutfitPreview();
        });
    });

    builderBuyBtn?.addEventListener('click', sendOutfitToWhatsApp);
    renderOutfitPreview();
    lucide.createIcons();
}

function renderOutfitPreview() {
    // El look editorial principal usa una composición completa para respetar
    // exactamente el fit trapper. Las demás combinaciones se mantienen por
    // capas sobre el mismo maniquí.
    const compositeKey = `${outfitSelection.top || 0}-${outfitSelection.outer || 0}-${outfitSelection.bottom || 0}`;
    const compositeSrc = OUTFIT_REFERENCE_COMPOSITES[compositeKey];
    const showReferenceComposite = Boolean(compositeSrc);

    if (builderComposite) {
        builderComposite.hidden = !showReferenceComposite;
        if (compositeSrc) builderComposite.src = compositeSrc;
    }
    if (builderMannequin) builderMannequin.hidden = showReferenceComposite;
    if (builderUnderwear) {
        const showUnderwear = !showReferenceComposite && !outfitSelection.bottom;
        const hasUpperLayer = Boolean(outfitSelection.top || outfitSelection.outer);
        builderUnderwear.hidden = !showUnderwear;
        builderUnderwear.classList.toggle(
            'is-under-upper',
            showUnderwear && hasUpperLayer
        );
        // Fijar la escala inline evita que una regla antigua del navegador
        // vuelva a agrandar el boxer o lo deje oculto bajo la prenda superior.
        builderUnderwear.style.transform = showUnderwear
            ? `${hasUpperLayer ? 'translateY(22%) ' : ''}scaleX(0.5) scaleY(0.82)`
            : '';
    }

    Object.entries(OUTFIT_BUILDER_CONFIG).forEach(([slot, config]) => {
        const productId = outfitSelection[slot];
        const option = config.options.find(item => item.productId === productId);
        const product = productId ? PRODUCTS.find(item => item.id === productId) : null;
        const layer = config.layer;

        layer.hidden = showReferenceComposite || !option?.productId;
        if (option?.productId) {
            layer.src = option.image;
            layer.alt = product?.title || option.label;
        } else {
            layer.removeAttribute('src');
            layer.alt = '';
        }

        document.querySelectorAll(`.builder-choice[data-builder-slot="${slot}"]`).forEach(button => {
            const buttonId = button.dataset.productId ? Number(button.dataset.productId) : null;
            button.classList.toggle('active', buttonId === productId);
        });
    });

    const selectedProducts = Object.values(outfitSelection)
        .filter(Boolean)
        .map(id => PRODUCTS.find(product => product.id === id))
        .filter(Boolean);
    const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    builderTotal.textContent = `S/. ${total.toFixed(2)}`;
}

async function sendOutfitToWhatsApp() {
    const selectedProducts = Object.values(outfitSelection)
        .filter(Boolean)
        .map(id => PRODUCTS.find(product => product.id === id))
        .filter(Boolean);

    if (!selectedProducts.length) {
        alert('Elige al menos una prenda para armar tu outfit.');
        return;
    }

    const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const productsText = selectedProducts.map(product => `- ${product.title} — S/. ${product.price.toFixed(2)}`).join('\n');
    const message = `🔥 *QUIERO ESTE OUTFIT LYNX* 🔥\n\n${productsText}\n\n*Total estimado:* S/. ${total.toFixed(2)}\n\nHola, quiero confirmar disponibilidad y tallas de este look.`;
    window.open(`https://wa.me/51962210278?text=${encodeURIComponent(message)}`, '_blank');
}

function setupTrendingCarousel() {
    if (!trendingViewport || !trendingTrack || !trendingPrevBtn || !trendingNextBtn) return;

    let groupWidth = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let resumeAt = 0;
    let pointerId = null;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let dragDistance = 0;
    let suppressClick = false;
    let scrollTimer = 0;
    let resizeFrame = 0;
    let hasMeasured = false;
    let pressedLink = null;
    let pressedLinkPointerId = null;
    let pressedLinkStartX = 0;
    let pressedLinkStartY = 0;
    let pressedLinkDistance = 0;
    const speed = 0.085; // 85 px por segundo.
    const touchFirst = window.innerWidth <= 768
        || window.matchMedia('(hover: none), (pointer: coarse)').matches
        || navigator.maxTouchPoints > 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trendingViewport.dataset.carouselMode = touchFirst ? 'touch' : 'desktop';

    const normalizePosition = value => {
        if (!groupWidth) return value;
        // La copia central es la visible y accesible. Se normaliza lejos de sus
        // bordes para que el salto invisible nunca ocurra bajo el dedo.
        while (value >= groupWidth * 1.8) value -= groupWidth;
        while (value < groupWidth * 0.8) value += groupWidth;
        return value;
    };

    const normalizeScroll = () => {
        const normalized = normalizePosition(trendingViewport.scrollLeft);
        if (Math.abs(normalized - trendingViewport.scrollLeft) > 0.5) {
            trendingViewport.scrollLeft = normalized;
        }
    };

    const pauseAutoScroll = (milliseconds = 1400) => {
        resumeAt = Math.max(resumeAt, performance.now() + milliseconds);
    };

    const measureAndCenter = () => {
        const group = trendingTrack.querySelector('.trending-loop-group');
        if (!group) return;

        const previousWidth = groupWidth;
        const previousProgress = previousWidth
            ? ((trendingViewport.scrollLeft % previousWidth) + previousWidth) % previousWidth / previousWidth
            : 0;

        groupWidth = group.getBoundingClientRect().width;
        if (!groupWidth) return;

        // Empezar siempre en la copia central evita que Safari tenga que pintar
        // imágenes lazy de una copia oculta antes de mostrar el carrusel.
        trendingViewport.scrollLeft = groupWidth * (1 + Math.max(0, Math.min(0.999, previousProgress)));
        hasMeasured = true;
    };

    const getScrollStep = () => {
        const card = trendingTrack.querySelector('.trending-card');
        const group = trendingTrack.querySelector('.trending-loop-group');
        const gap = group ? parseFloat(getComputedStyle(group).columnGap) || 0 : 0;
        return card ? card.getBoundingClientRect().width + gap : trendingViewport.clientWidth * 0.8;
    };

    const moveCarousel = direction => {
        pauseAutoScroll(1600);
        trendingViewport.scrollBy({ left: getScrollStep() * direction, behavior: 'smooth' });
        window.setTimeout(normalizeScroll, 700);
    };

    const autoScroll = timestamp => {
        if (!lastFrameTime) lastFrameTime = timestamp;
        const elapsed = Math.min(timestamp - lastFrameTime, 50);
        lastFrameTime = timestamp;

        if (!touchFirst && !reduceMotion && groupWidth && pointerId === null && timestamp >= resumeAt && !document.hidden) {
            trendingViewport.scrollLeft += elapsed * speed;
            normalizeScroll();
        }
        animationFrame = requestAnimationFrame(autoScroll);
    };

    trendingPrevBtn.addEventListener('click', () => moveCarousel(-1));
    trendingNextBtn.addEventListener('click', () => moveCarousel(1));

    trendingViewport.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') moveCarousel(-1);
        if (event.key === 'ArrowRight') moveCarousel(1);
    });

    const endDragging = event => {
        if (pointerId === null || (event?.pointerId != null && event.pointerId !== pointerId)) return;
        suppressClick = dragDistance > 6;
        pointerId = null;
        trendingViewport.classList.remove('is-dragging');
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(normalizeScroll, 180);
        pauseAutoScroll(1200);
        lastFrameTime = performance.now();
        window.setTimeout(() => { suppressClick = false; }, 250);
    };

    trendingViewport.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        pressedLink = event.target.closest('.product-detail-link');
        pressedLinkPointerId = pressedLink ? event.pointerId : null;
        pressedLinkStartX = event.clientX;
        pressedLinkStartY = event.clientY;
        pressedLinkDistance = 0;
        // En iPhone/iPad el desplazamiento horizontal nativo es mucho más
        // fiable que capturar el dedo con Pointer Events. Solo arrastramos
        // manualmente con mouse; en pantallas táctiles el viewport conserva
        // su scroll horizontal natural.
        if (event.pointerType !== 'mouse') {
            pauseAutoScroll(2200);
            return;
        }
        if (pointerId !== null) return;
        pointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartScroll = trendingViewport.scrollLeft;
        dragDistance = 0;
        pauseAutoScroll(2000);
        trendingViewport.classList.add('is-dragging');
    });
    trendingViewport.addEventListener('pointermove', event => {
        if (event.pointerId === pressedLinkPointerId) {
            pressedLinkDistance = Math.max(
                pressedLinkDistance,
                Math.hypot(event.clientX - pressedLinkStartX, event.clientY - pressedLinkStartY)
            );
        }
        if (event.pointerId !== pointerId) return;
        const delta = event.clientX - dragStartX;
        dragDistance = Math.max(dragDistance, Math.abs(delta));
        if (dragDistance > 3 && event.cancelable) event.preventDefault();
        trendingViewport.scrollLeft = dragStartScroll - delta;
    }, { passive: false });
    const openPressedLink = event => {
        if (event.pointerId !== pressedLinkPointerId) return false;
        const destination = pressedLink?.href;
        const cleanTap = pressedLinkDistance <= 9 && Boolean(destination);
        pressedLink = null;
        pressedLinkPointerId = null;
        pressedLinkDistance = 0;
        if (!cleanTap) return false;
        if (event.cancelable) event.preventDefault();
        window.location.assign(destination);
        return true;
    };

    trendingViewport.addEventListener('pointerup', event => {
        if (openPressedLink(event)) return;
        if (event.pointerType !== 'mouse') {
            pauseAutoScroll(1600);
            window.clearTimeout(scrollTimer);
            scrollTimer = window.setTimeout(normalizeScroll, 360);
            return;
        }
        endDragging(event);
    }, { passive: false });
    window.addEventListener('pointerup', event => {
        if (openPressedLink(event)) return;
        endDragging(event);
    }, { passive: false });
    trendingViewport.addEventListener('pointercancel', event => {
        if (event.pointerId === pressedLinkPointerId) {
            pressedLink = null;
            pressedLinkPointerId = null;
            pressedLinkDistance = 0;
        }
        endDragging(event);
    }, { passive: true });
    trendingViewport.addEventListener('click', event => {
        if (suppressClick) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        const productLink = event.target.closest('.product-detail-link');
        if (!productLink || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;

        // Safari puede cancelar la navegación nativa si la tarjeta cambia unos
        // píxeles entre pointerdown y click. El click ya confirmó que no fue un
        // arrastre, así que abrimos la ficha de forma explícita y predecible.
        event.preventDefault();
        window.location.assign(productLink.href);
    }, true);
    trendingViewport.addEventListener('scroll', () => {
        if (!touchFirst || !hasMeasured) return;
        pauseAutoScroll(1800);
        window.clearTimeout(scrollTimer);
        // iOS conserva inercia después de touchend. Esperar a que realmente
        // termine evita saltos y tarjetas que dejan de responder.
        scrollTimer = window.setTimeout(normalizeScroll, 240);
    }, { passive: true });
    trendingViewport.addEventListener('wheel', () => {
        pauseAutoScroll(1200);
        window.setTimeout(normalizeScroll, 180);
    }, { passive: true });
    trendingViewport.addEventListener('focusin', () => pauseAutoScroll(4000));
    trendingViewport.addEventListener('focusout', () => pauseAutoScroll(700));

    let resizeObserver = null;
    const requestMeasure = () => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(measureAndCenter);
    };
    if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(requestMeasure);
        resizeObserver.observe(trendingViewport);
    } else {
        window.addEventListener('resize', requestMeasure, { passive: true });
    }

    measureAndCenter();
    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(autoScroll);

    window.addEventListener('pagehide', () => {
        cancelAnimationFrame(animationFrame);
        cancelAnimationFrame(resizeFrame);
        window.clearTimeout(scrollTimer);
        resizeObserver?.disconnect();
        window.removeEventListener('resize', requestMeasure);
    }, { once: true });
}

function renderCart() {
    // Actualizar badge del header
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalCount;
    cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i data-lucide="shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <button class="btn btn-secondary" id="empty-cart-explore-btn">Explorar Drop</button>
            </div>
        `;
        document.getElementById('cart-summary-footer').style.display = 'none';
        
        // Re-vincular evento de explorar drop
        document.getElementById('empty-cart-explore-btn').addEventListener('click', () => {
            closeAllDrawers();
            window.location.hash = '#catalog';
        });
        lucide.createIcons();
        return;
    }

    document.getElementById('cart-summary-footer').style.display = 'block';
    
    // Renderizar prendas en el carrito
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-img" loading="lazy" decoding="async">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.product.title}</h4>
                <div class="cart-item-meta">Talla: <strong>${item.size}</strong></div>
                <div class="cart-item-price">S/. ${item.product.price.toFixed(2)}</div>
                
                <!-- Qty Editor inside cart -->
                <div class="qty-selector" style="transform: scale(0.85); transform-origin: left center; margin-top: 8px;">
                    <button type="button" class="qty-btn dec-cart-qty" data-index="${index}" aria-label="Reducir cantidad de ${escapeHtml(item.product.title)}"><i data-lucide="minus"></i></button>
                    <input type="number" value="${item.qty}" min="1" readonly aria-label="Cantidad de ${escapeHtml(item.product.title)}" style="width: 35px;">
                    <button type="button" class="qty-btn inc-cart-qty" data-index="${index}" aria-label="Aumentar cantidad de ${escapeHtml(item.product.title)}"><i data-lucide="plus"></i></button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-item-btn" data-index="${index}" aria-label="Eliminar item">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Eventos del editor de cantidad del carrito
    document.querySelectorAll('.dec-cart-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            updateCartQty(index, -1);
        });
    });

    document.querySelectorAll('.inc-cart-qty').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.getAttribute('data-index'));
            updateCartQty(index, 1);
        });
    });

    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(btn.closest('.remove-item-btn').getAttribute('data-index'));
            removeFromCart(index);
        });
    });

    // Calcular Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
    cartSubtotal.textContent = `S/. ${subtotal.toFixed(2)}`;
    
    lucide.createIcons();
}

function updateCheckoutTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
    let shipping = 0;
    
    // Capturar método de envío
    const shippingMethod = document.querySelector('input[name="shipping-method"]:checked').value;
    
    if (shippingMethod === 'lima') {
        shipping = 15.00;
        limaPaymentConditionBox.classList.remove('hidden');
    } else {
        shipping = 0.00;
        limaPaymentConditionBox.classList.add('hidden');
    }

    const total = subtotal + shipping;

    checkoutSubtotal.textContent = `S/. ${subtotal.toFixed(2)}`;
    checkoutShipping.textContent = shipping === 0 ? 'FLETE POR PAGAR' : `S/. ${shipping.toFixed(2)}`;
    checkoutTotal.textContent = `S/. ${total.toFixed(2)}`;

    // Explicación de pago dinámica
    if (shippingMethod === 'shalom') {
        paymentExplanationText.innerHTML = `<strong>Envío Shalom a Provincias:</strong> El envío se realiza por pagar. Recogerás tu pedido en la agencia Shalom de tu ciudad en 2 a 3 días hábiles y pagarás el flete del transporte ahí mismo. El valor de las prendas se deposita previamente.`;
    } else if (shippingMethod === 'lima') {
        if (limaReserveCheckbox.checked) {
            const balance = total - 50.00;
            paymentExplanationText.innerHTML = `<strong>Reserva Exclusiva Lima:</strong> Separarás tus prendas abonando un adelanto de <strong>S/. 50.00</strong> por transferencia (Yape/BCP/BBVA) para congelar el stock. El saldo restante (<strong>S/. ${balance.toFixed(2)}</strong>) lo cancelarás en efectivo o Yape cuando el motorizado entregue tu pedido en tu casa.`;
        } else {
            paymentExplanationText.innerHTML = `<strong>Pago Contra Entrega Completo:</strong> Pagarás el monto completo de <strong>S/. ${total.toFixed(2)}</strong> (prendas + envío) en efectivo o Yape directamente al motorizado en la puerta de tu casa.`;
        }
    }
}

/* Legacy password-account flow retained temporarily for reference only.
function setupLegacyCustomerAccountEvents() {
    accountBtn?.addEventListener('click', () => openAccountDialog('login'));
    mobileAccountBtn?.addEventListener('click', () => {
        setMobileMenuOpen(false);
        openAccountDialog('login');
    });
    document.getElementById('account-close-btn')?.addEventListener('click', () => closeAccountDialog());
    accountDialog?.addEventListener('click', event => {
        if (event.target === accountDialog) closeAccountDialog();
    });
    document.getElementById('show-login-tab')?.addEventListener('click', () => showAccountMode('login'));
    document.getElementById('show-register-tab')?.addEventListener('click', () => showAccountMode('register'));

    document.getElementById('customer-login-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        setAccountMessage('customer-login-message');
        setCustomerButtonLoading(button, true, 'INGRESANDO...');
        try {
            const { data, error } = await customerSupabase.auth.signInWithPassword({
                email: document.getElementById('customer-login-email').value.trim(),
                password: document.getElementById('customer-login-password').value
            });
            if (error) throw error;
            customerUser = data.user;
            await loadCustomerProfile();
            if (!customerProfile?.full_name || !customerProfile?.phone) {
                fillCustomerProfileForm('Completa tus datos para continuar.');
                return;
            }
            await continuePendingCustomerAction();
        } catch (error) {
            setAccountMessage('customer-login-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
            lucide.createIcons();
        }
    });

    document.getElementById('customer-register-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        const fullName = document.getElementById('customer-register-name').value.trim();
        const phone = document.getElementById('customer-register-phone').value.trim();
        const email = document.getElementById('customer-register-email').value.trim();
        const password = document.getElementById('customer-register-password').value;
        const confirmation = document.getElementById('customer-register-confirm').value;
        const marketingOptIn = document.getElementById('customer-register-marketing').checked;
        setAccountMessage('customer-register-message');
        if (password !== confirmation) {
            setAccountMessage('customer-register-message', 'Las contraseñas no coinciden.');
            return;
        }
        setCustomerButtonLoading(button, true, 'CREANDO CUENTA...');
        try {
            const { data, error } = await customerSupabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/`,
                    data: { full_name: fullName, phone, marketing_opt_in: marketingOptIn }
                }
            });
            if (error) throw error;
            if (!data.session) {
                pendingVerificationEmail = email;
                document.getElementById('customer-resend-verification').hidden = false;
                setAccountMessage('customer-register-message', `Te enviamos un enlace de verificación a ${email}. Abre ese correo para activar tu cuenta; después inicia sesión y envía tu pedido.`, true);
                return;
            }
            customerUser = data.user;
            const { error: profileError } = await customerSupabase.from('customer_profiles').upsert({
                user_id: data.user.id,
                full_name: fullName,
                phone,
                email,
                marketing_opt_in: marketingOptIn,
                marketing_opt_in_at: marketingOptIn ? new Date().toISOString() : null
            }, { onConflict: 'user_id' });
            if (profileError) throw profileError;
            await loadCustomerProfile();
            await continuePendingCustomerAction();
        } catch (error) {
            setAccountMessage('customer-register-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
            lucide.createIcons();
        }
    });

    document.getElementById('customer-profile-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        const marketingOptIn = document.getElementById('customer-profile-marketing').checked;
        setAccountMessage('customer-profile-message');
        setCustomerButtonLoading(button, true, 'GUARDANDO...');
        try {
            const payload = {
                user_id: customerUser.id,
                full_name: document.getElementById('customer-profile-name').value.trim(),
                phone: document.getElementById('customer-profile-phone').value.trim(),
                email: customerUser.email,
                marketing_opt_in: marketingOptIn,
                marketing_opt_in_at: marketingOptIn ? (customerProfile?.marketing_opt_in_at || new Date().toISOString()) : null
            };
            const { error } = await customerSupabase.from('customer_profiles').upsert(payload, { onConflict: 'user_id' });
            if (error) throw error;
            await loadCustomerProfile();
            setAccountMessage('customer-profile-message', 'Tus datos se guardaron correctamente.', true);
            if (pendingCustomerAction) window.setTimeout(continuePendingCustomerAction, 450);
        } catch (error) {
            setAccountMessage('customer-profile-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
        }
    });

    document.getElementById('customer-reset-password')?.addEventListener('click', async () => {
        const email = document.getElementById('customer-login-email').value.trim();
        if (!email) {
            setAccountMessage('customer-login-message', 'Escribe tu correo primero.');
            return;
        }
        const { error } = await customerSupabase.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/` });
        setAccountMessage('customer-login-message', error ? customerErrorMessage(error) : 'Te enviamos un enlace para recuperar tu contraseña.', !error);
    });

    document.getElementById('customer-resend-verification')?.addEventListener('click', async event => {
        const email = pendingVerificationEmail || document.getElementById('customer-register-email').value.trim();
        if (!email) {
            setAccountMessage('customer-register-message', 'Escribe el correo que deseas verificar.');
            return;
        }
        setCustomerButtonLoading(event.currentTarget, true, 'REENVIANDO...');
        try {
            const { error } = await customerSupabase.auth.resend({
                type: 'signup',
                email,
                options: { emailRedirectTo: `${location.origin}/` }
            });
            if (error) throw error;
            setAccountMessage('customer-register-message', `Correo reenviado a ${email}. Revisa también la carpeta de spam o promociones.`, true);
        } catch (error) {
            setAccountMessage('customer-register-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(event.currentTarget, false);
            lucide.createIcons();
        }
    });

    document.getElementById('customer-recovery-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        const password = document.getElementById('customer-recovery-password').value;
        const confirmation = document.getElementById('customer-recovery-confirm').value;
        setAccountMessage('customer-recovery-message');
        if (password !== confirmation) {
            setAccountMessage('customer-recovery-message', 'Las contraseñas no coinciden.');
            return;
        }
        setCustomerButtonLoading(button, true, 'GUARDANDO...');
        try {
            const { error } = await customerSupabase.auth.updateUser({ password });
            if (error) throw error;
            history.replaceState({}, document.title, location.pathname + location.search);
            event.currentTarget.reset();
            fillCustomerProfileForm('Contraseña actualizada correctamente.');
        } catch (error) {
            setAccountMessage('customer-recovery-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
        }
    });

    document.getElementById('customer-logout-btn')?.addEventListener('click', async () => {
        await customerSupabase.auth.signOut();
        customerUser = null;
        customerProfile = null;
        updateAccountButton();
        closeAccountDialog();
    });
}
*/

function setupCustomerAccountEvents() {
    mobileAccountBtn?.addEventListener('click', () => setMobileMenuOpen(false));
    document.getElementById('account-close-btn')?.addEventListener('click', closeAccountDialog);
    accountDialog?.addEventListener('click', event => {
        if (event.target === accountDialog) closeAccountDialog();
    });

    document.getElementById('customer-email-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.submitter;
        const email = document.getElementById('customer-email').value.trim();
        const consent = document.getElementById('customer-email-consent').checked;
        setAccountMessage('customer-email-message');
        if (!consent) {
            setAccountMessage('customer-email-message', 'Confirma que deseas recibir promociones, nuevo stock y avisos de live.');
            return;
        }
        if (!customerSupabase) {
            setAccountMessage('customer-email-message', 'El registro por correo no está disponible en este momento.');
            return;
        }
        setCustomerButtonLoading(button, true, 'ENVIANDO...');
        try {
            const redirectBase = location.protocol === 'file:' ? 'https://www.lynx.pe/' : `${location.origin}/`;
            const { error } = await customerSupabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: redirectBase,
                    shouldCreateUser: true,
                    data: { marketing_opt_in: true, discount_requested: true }
                }
            });
            if (error) throw error;
            pendingVerificationEmail = email;
            sessionStorage.setItem(DISCOUNT_POPUP_SESSION_KEY, '1');
            window.LynxTracking?.track('discount_signup', { consent: true });
            showDiscountSent(email);
        } catch (error) {
            setAccountMessage('customer-email-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
            lucide.createIcons();
        }
    });

    document.getElementById('discount-use-another-email')?.addEventListener('click', async () => {
        await customerSupabase?.auth.signOut();
        customerUser = null;
        customerProfile = null;
        document.getElementById('customer-email-form')?.reset();
        showDiscountForm();
        updateAccountButton();
    });

    document.getElementById('discount-otp-form')?.addEventListener('submit', async event => {
        event.preventDefault();
        const button = event.currentTarget.querySelector('button[type="submit"]');
        const email = pendingVerificationEmail || document.getElementById('customer-email')?.value.trim();
        const token = document.getElementById('discount-email-otp')?.value.trim();
        if (!email || !token) {
            setAccountMessage('discount-otp-message', 'Escribe el código que llegó a tu correo.');
            return;
        }
        setCustomerButtonLoading(button, true, 'VERIFICANDO...');
        try {
            const { data, error } = await customerSupabase.auth.verifyOtp({ email, token, type: 'email' });
            if (error) throw error;
            customerUser = data.user;
            setAccountMessage('discount-otp-message', 'Correo verificado. Estamos enviando tu descuento.', true);
            window.LynxTracking?.track('discount_verified');
            await requestWelcomeDiscountEmail();
            showDiscountSent(email, true);
            updateAccountButton();
        } catch (error) {
            setAccountMessage('discount-otp-message', customerErrorMessage(error));
        } finally {
            setCustomerButtonLoading(button, false);
            lucide.createIcons();
        }
    });
}

// 6. CONTROLADORES DE EVENTO
function setupEventListeners() {
    setupCustomerAccountEvents();
    mobileMenuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        setMobileMenuOpen(!isOpen);
    });

    document.addEventListener('click', (event) => {
        if (!mobileNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            setMobileMenuOpen(false);
        }
    });

    // Abrir y cerrar Carrito
    openCartBtn.addEventListener('click', () => {
        closeAllDrawers();
        cartDrawer.classList.add('active');
        renderCart();
        window.LynxTracking?.track('view_cart', { items: cart.reduce((sum, item) => sum + item.qty, 0), value: cart.reduce((sum, item) => sum + item.product.price * item.qty, 0) });
    });

    closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));

    cartDrawer.addEventListener('click', event => {
        if (event.target === cartDrawer) cartDrawer.classList.remove('active');
    });

    checkoutDrawer.addEventListener('click', event => {
        if (event.target === checkoutDrawer) checkoutDrawer.classList.remove('active');
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        if (accountDialog?.open) {
            closeAccountDialog();
            return;
        }
        closeAllDrawers();
        setMobileMenuOpen(false);
    });

    window.addEventListener('storage', event => {
        if (event.key !== CART_STORAGE_KEY) return;
        restoreCart();
        renderCart();
    });

    productsGrid.addEventListener('click', event => {
        const categoryMoreButton = event.target.closest('.catalog-category-more');
        if (categoryMoreButton) {
            const category = categoryMoreButton.dataset.category;
            selectedCategory = category;
            catalogExpanded = false;
            catalogVisibleLimit = CATALOG_PAGE_SIZE;
            setActiveCategoryTag(category);
            syncNavLinks(category);
            renderProducts();
            requestAnimationFrame(() => {
                document.getElementById(`catalog-group-${category}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            return;
        }

        const button = event.target.closest('.product-card-add');
        if (!button || button.disabled) return;
        const product = PRODUCTS.find(item => String(item.id) === button.dataset.productId);
        if (!product) return;
        const size = product.sizes?.length ? product.sizes[0] : 'ÚNICA';
        if (!addToCart(product, size, 1)) return;
        closeAllDrawers();
        cartDrawer.classList.add('active');
    });

    const openCatalogProduct = event => {
        const link = event.target.closest('.product-detail-link');
        if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        event.preventDefault();
        window.location.assign(link.href);
    };
    // Tanto el catálogo como el carrusel abren la ficha individual completa.
    // Esto evita mantener dos diseños distintos para el mismo producto.
    productsGrid.addEventListener('click', openCatalogProduct);

    // Navegar y Filtrar por Categoria
    categoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            selectedCategory = tag.getAttribute('data-category');
            catalogVisibleLimit = CATALOG_PAGE_SIZE;
            catalogExpanded = false;
            
            // Sincronizar con desktop nav si aplica
            syncNavLinks(selectedCategory);
            renderProducts();
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const navCategory = link.id === 'nav-all'
                ? 'all'
                : Object.keys(CATALOG_CATEGORY_META).find(category => CATALOG_CATEGORY_META[category].navId === link.id);

            if (!navCategory) return;

            searchQuery = '';
            searchInput.value = '';
            syncNavLinks(navCategory);

            if (navCategory === 'all') {
                selectedCategory = 'all';
                catalogExpanded = false;
                setActiveCategoryTag('all');
                renderProducts();
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
                return;
            }

            const categoryHasProducts = PRODUCTS.some(product => product.category === navCategory);
            if (!categoryHasProducts) {
                selectedCategory = navCategory;
                setActiveCategoryTag(navCategory);
                renderProducts();
                document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
                return;
            }

            selectedCategory = navCategory;
            catalogExpanded = false;
            setActiveCategoryTag(navCategory);
            catalogVisibleLimit = CATALOG_PAGE_SIZE;
            renderProducts();
            requestAnimationFrame(() => {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const anchorTarget = link.getAttribute('href');
            if (anchorTarget?.startsWith('#')) {
                document.querySelector(anchorTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setMobileMenuOpen(false);
                return;
            }
            navigateToCatalogCategory(link.dataset.category);
            setMobileMenuOpen(false);
        });
    });

    document.querySelectorAll('.footer-category-button').forEach(button => {
        button.addEventListener('click', () => {
            navigateToCatalogCategory(button.dataset.category);
        });
    });

    window.addEventListener('scroll', handleCatalogScroll, { passive: true });

    // Búsqueda
    headerSearchBtn?.addEventListener('click', () => {
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => searchInput.focus({ preventScroll: true }), 500);
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        catalogVisibleLimit = CATALOG_PAGE_SIZE;
        catalogExpanded = false;
        renderProducts();
    });
    searchInput.addEventListener('change', () => {
        window.LynxTracking?.track('search', { search_term: searchQuery });
    });

    catalogSortSelect?.addEventListener('change', event => {
        catalogSort = event.target.value;
        catalogVisibleLimit = CATALOG_PAGE_SIZE;
        catalogExpanded = false;
        renderProducts();
    });

    catalogInStockToggle?.addEventListener('change', event => {
        catalogInStockOnly = event.target.checked;
        catalogVisibleLimit = CATALOG_PAGE_SIZE;
        catalogExpanded = false;
        renderProducts();
    });

    catalogLoadMore?.addEventListener('click', () => {
        if (selectedCategory === 'all' && !searchQuery.trim() && !catalogExpanded) {
            catalogExpanded = true;
            catalogVisibleLimit = PRODUCTS.length;
        } else {
            catalogVisibleLimit += CATALOG_PAGE_SIZE;
        }
        renderProducts();
    });

    // Modal de Detalles
    closeProductModal.addEventListener('click', () => {
        closeProductDetails();
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductDetails();
    });

    // Tallas en el Modal
    modalSizeContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.size-btn');
        if (!btn) return;
        modalSizeContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });

    // Cantidad en el Modal
    modalQtyMinus.addEventListener('click', () => {
        let val = parseInt(modalQtyInput.value);
        if (val > 1) modalQtyInput.value = val - 1;
    });

    modalQtyPlus.addEventListener('click', () => {
        let val = parseInt(modalQtyInput.value);
        const maxStock = currentProduct?.stock || Number.MAX_SAFE_INTEGER;
        if (val < maxStock) modalQtyInput.value = val + 1;
    });

    // Agregar al Carrito desde el Modal
    modalAddToCartBtn.addEventListener('click', () => {
        const size = modalSizeContainer.querySelector('.size-btn.active').getAttribute('data-size');
        const qty = parseInt(modalQtyInput.value);
        
        const wasAdded = addToCart(currentProduct, size, qty);
        if (!wasAdded) return;
        closeProductDetails();
        
        // Abrir automáticamente el carrito para dar feedback
        cartDrawer.classList.add('active');
        renderCart();
    });

    // Flujo de Checkout
    goToCheckoutBtn.addEventListener('click', async () => {
        openCheckoutDrawer();
        window.LynxTracking?.track('begin_checkout', { items: cart.reduce((sum, item) => sum + item.qty, 0), value: cart.reduce((sum, item) => sum + item.product.price * item.qty, 0) });
    });

    backToCartBtn.addEventListener('click', () => {
        checkoutDrawer.classList.remove('active');
        cartDrawer.classList.add('active');
    });

    closeCheckoutBtn.addEventListener('click', () => checkoutDrawer.classList.remove('active'));

    // Configuración de envíos y reservas dinámicas
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Actualizar clase activa visualmente en la tarjeta de opción
            document.querySelectorAll('.shipping-option-card').forEach(card => {
                card.classList.remove('active');
            });
            radio.closest('.shipping-option-card').classList.add('active');
            updateCheckoutTotals();
            window.LynxTracking?.track('shipping_selected', { method: radio.value });
        });
    });

    limaReserveCheckbox.addEventListener('change', () => {
        updateCheckoutTotals();
    });

    // Enviar pedido por WhatsApp
    submitOrderBtn.addEventListener('click', async () => {
        await submitOrder();
    });
}

function setMobileMenuOpen(isOpen) {
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.getElementById('main-header').classList.toggle('menu-open', isOpen);
    mobileMenuBtn.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
    lucide.createIcons();
}

function navigateToCatalogCategory(navCategory) {
    if (!navCategory) return;

    searchQuery = '';
    searchInput.value = '';
    syncNavLinks(navCategory);

    if (navCategory === 'all') {
        selectedCategory = 'all';
        catalogExpanded = false;
        setActiveCategoryTag('all');
        renderProducts();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const categoryHasProducts = PRODUCTS.some(product => product.category === navCategory);
    if (!categoryHasProducts) {
        selectedCategory = navCategory;
        setActiveCategoryTag(navCategory);
        renderProducts();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    selectedCategory = navCategory;
    catalogExpanded = false;
    setActiveCategoryTag(navCategory);
    catalogVisibleLimit = CATALOG_PAGE_SIZE;
    renderProducts();
    requestAnimationFrame(() => {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function setActiveCategoryTag(category) {
    categoryTags.forEach(tag => {
        tag.classList.toggle('active', tag.getAttribute('data-category') === category);
    });
}

function handleCatalogScroll() {
    if (catalogScrollFrame) return;
    catalogScrollFrame = requestAnimationFrame(() => {
        catalogScrollFrame = null;
        updateCatalogNavOnScroll();
    });
}

function updateCatalogNavOnScroll() {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    // Cuando hay un filtro activo, el menú debe conservar esa categoría
    // aunque la animación de desplazamiento todavía no haya terminado.
    if (selectedCategory !== 'all') {
        syncNavLinks(selectedCategory);
        return;
    }

    const headerOffset = (document.getElementById('main-header')?.offsetHeight || 72) + 36;
    const headings = [...document.querySelectorAll('.catalog-category-heading')];

    if (catalog.getBoundingClientRect().top > headerOffset) {
        syncNavLinks('all');
        return;
    }

    if (headings.length === 0) {
        syncNavLinks(selectedCategory);
        return;
    }

    if (headings[0].getBoundingClientRect().top > headerOffset + 20) {
        syncNavLinks('all');
        return;
    }

    let visibleCategory = headings[0].dataset.category;
    headings.forEach(heading => {
        if (heading.getBoundingClientRect().top <= headerOffset + 20) {
            visibleCategory = heading.dataset.category;
        }
    });
    syncNavLinks(visibleCategory);
}

function syncNavLinks(category) {
    navLinks.forEach(link => {
        const id = link.id;
        if (category === 'all' && id === 'nav-all') link.classList.add('active');
        else if (category === 'hoodies-jackets' && id === 'nav-hoodies') link.classList.add('active');
        else if (category === 't-shirts' && id === 'nav-tshirts') link.classList.add('active');
        else if (category === 'jeans-pants' && id === 'nav-jeans') link.classList.add('active');
        else if (category === 'conjuntos' && id === 'nav-conjuntos') link.classList.add('active');
        else link.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.category === category);
    });
}

// 7. FUNCIONES DEL CARRITO DE COMPRAS
function openProductDetails(id, { syncUrl = true } = {}) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    
    currentProduct = product;
    const images = product.images || [product.image];
    
    // Imagen principal
    modalProductImg.alt = product.title;
    modalProductTitle.textContent = product.title;
    modalProductPrice.textContent = `S/. ${product.price.toFixed(2)}`;
    modalProductDesc.textContent = product.description;
    modalProductBadge.textContent = product.badge;
    const isSoldOut = product.status === 'sold_out';
    modalAddToCartBtn.disabled = isSoldOut;
    modalAddToCartBtn.innerHTML = isSoldOut
        ? '<i data-lucide="ban"></i> PRODUCTO AGOTADO'
        : product.status === 'preorder'
            ? '<i data-lucide="clock-3"></i> RESERVAR PREVENTA'
            : '<i data-lucide="shopping-bag"></i> AGREGAR AL CARRITO';
    modalFitRecommendation.hidden = product.category !== 'jeans-pants' || product.fitRecommendation === false;

    // Galería de miniaturas
    let thumbsContainer = document.getElementById('modal-thumbs');
    if (!thumbsContainer) {
        thumbsContainer = document.createElement('div');
        thumbsContainer.id = 'modal-thumbs';
        thumbsContainer.style.cssText = 'display:flex;gap:8px;margin-top:10px;justify-content:center;flex-wrap:wrap;';
        modalProductImg.parentNode.insertBefore(thumbsContainer, modalProductImg.nextSibling);
    }
    thumbsContainer.innerHTML = images.map((src, i) => `
        <img src="${src}" data-idx="${i}" loading="eager" decoding="async" style="width:64px;height:80px;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid ${i===0?'var(--accent)':'transparent'};opacity:${i===0?'1':'0.6'};transition:all 0.2s;" class="modal-thumb">
    `).join('');
    thumbsContainer.querySelectorAll('img').forEach(imageFallback);
    thumbsContainer.querySelectorAll('.modal-thumb').forEach(thumb => {
        thumb.addEventListener('load', () => {
            const mainPath = new URL(modalProductImg.currentSrc || modalProductImg.src, location.href).pathname;
            if (mainPath.endsWith('/assets/logo-transparent.png')) {
                setModalMainImage(thumb.src, thumb);
            }
        }, { once: true });
        thumb.addEventListener('click', () => {
            setModalMainImage(thumb.src, thumb);
        });
    });
    setModalMainImage(images[0], thumbsContainer.querySelector('.modal-thumb'));
    
    // Resetear valores de talla y cantidad
    modalQtyInput.value = 1;
    modalQtyInput.max = product.stock || '';
    const availableSizes = product.sizes || ['S', 'M', 'L', 'XL'];
    modalSizeContainer.innerHTML = availableSizes.map((size, idx) => `
        <button class="size-btn ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
    `).join('');

    productModal.classList.add('active');
    if (syncUrl) {
        productModalReturnUrl = `${location.pathname}${location.search}${location.hash}`;
        history.replaceState({ productId: product.id }, '', productUrl(product));
    }
    document.title = `${product.title} | LYNX`;
    lucide.createIcons();
}

function closeProductDetails() {
    productModal.classList.remove('active');
    if (productModalReturnUrl) {
        history.replaceState({}, '', productModalReturnUrl);
        productModalReturnUrl = null;
        document.title = 'LYNX | Premium Streetwear Co.';
        return;
    }
    const url = new URL(location.href);
    if (url.searchParams.has('producto')) {
        url.searchParams.delete('producto');
        history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
    document.title = 'LYNX | Premium Streetwear Co.';
}

function openProductFromUrl() {
    const params = new URLSearchParams(location.search);
    const productId = Number(params.get('producto'));
    if (!productId) return;

    const product = PRODUCTS.find(item => item.id === productId);
    if (!product) return;

    openProductDetails(productId, { syncUrl: false });

    // Llegadas desde una ficha individual: se conserva la prenda, talla y
    // cantidad seleccionadas, y se abre la bolsa para continuar el pedido.
    if (params.get('comprar') === '1' || params.get('agregar') === '1') {
        const availableSizes = product.sizes?.length ? product.sizes : ['ÚNICA'];
        const requestedSize = params.get('talla');
        const size = availableSizes.includes(requestedSize) ? requestedSize : availableSizes[0];
        const requestedQty = Math.max(1, Number(params.get('cantidad')) || 1);
        const wasAdded = addToCart(product, size, requestedQty);
        if (wasAdded || cart.length) {
            productModal.classList.remove('active');
            cartDrawer.classList.add('active');
        }
        ['producto', 'comprar', 'agregar', 'talla', 'cantidad'].forEach(key => params.delete(key));
        const cleanQuery = params.toString();
        history.replaceState({}, '', `${location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${location.hash}`);
    }
}

function addToCart(product, size, qty) {
    if (product.status === 'sold_out') {
        alert('Esta prenda está agotada por el momento.');
        return false;
    }

    // Buscar si el producto de esa talla ya está en el carrito
    const existingIndex = cart.findIndex(item => item.product.id === product.id && item.size === size);
    const currentProductQty = cart
        .filter(item => item.product.id === product.id)
        .reduce((total, item) => total + item.qty, 0);
    const availableToAdd = product.stock
        ? Math.max(0, product.stock - currentProductQty)
        : qty;
    const qtyToAdd = Math.min(qty, availableToAdd);

    if (qtyToAdd <= 0) {
        alert('Ya agregaste todas las unidades disponibles de esta prenda.');
        return false;
    }
    
    if (existingIndex > -1) {
        cart[existingIndex].qty += qtyToAdd;
    } else {
        cart.push({ product, size, qty: qtyToAdd });
    }

    persistCart();
    renderCart();
    window.LynxTracking?.track('add_to_cart', { product_id: product.id, product_name: product.title, category: product.category, size, quantity: qtyToAdd, value: product.price * qtyToAdd });
    return true;
}

function updateCartQty(index, delta) {
    if (cart[index]) {
        const maxStock = cart[index].product.stock || Number.MAX_SAFE_INTEGER;
        cart[index].qty = Math.min(cart[index].qty + delta, maxStock);
        if (cart[index].qty <= 0) {
            removeFromCart(index);
        } else {
            persistCart();
            renderCart();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    persistCart();
    renderCart();
}

function closeAllDrawers() {
    cartDrawer.classList.remove('active');
    checkoutDrawer.classList.remove('active');
    closeProductDetails();
    closeReviewImages();
}

// 8. FINALIZACIÓN Y ENVÍO A WHATSAPP
async function submitOrder() {
    // Validar formulario manualmente
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    const fields = [
        { id: 'checkout-name', error: 'checkout-name-error', valid: name.length >= 3, message: 'Escribe tu nombre y apellido.' },
        { id: 'checkout-phone', error: 'checkout-phone-error', valid: /^[0-9 +()-]{9,15}$/.test(phone), message: 'Escribe un WhatsApp válido de 9 a 15 dígitos.' },
        { id: 'checkout-city', error: 'checkout-city-error', valid: city.length >= 3, message: 'Indica tu ciudad o departamento.' },
        { id: 'checkout-address', error: 'checkout-address-error', valid: address.length >= 6, message: 'Completa la dirección y una referencia.' }
    ];
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        const error = document.getElementById(field.error);
        input.classList.toggle('is-invalid', !field.valid);
        input.setAttribute('aria-invalid', String(!field.valid));
        if (error) error.textContent = field.valid ? '' : field.message;
    });
    const firstInvalid = fields.find(field => !field.valid);
    if (firstInvalid) {
        document.getElementById(firstInvalid.id).focus();
        return;
    }

    const shippingMethod = document.querySelector('input[name="shipping-method"]:checked').value;
    const reserveLima = limaReserveCheckbox.checked;
    const discountCode = document.getElementById('checkout-discount-code')?.value.trim().toUpperCase() || '';

    // Calcular montos
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
    const shippingCost = shippingMethod === 'lima' ? 15.00 : 0.00;
    const total = subtotal + shippingCost;

    // Crear lista de productos formateada
    let productsText = '';
    cart.forEach(item => {
        productsText += `• ${item.qty}x ${item.product.title} (Talla: ${item.size}) - S/. ${(item.product.price * item.qty).toFixed(2)}\n`;
    });

    // Formatear Detalles de Pago en el mensaje
    let paymentDetailText = '';
    if (shippingMethod === 'shalom') {
        paymentDetailText = `📦 *ENVÍO A PROVINCIA (SHALOM):*\n- Flete de envío se cancela al recoger en agencia.\n- Depósito de prendas requerido para el despacho.\n- *Total Prendas: S/. ${subtotal.toFixed(2)}*`;
    } else { // Lima
        if (reserveLima) {
            const balance = total - 50.00;
            paymentDetailText = `🛵 *DELIVERY MOTORIZADO LIMA (RESERVA):*\n- Adelanto de Reserva: *S/. 50.00*\n- Saldo a pagar al recibir: *S/. ${balance.toFixed(2)}*\n- *Total del Pedido: S/. ${total.toFixed(2)}*`;
        } else {
            paymentDetailText = `🛵 *DELIVERY MOTORIZADO LIMA (CONTRA ENTREGA):*\n- *Pago Completo al Recibir: S/. ${total.toFixed(2)}*`;
        }
    }

    // Mensaje final para WhatsApp
    const message = `🔥 *NUEVO PEDIDO - LYNX STREETWEAR* 🔥\n\n` +
                    `👤 *DATOS DEL CLIENTE:*\n` +
                    `- *Nombre:* ${name}\n` +
                    `${customerUser?.email ? `- *Cuenta:* ${customerUser.email}\n` : ''}` +
                    `- *Celular:* ${phone}\n` +
                    `- *Ciudad:* ${city}\n` +
                    `- *Dirección:* ${address}\n` +
                    `${discountCode ? `- *Código de descuento:* ${discountCode} (por validar)\n` : ''}\n` +
                    `🛒 *PRODUCTOS DEL PEDIDO:*\n${productsText}\n` +
                    `${paymentDetailText}\n\n` +
                    `💬 *Mensaje:* Hola, me gustaría confirmar mi pedido. Por favor, bríndame los datos de cuenta para realizar el depósito correspondiente.`;

    // Codificar mensaje para URL de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const shopWhatsappNumber = '51962210278'; // Número de la tienda
    
    const whatsappUrl = `https://wa.me/${shopWhatsappNumber}?text=${encodedMessage}`;

    window.LynxTracking?.track('generate_lead', { channel: 'whatsapp', shipping_method: shippingMethod, reserve_lima: reserveLima, discount_code_entered: Boolean(discountCode), items: cart.reduce((sum, item) => sum + item.qty, 0), value: total });
    // Navegación directa: evita bloqueos de pestañas emergentes en celulares.
    location.href = whatsappUrl;
}
