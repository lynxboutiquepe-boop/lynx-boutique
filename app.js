// LYNX STREETWEAR DEPT. - APP LOGIC

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
    'textured-cable-knit-cabin-puffer-jacket-yellow': 'mockups-finales/textured-cable-knit-cabin-puffer-jacket-yellow-1-mockup.png'
};

function productImages(slug, count = 8) {
    const photos = Array.from({ length: count }, (_, index) => `assets/${slug}/${slug}-${index + 1}.webp`);
    const mockup = PRODUCT_MOCKUPS[slug];
    return mockup ? [mockup, ...photos] : photos;
}

// 1. DATA DE PRODUCTOS POR DEFECTO
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        title: '49ers Monster Oversized Zip Up Hoodie - Red',
        category: 'hoodies-jackets',
        price: 109.90,
        images: [
            'mockups-finales/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-51-32_98672_PXF-mockup.png',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-51-32_98672_PXF.jpg?v=1763143743',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-50-54_98658_PXF.jpg?v=1763143743',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-52-26_98681_PXF_SG.jpg?v=1763155567',
            'https://cdn.shopify.com/s/files/1/0293/9277/files/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-52-09_98678_PXF_SG.jpg?v=1763155567'
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
        category: 'hoodies-jackets',
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
        category: 'hoodies-jackets',
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
        category: 'jeans-pants',
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
        category: 'jeans-pants',
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
        category: 'jeans-pants',
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
        category: 'hoodies-jackets',
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
        category: 'hoodies-jackets',
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
        category: 'jeans-pants',
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
    }
];

let PRODUCTS = [];


// 2. ESTADO DE LA APLICACIÓN
let cart = [];
let selectedCategory = 'all';
let searchQuery = '';
let currentProduct = null; // Para ver detalles
let catalogScrollFrame = null;

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
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const catalogCountText = document.getElementById('catalog-count-text');
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
const TRENDING_PRODUCT_IDS = [14, 15, 16, 17, 13, 8, 6, 3, 21];
const CATALOG_CATEGORY_ORDER = ['hoodies-jackets', 't-shirts', 'jeans-pants', 'conjuntos'];
const CATALOG_CATEGORY_META = {
    'hoodies-jackets': { label: 'HOODIES & JACKETS', navId: 'nav-hoodies' },
    't-shirts': { label: 'T-SHIRTS', navId: 'nav-tshirts' },
    'jeans-pants': { label: 'JEANS & PANTS', navId: 'nav-jeans' },
    'conjuntos': { label: 'CONJUNTOS', navId: 'nav-conjuntos' }
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

// 4. LÓGICA DE INICIALIZACIÓN
function mapDatabaseProduct(row) {
    const images = Array.isArray(row.images) ? row.images.filter(Boolean) : [];
    const statusBadge = {
        preorder: 'PREVENTA',
        sold_out: 'AGOTADO',
        low_stock: 'ÚLTIMAS UNIDADES'
    }[row.status];

    return {
        id: row.legacy_id ?? (1000000 + Number(row.id)),
        databaseId: row.id,
        title: row.title,
        category: row.category,
        price: Number(row.price),
        cost: Number(row.cost || 0),
        stock: Number(row.stock || 0),
        sizes: row.sizes || [],
        images,
        image: images[0] || 'assets/logo-transparent.png',
        description: row.description || '',
        badge: statusBadge || row.badge || 'NUEVO',
        status: row.status || 'available',
        fitRecommendation: row.fit_recommendation !== false
    };
}

async function loadDatabaseCatalog() {
    const client = window.getLynxSupabase?.();
    if (!client) return null;

    const { data, error } = await client
        .from('products')
        .select('*')
        .neq('status', 'archived')
        .order('sort_order', { ascending: true })
        .order('id', { ascending: true });

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
    const databaseProducts = await loadDatabaseCatalog();
    if (databaseProducts?.length) {
        PRODUCTS = databaseProducts;
    } else {
    const adminProducts = localStorage.getItem('lynx_admin_products');
    if (adminProducts) {
        const parsed = JSON.parse(adminProducts);
        // Mezclar: DEFAULT_PRODUCTS primero, luego los del admin que no estén duplicados
        const adminIds = parsed.map(p => p.id);
        const defaults = DEFAULT_PRODUCTS.filter(p => !adminIds.includes(p.id));
        PRODUCTS = [...defaults, ...parsed];
    } else {
        PRODUCTS = [...DEFAULT_PRODUCTS];
    }
    }
    // Limpiar el viejo formato por si acaso
    localStorage.removeItem('lynx_store_products');

    renderProducts();
    renderTrendingProducts();
    setupOutfitBuilder();
    setupEventListeners();
    setupTrendingCarousel();
    lucide.createIcons(); // Cargar íconos lucide
});

