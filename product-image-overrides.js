(function registerLynxProductImages() {
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
        return mockupSlugs.has(normalized)
            ? `mockups-agosto-22-finales/${normalized}-mockup.webp`
            : '';
    }

    function withMockup(slug, images = []) {
        const originals = Array.isArray(images) ? images.filter(Boolean) : [];
        const mockup = mockupFor(slug);
        if (!mockup) return originals;
        const normalizedMockup = mockup.replace(/^\//, '');
        return [mockup, ...originals.filter(image => String(image).replace(/^\//, '') !== normalizedMockup)];
    }

    window.LynxProductImages = Object.freeze({ mockupFor, withMockup });
}());
