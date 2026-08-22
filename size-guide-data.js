(function () {
    const sourceUrl = 'https://www.fashionnova.com/pages/size-guide?tab=men';

    const guides = {
        tops: {
            label: 'Tops, hoodies y jackets',
            intro: 'Referencia corporal para hombre. Mide el contorno del pecho sin apretar la cinta. Si la prenda es oversized, elige tu talla habitual para conservar el fit diseñado.',
            columns: [
                { key: 'size', label: 'Talla' },
                { key: 'top', label: 'Top' },
                { key: 'chest', label: 'Pecho' }
            ],
            rows: [
                { size: 'S', top: { in: '34–36', cm: '86.4–91.4' }, chest: { in: '35–37', cm: '88.9–94' } },
                { size: 'M', top: { in: '38–40', cm: '96.5–101.5' }, chest: { in: '38–40', cm: '96.5–101.5' } },
                { size: 'L', top: { in: '42', cm: '106.7' }, chest: { in: '42–44', cm: '106.7–111.7' } },
                { size: 'XL', top: { in: '46', cm: '116.8' }, chest: { in: '46–48', cm: '116.8–121.9' } },
                { size: 'XXL', top: { in: '48', cm: '121.9' }, chest: { in: '50–52', cm: '127–132' } },
                { size: 'XXXL', top: { in: '50', cm: '127' }, chest: { in: '54–56', cm: '137.1–142.2' } }
            ]
        },
        bottoms: {
            label: 'Jeans y pants',
            intro: 'Referencia corporal para hombre. La talla Bottom US corresponde a la cintura nominal; Seat/Low se mide alrededor de la parte más ancha de la cadera.',
            columns: [
                { key: 'size', label: 'Talla' },
                { key: 'bottom', label: 'Bottom' },
                { key: 'seat', label: 'Cadera' },
                { key: 'inseam', label: 'Entrepierna' }
            ],
            rows: [
                { size: 'S', bottom: { in: '28–30', cm: '71.1–76.2' }, seat: { in: '35–36', cm: '88.9–91.4' }, inseam: { in: '32', cm: '81.3' } },
                { size: 'M', bottom: { in: '32–34', cm: '81.2–86.3' }, seat: { in: '36–40', cm: '91.4–101.6' }, inseam: { in: '32', cm: '81.3' } },
                { size: 'L', bottom: { in: '36–38', cm: '91.4–96.5' }, seat: { in: '40–44', cm: '106.7–111.7' }, inseam: { in: '32', cm: '81.3' } },
                { size: 'XL', bottom: { in: '38–40', cm: '96.5–101.6' }, seat: { in: '44–47', cm: '111.7–119.4' }, inseam: { in: '32', cm: '81.3' } },
                { size: 'XXL', bottom: { in: '42–44', cm: '106.7–111.7' }, seat: { in: '47–49', cm: '119.4–124.4' }, inseam: { in: '32', cm: '81.3' } },
                { size: 'XXXL', bottom: { in: '46–48', cm: '116.8–121.9' }, seat: { in: '49–51', cm: '124.4–129.5' }, inseam: { in: '32', cm: '81.3' } }
            ]
        }
    };

    function valueForUnit(value, unit) {
        if (value && typeof value === 'object') return value[unit] ?? value.cm ?? value.in ?? '—';
        return value ?? '—';
    }

    window.LynxSizeGuide = { sourceUrl, guides, valueForUnit };
}());