// 5. FUNCIONES DE RENDERIZACIÓN
function renderProducts() {
    // Filtrar productos
    let filtered = PRODUCTS.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => {
        const categoryDifference = CATALOG_CATEGORY_ORDER.indexOf(a.category) - CATALOG_CATEGORY_ORDER.indexOf(b.category);
        return categoryDifference || a.id - b.id;
    });

    const categoryCounts = filtered.reduce((counts, product) => {
        counts[product.category] = (counts[product.category] || 0) + 1;
        return counts;
    }, {});

    // Actualizar texto de cantidad
    catalogCountText.textContent = filtered.length === 1 
        ? 'Mostrando 1 producto' 
        : `Mostrando ${filtered.length} productos`;

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
    productsGrid.innerHTML = filtered.map((product, productIndex) => {
        const isNewCategory = product.category !== lastRenderedCategory;
        const categoryMeta = CATALOG_CATEGORY_META[product.category] || { label: product.category.toUpperCase() };
        const categoryHeading = isNewCategory ? `
            <div class="catalog-category-heading" id="catalog-group-${product.category}" data-category="${product.category}">
                <div>
                    <span class="catalog-category-kicker">COLECCIÓN LYNX</span>
                    <h3>${categoryMeta.label}</h3>
                </div>
                <span class="catalog-category-count">${categoryCounts[product.category]} ${categoryCounts[product.category] === 1 ? 'PRENDA' : 'PRENDAS'}</span>
            </div>
        ` : '';
        lastRenderedCategory = product.category;

        return `${categoryHeading}
        <article class="product-card" id="product-${product.id}">
            <div class="product-card-img-wrapper view-details-btn" data-id="${product.id}" style="cursor:pointer;">
                <span class="product-card-badge ${product.badge.toLowerCase().includes('stock') || product.badge.toLowerCase().includes('limit') || product.badge.toLowerCase().includes('última') ? 'limited' : ''}">${product.badge}</span>
                <img class="product-card-primary-img" src="${product.image}" alt="${product.title}" loading="${productIndex < 4 ? 'eager' : 'lazy'}" decoding="async" ${productIndex < 4 ? 'fetchpriority="high"' : ''} style="pointer-events:none;">
                ${product.images?.[1] ? `<img class="product-card-secondary-img" src="${product.images[1]}" alt="" aria-hidden="true" loading="lazy" style="pointer-events:none;">` : ''}
            </div>
            <div class="product-card-content">
                <span class="product-card-category">${product.category}</span>
                <h3 class="product-card-title view-details-btn" data-id="${product.id}" style="cursor:pointer;">${product.title}</h3>
                <span class="product-card-price">S/. ${product.price.toFixed(2)}</span>
                <div class="product-card-footer">
                    <button class="btn btn-secondary btn-block view-details-btn" data-id="${product.id}">
                        VER DETALLES
                    </button>
                </div>
            </div>
        </article>
    `;
    }).join('');

    // Reasignar eventos a los botones de ver detalles
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openProductDetails(id);
        });
    });

    requestAnimationFrame(updateCatalogNavOnScroll);
}

