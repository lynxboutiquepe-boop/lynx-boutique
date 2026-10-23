(function registerLynxProductImages() {
    // Mockups PNG nuevos: se fuerzan como primera imagen también cuando el
    // catálogo se carga desde Supabase (no solo desde catalog-seed.json).
    const newPngMockups = Object.freeze({
        'pearl-wildin-camo-button-up-shirt': 'assets/mockups-finales/pearl-wildin-camo-button-up-shirt-mockup.png',
        'high-stepper-faux-leather-button-up-shirt': 'assets/mockups-finales/high-stepper-faux-leather-button-up-shirt-mockup.png',
        'scarface-the-world-is-yours-rhinestone-hoodie-black': 'assets/mockups-finales/scarface-the-world-is-yours-rhinestone-hoodie-black-mockup.png',
        'stacked-skinny-flare-crosses-upon-crosses-jeweled-jean-light-wash': 'assets/mockups-finales/stacked-skinny-flare-crosses-upon-crosses-jeweled-jean-light-wash-mockup.png',
        'undercover-slim-stacked-flare-jeans-vintage-blue-wash': 'assets/mockups-finales/undercover-slim-stacked-flare-jeans-vintage-blue-wash-mockup.png',
        'electric-sequin-star-denim-trucker-jacket-black-wash': 'assets/mockups-finales/electric-sequin-star-denim-trucker-jacket-black-wash-mockup.png',
        'counting-stars-stacked-slim-flare-jeans-black-wash': 'assets/mockups-finales/counting-stars-stacked-slim-flare-jeans-black-wash-mockup.png',
        'stacked-slim-flare-slashed-down-jean-black-wash': 'assets/mockups-finales/stacked-slim-flare-slashed-down-jean-black-wash-mockup.png',
        'space-jam-toon-squad-paneled-zip-up-hoodie-white': 'assets/mockups-finales/space-jam-toon-squad-paneled-zip-up-hoodie-white-mockup.png',
        'king-faux-leather-moto-bomber-jacket-navy-combo': 'assets/mockups-finales/king-faux-leather-moto-bomber-jacket-navy-combo-mockup.png',
        'stacked-skinny-flare-street-monarch-jeweled-jean-light-wash': 'assets/mockups-finales/stacked-skinny-flare-street-monarch-jeweled-jean-light-wash-mockup.png',
        'see-it-through-bleached-stacked-skinny-flare-jeans-light-wash': 'assets/mockups-finales/see-it-through-bleached-stacked-skinny-flare-jeans-light-wash-mockup.png',
        'about-fray-stacked-skinny-flare-jeans-vintage-blue-wash': 'assets/mockups-finales/about-fray-stacked-skinny-flare-jeans-vintage-blue-wash-mockup.png',
        'chamarra-feelin-a-way-tapestry-zip': 'assets/mockups-finales/chamarra-feelin-a-way-tapestry-zip-mockup.png',
        'retro-rib-wool-varsity-jacket': 'assets/mockups-finales/retro-rib-wool-varsity-jacket-mockup.png',
        'onyx-cognac-zip-up-shirt': 'assets/mockups-finales/onyx-cognac-zip-up-shirt-mockup.png',
        'time-warp-printed-bomber-jacket': 'assets/mockups-finales/time-warp-printed-bomber-jacket-mockup.png',
        'kaleido-bloom-crochet-button-up-shirt': 'assets/mockups-finales/kaleido-bloom-crochet-button-up-shirt-mockup.png',
        'relaxed-washed-abstract-camo-bomber-jacket-camouflage': 'assets/mockups-finales/relaxed-washed-abstract-camo-bomber-jacket-camouflage-mockup.png',
        'both-ways-slim-stacked-flared-pants': 'assets/mockups-finales/both-ways-slim-stacked-flared-pants-mockup.png',
        'stacked-slim-flare-fray-waves-jeans-light-wash': 'assets/mockups-finales/stacked-slim-flare-fray-waves-jeans-light-wash-mockup.png',
        'stacked-skinny-flare-mystic-embroidered-jean-black-wash': 'assets/mockups-finales/stacked-skinny-flare-mystic-embroidered-jean-black-wash-mockup.png',
        'retrofuture-street-bomber-jacket': 'assets/mockups-finales/retrofuture-street-bomber-jacket-mockup.png',
        'tayson-bones-skinny-flare-sweatpants-black': 'assets/mockups-finales/tayson-bones-skinny-flare-sweatpants-black-mockup.png',
        'shadow-panel-button-up-taupe-combo': 'assets/mockups-finales/shadow-panel-button-up-taupe-combo-mockup.png',
        'all-you-need-is-tapestry-trucker-jacket-verde-combinado': 'assets/mockups-finales/all-you-need-is-tapestry-trucker-jacket-verde-combinado-mockup.png',
        'blessed-endless-sweatpant-negro': 'assets/mockups-finales/blessed-endless-sweatpant-negro-mockup.png',
        'burning-bridges-hoodie-azul': 'assets/mockups-finales/burning-bridges-hoodie-azul-mockup.png',
        'cropped-embellished-denim-button-up-shirt-marron': 'assets/mockups-finales/cropped-embellished-denim-button-up-shirt-marron-mockup.png',
        'singleton-short-sleeve-knit-polo-navy': 'assets/mockups-finales/singleton-short-sleeve-knit-polo-navy-mockup.png',
        'heritage-color-blocked-hooded-jacket-negro': 'assets/mockups-finales/heritage-color-blocked-hooded-jacket-negro-mockup.png',
        'baggy-paisley-jacquard-denim-short-deslavado-oscuro': 'assets/mockups-finales/baggy-paisley-jacquard-denim-short-deslavado-oscuro-mockup.png',
        'star-spangled-denim-trucker-jacket-black-wash': 'assets/mockups-finales/star-spangled-denim-trucker-jacket-black-wash-mockup.png',
        'stacked-skinny-flare-fringe-blade-jeans-black-wash': 'assets/mockups-finales/stacked-skinny-flare-fringe-blade-jeans-black-wash-mockup.png',
        'got-me-destroyed-stacked-skinny-flare-jeans-light-blue': 'assets/mockups-finales/got-me-destroyed-stacked-skinny-flare-jeans-light-blue-mockup.png',
        'baggy-lester-cargo-pants-brown': 'assets/mockups-finales/baggy-lester-cargo-pants-brown-mockup.png'
    });

    // Mockups que ya existen en el lote principal. Se fuerzan también para
    // filas antiguas de Supabase que todavía conservan la foto de modelo.
    const legacyPatternSlugs = new Set([
        'stacked-skinny-sun-damage', 'tyson-lost-saints', 'day-to-day-cable-knit', 'carried-cargo-black',
        'be-brave-fearless', 'through-it-ripped', 'simi-fray-cargo',
        'loyalty-royalty-hoodie', 'cornell-slim-flare', 'on-the-set-stacked',
        'get-started-cargo', 'tapestry-hit-jean', 'malcom-x-hoodie',
        'paisley-jacquard-parka', 'phantom-bomber-charcoal', 'sherpa-aviator-brown',
        'contrast-varsity-blue', 'tyson-trust-issues', 'dope-dreams-hoodie',
        'saints-and-sinners-lifecycle-oversized-hoodie', 'dope-dreams-varsity-jacket',
        'faux-suede-embroidered-blossom-bomber-jacket', 'ghost-distressed-printed-denim-jacket',
        'saints-rhinestones-sweatpants', 'stacked-skinny-flare-be-brave-be-fearless-embridered-jean',
        'about-fray-stacked-skinny-flare-jeans-black-wash', 'move-up-plaid-shacket',
        'oversized-corduroy-hooded-bomber-jacket', 'pearl-wildin-camo-cargo-baggy-pants',
        'baggy-ghost-distressed-printed-jean', 'saints-rhinestones-oversized-hoodie',
        'about-fray-stacked-skinny-flare-jeans-light-wash', 'stacked-skinny-flare-frayed-along-panel-jean',
        'straight-flare-static-drip-jeweled-jean', 'padded-hooded-faux-trim-iced-out-parka',
        'cowboys-monster-oversized-zip-up-hoodie', 'heartbreakers-players-club-skinny-flare-sweatpants-black',
        'unknown-fate-flared-sweatpants-black', 'all-around-fray-stacked-skinny-flare-pants-brown-combo',
        'bold-flock-hoodie-black', 'look-at-me-stacked-skinny-jeans-vintage-blue-wash',
        'lakers-wavey-oversized-zip-hoodie-purple', 'lakers-wavey-wide-sweatpants-purple',
        'tumble-slim-flare-jeans-light-blue-wash', 'contrast-skinny-stacked-flared-cargo-pants-camouflage',
        'textured-cable-knit-cabin-puffer-jacket-yellow', 'in-the-cut-camo-sweatpants-grey-combo',
        'in-the-cut-camo-zip-up-hoodie-grey-combo', 'tyson-die-rich-quarter-zip-sweatshirt-black-wash',
        'antisocial-rhinestone-pearl-oversized-hoodie-navy', 'cropped-utility-corduroy-collar-work-jacket-olive',
        'relaxed-96-faux-pebble-leather-varsity-jacket-navy', 'rosa-parks-nah-embroidered-hoodie-black',
        'heartbreakers-players-club-hoodie-black', 'nyc-all-star-hoodie-powder-blue',
        'skeleton-stars-embroidered-oversized-hoodie-black',
        'cropped-paisley-jacquard-denim-work-jacket-dark-wash'
    ]);

    const legacyMockupExceptions = Object.freeze({
        '49ers-monster-oversized-zip-up-hoodie-red': 'mockups-finales/11-11-25_S8_5_JZML095FSFFS_Red_AB_DJ_09-51-32_98672_PXF-mockup.webp',
        'cropped-moto-black': 'mockups-finales/cropped-moto-black-3-mockup.webp',
        'bulls-campus-zip': 'mockups-finales/bulls-campus-zip-6-mockup.webp',
        'cropped-coated-padded-faux-leather-bomber-jacket': 'mockups-finales/cropped-coated-padded-faux-leather-bomber-jacket-3-mockup.webp'
    });

    const mockupSlugs = new Set([
        'cassiel-tapestry-cropped-button-up-shirt-multi-color',
        'paisley-flock-hoodie-black',
        'cropped-high-stepper-faux-leather-button-up-shirt-dark-grey',
        'lakers-loud-crewneck-sweatshirt-purple',
        'relaxed-sunset-fever-faux-leather-polo-black',
        'stacked-skinny-flare-frayed-along-panel-jean-black-wash',
        'rebellion-cross-applique-zip-up-hoodie-light-blue',
        'rush-home-denim-cargo-shorts-light-blue-wash',
        'tyson-chaos-oversized-zip-hoodie-black',
        'pablo-picasso-colorblock-varsity-jacket-pink-combo',
        'city-of-dreams-all-over-printed-bomber-jacket-black-white',
        'embroidery-fleur-oversized-cropped-fleece-jacket-cream',
        'la-patchwork-varsity-jacket-royal-combo',
        'in-bloom-printed-bomber-jacket-black',
        'ditson-tapestry-varsity-jacket-red-combo',
        'kings-canyon-padded-trucker-jacket-multi-color',
        'lets-go-fray-cargo-skinny-flare-jeans-light-wash',
        'zip-it-faux-leather-slim-cargo-pants-black',
        'fray-all-ways-stacked-skinny-flare-jeans-light-blue',
        'ruthless-embroidered-stacked-skinny-cargo-flare-jeans-medium-wash',
        'kaine-stacked-slim-flare-jeans-black-wash',
        'stacked-skinny-flare-jeweled-sky-rays-jean-light-blue-wash',
        'harvy-straight-pants-camouflage',
        'saint-embroidered-short-sleeve-button-up-off-white',
        'oversized-desert-vibe-polo-shirt-grey',
        'tyson-curated-oversized-hoodie-black-wash',
        'ryan-interlock-bomber-jacket-taupe',
        'paneled-utility-bomber-jacket-taupe',
        'lido-isle-crochet-button-up-shirt-cream',
        'lions-monster-oversized-zip-up-hoodie-light-blue',
        'stacked-skinny-flare-with-camo-hit-jean-grey',
        'tyson-stars-skinny-flared-sweatpants-heather-grey',
        'tyson-number-3-skinny-flare-sweatpants-black-combo',
        'cornell-slim-flare-jeans-light-wash'
    ]);

    function mockupFor(slug = '') {
        const normalized = String(slug).trim().toLowerCase();
        if (newPngMockups[normalized]) return newPngMockups[normalized];
        const legacyMockup = window.LynxLegacyProductMockups?.[normalized];
        if (legacyMockup) return legacyMockup;
        if (legacyMockupExceptions[normalized]) return legacyMockupExceptions[normalized];
        if (legacyPatternSlugs.has(normalized)) return `mockups-finales/${normalized}-1-mockup.webp`;
        return mockupSlugs.has(normalized)
            ? `mockups-agosto-22-finales/${normalized}-mockup.webp`
            : '';
    }

    function withMockup(slug, images = []) {
        const originals = Array.isArray(images) ? images.filter(Boolean) : [];
        const mockup = mockupFor(slug);
        if (!mockup) return originals;
        const normalizedMockup = mockup.replace(/^\//, '');
        const mockupFamily = normalizedMockup.replace(/\.(?:png|webp)$/i, '');
        const isSameMockupFamily = image => {
            const normalizedImage = String(image).replace(/^\//, '');
            return normalizedImage === normalizedMockup
                || normalizedImage.replace(/\.(?:png|webp)$/i, '') === mockupFamily;
        };
        return [mockup, ...originals.filter(image => !isSameMockupFamily(image))];
    }

    window.LynxProductImages = Object.freeze({ mockupFor, withMockup });
}());