function renderTrendingProducts() {
    if (!trendingTrack) return;

    const featuredProducts = TRENDING_PRODUCT_IDS
        .map(id => PRODUCTS.find(product => product.id === id))
        .filter(Boolean);

    const renderGroup = isDuplicate => featuredProducts.map((product, productIndex) => `
        <article class="trending-card" ${isDuplicate ? 'aria-hidden="true"' : ''}>
            <button type="button" class="trending-card-image trending-view-details" data-id="${product.id}" aria-label="Ver ${product.title}" ${isDuplicate ? 'tabindex="-1"' : ''}>
                <span class="trending-card-badge">${product.badge}</span>
                <img class="trending-primary-img" src="${product.image}" alt="${isDuplicate ? '' : product.title}" loading="${!isDuplicate && productIndex < 3 ? 'eager' : 'lazy'}" decoding="async" ${!isDuplicate && productIndex < 3 ? 'fetchpriority="high"' : ''}>
                ${product.images?.[1] ? `<img class="trending-secondary-img" src="${product.images[1]}" alt="" aria-hidden="true" loading="lazy">` : ''}
            </button>
            <button type="button" class="trending-card-title trending-view-details" data-id="${product.id}" ${isDuplicate ? 'tabindex="-1"' : ''}>${product.title}</button>
            <span class="trending-card-price">S/. ${product.price.toFixed(2)}</span>
        </article>
    `).join('');

    // Tres copias permiten mantener siempre una pista completa a cada lado.
    // La copia central es la accesible; las laterales son solo continuidad visual.
    trendingTrack.innerHTML = [0, 1, 2].map(groupIndex => `
        <div class="trending-loop-group" data-loop-group="${groupIndex}">
            ${renderGroup(groupIndex !== 1)}
        </div>
    `).join('');

    trendingTrack.querySelectorAll('.trending-view-details').forEach(button => {
        button.addEventListener('click', () => openProductDetails(parseInt(button.dataset.id)));
    });
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

function sendOutfitToWhatsApp() {
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
    let virtualScrollLeft = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let isDragging = false;
    let pauseUntil = 0;
    const speed = 0.085; // 85 px por segundo.

    const normalizePosition = value => {
        if (!groupWidth) return value;
        while (value >= groupWidth * 2) value -= groupWidth;
        while (value < groupWidth) value += groupWidth;
        return value;
    };

    const measureAndCenter = () => {
        const group = trendingTrack.querySelector('.trending-loop-group');
        if (!group) return;

        const previousWidth = groupWidth;
        const previousProgress = previousWidth
            ? (normalizePosition(virtualScrollLeft) - previousWidth) / previousWidth
            : 0;

        groupWidth = group.getBoundingClientRect().width;
        if (!groupWidth) return;

        virtualScrollLeft = groupWidth * (1 + Math.max(0, Math.min(0.999, previousProgress)));
        trendingViewport.scrollLeft = virtualScrollLeft;
    };

    const getScrollStep = () => {
        const card = trendingTrack.querySelector('.trending-card');
        return card ? card.getBoundingClientRect().width + 24 : trendingViewport.clientWidth * 0.8;
    };

    const moveCarousel = direction => {
        pauseUntil = performance.now() + 500;
        trendingViewport.scrollBy({ left: getScrollStep() * direction, behavior: 'smooth' });
    };

    const autoScroll = timestamp => {
        if (!lastFrameTime) lastFrameTime = timestamp;
        const elapsed = Math.min(timestamp - lastFrameTime, 50);
        lastFrameTime = timestamp;

        if (groupWidth) {
            // Velocidad estable en cualquier pantalla; el bucle se normaliza
            // silenciosamente sobre una copia idéntica.
            if (isDragging || timestamp < pauseUntil) {
                virtualScrollLeft = trendingViewport.scrollLeft;
            } else {
                virtualScrollLeft = normalizePosition(virtualScrollLeft + elapsed * speed);
                trendingViewport.scrollLeft = virtualScrollLeft;
            }
        }
        animationFrame = requestAnimationFrame(autoScroll);
    };

    trendingPrevBtn.addEventListener('click', () => moveCarousel(-1));
    trendingNextBtn.addEventListener('click', () => moveCarousel(1));

    trendingViewport.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') moveCarousel(-1);
        if (event.key === 'ArrowRight') moveCarousel(1);
    });

    const endDragging = () => {
        if (!isDragging) return;
        isDragging = false;
        virtualScrollLeft = normalizePosition(trendingViewport.scrollLeft);
        trendingViewport.scrollLeft = virtualScrollLeft;
        lastFrameTime = performance.now();
    };

    trendingViewport.addEventListener('pointerdown', () => { isDragging = true; }, { passive: true });
    trendingViewport.addEventListener('pointerup', endDragging, { passive: true });
    trendingViewport.addEventListener('pointercancel', endDragging, { passive: true });
    // Si el dedo o mouse termina el gesto fuera del carrusel, reanudar igual.
    window.addEventListener('pointerup', endDragging, { passive: true });

    let resizeObserver = null;
    if ('ResizeObserver' in window) {
        resizeObserver = new ResizeObserver(measureAndCenter);
        resizeObserver.observe(trendingViewport);
        resizeObserver.observe(trendingTrack);
    } else {
        window.addEventListener('resize', measureAndCenter, { passive: true });
    }

    measureAndCenter();
    lastFrameTime = performance.now();
    animationFrame = requestAnimationFrame(autoScroll);

    window.addEventListener('pagehide', () => {
        cancelAnimationFrame(animationFrame);
        resizeObserver?.disconnect();
        window.removeEventListener('resize', measureAndCenter);
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
                    <button type="button" class="qty-btn dec-cart-qty" data-index="${index}"><i data-lucide="minus"></i></button>
                    <input type="number" value="${item.qty}" min="1" readonly style="width: 35px;">
                    <button type="button" class="qty-btn inc-cart-qty" data-index="${index}"><i data-lucide="plus"></i></button>
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

// 6. CONTROLADORES DE EVENTO
function setupEventListeners() {
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
    });

    closeCartBtn.addEventListener('click', () => cartDrawer.classList.remove('active'));

    // Navegar y Filtrar por Categoria
    categoryTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            selectedCategory = tag.getAttribute('data-category');
            
            // Sincronizar con desktop nav si aplica
            syncNavLinks(selectedCategory);
            renderProducts();
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navCategory = link.id === 'nav-all'
                ? 'all'
                : Object.keys(CATALOG_CATEGORY_META).find(category => CATALOG_CATEGORY_META[category].navId === link.id);

            if (!navCategory) return;

            searchQuery = '';
            searchInput.value = '';
            syncNavLinks(navCategory);

            if (navCategory === 'all') {
                selectedCategory = 'all';
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

            selectedCategory = 'all';
            setActiveCategoryTag('all');
            renderProducts();
            requestAnimationFrame(() => {
                document.getElementById(`catalog-group-${navCategory}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigateToCatalogCategory(link.dataset.category);
            setMobileMenuOpen(false);
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
        renderProducts();
    });

    // Modal de Detalles
    closeProductModal.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.classList.remove('active');
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
        productModal.classList.remove('active');
        
        // Abrir automáticamente el carrito para dar feedback
        cartDrawer.classList.add('active');
        renderCart();
    });

    // Flujo de Checkout
    goToCheckoutBtn.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        checkoutDrawer.classList.add('active');
        updateCheckoutTotals();
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
        });
    });

    limaReserveCheckbox.addEventListener('change', () => {
        updateCheckoutTotals();
    });

    // Enviar pedido por WhatsApp
    submitOrderBtn.addEventListener('click', () => {
        submitOrder();
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

    selectedCategory = 'all';
    setActiveCategoryTag('all');
    renderProducts();
    requestAnimationFrame(() => {
        document.getElementById(`catalog-group-${navCategory}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
function openProductDetails(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    
    currentProduct = product;
    const images = product.images || [product.image];
    
    // Imagen principal
    modalProductImg.src = images[0];
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
        <img src="${src}" data-idx="${i}" style="width:64px;height:80px;object-fit:cover;border-radius:8px;cursor:pointer;border:2px solid ${i===0?'var(--accent)':'transparent'};opacity:${i===0?'1':'0.6'};transition:all 0.2s;" class="modal-thumb">
    `).join('');
    thumbsContainer.querySelectorAll('.modal-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            modalProductImg.src = thumb.src;
            thumbsContainer.querySelectorAll('.modal-thumb').forEach(t => {
                t.style.border = '2px solid transparent';
                t.style.opacity = '0.6';
            });
            thumb.style.border = '2px solid var(--accent)';
            thumb.style.opacity = '1';
        });
    });
    
    // Resetear valores de talla y cantidad
    modalQtyInput.value = 1;
    modalQtyInput.max = product.stock || '';
    const availableSizes = product.sizes || ['S', 'M', 'L', 'XL'];
    modalSizeContainer.innerHTML = availableSizes.map((size, idx) => `
        <button class="size-btn ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
    `).join('');

    productModal.classList.add('active');
    lucide.createIcons();
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
    
    renderCart();
    return true;
}

function updateCartQty(index, delta) {
    if (cart[index]) {
        const maxStock = cart[index].product.stock || Number.MAX_SAFE_INTEGER;
        cart[index].qty = Math.min(cart[index].qty + delta, maxStock);
        if (cart[index].qty <= 0) {
            removeFromCart(index);
        } else {
            renderCart();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function closeAllDrawers() {
    cartDrawer.classList.remove('active');
    checkoutDrawer.classList.remove('active');
    productModal.classList.remove('active');
}

// 8. FINALIZACIÓN Y ENVÍO A WHATSAPP
function submitOrder() {
    // Validar formulario manualmente
    const name = document.getElementById('checkout-name').value.trim();
    const phone = document.getElementById('checkout-phone').value.trim();
    const city = document.getElementById('checkout-city').value.trim();
    const address = document.getElementById('checkout-address').value.trim();

    if (!name || !phone || !city || !address) {
        alert('Por favor, rellena todos los campos obligatorios (*).');
        return;
    }

    const shippingMethod = document.querySelector('input[name="shipping-method"]:checked').value;
    const reserveLima = limaReserveCheckbox.checked;

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
                    `- *Celular:* ${phone}\n` +
                    `- *Ciudad:* ${city}\n` +
                    `- *Dirección:* ${address}\n\n` +
                    `🛒 *PRODUCTOS DEL PEDIDO:*\n${productsText}\n` +
                    `${paymentDetailText}\n\n` +
                    `💬 *Mensaje:* Hola, me gustaría confirmar mi pedido. Por favor, bríndame los datos de cuenta para realizar el depósito correspondiente.`;

    // Codificar mensaje para URL de WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const shopWhatsappNumber = '51962210278'; // Número de la tienda
    
    const whatsappUrl = `https://wa.me/${shopWhatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp en pestaña nueva
    window.open(whatsappUrl, '_blank');
}
