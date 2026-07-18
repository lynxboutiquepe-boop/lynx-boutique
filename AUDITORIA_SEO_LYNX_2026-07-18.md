# Auditoría SEO de LYNX Boutique

Fecha: 18 de julio de 2026  
Sitio auditado: https://lynx-boutique.vercel.app/  
Alcance: SEO técnico, arquitectura, contenido, ecommerce, rendimiento, competencia, medición y visibilidad en buscadores/IA.

## Resumen ejecutivo

LYNX tiene un catálogo visualmente sólido, URLs legibles y 52 productos con títulos únicos, pero actualmente su capacidad de captar tráfico orgánico es muy baja. En una comprobación pública no aparecieron resultados indexados para el dominio ni para sus fichas. Esto no sustituye Search Console, pero es una señal crítica.

El principal bloqueo es técnico: el catálogo y las fichas se construyen en el navegador mediante JavaScript y Supabase. El HTML inicial de todas las fichas contiene el título genérico `Prenda | LYNX`, una descripción genérica y ningún dato estructurado. Tampoco existen `sitemap.xml`, `robots.txt`, etiquetas canonical, Open Graph o páginas de categoría indexables. Google puede renderizar JavaScript, pero el rastreo, renderizado e indexación se vuelven más lentos y menos fiables; para ecommerce, Google recomienda incluir los datos de producto en el HTML inicial.

Prioridad global: **crítica / P0**. Antes de crear artículos o buscar backlinks, LYNX debe convertir cada producto y categoría en una página rastreable con contenido SEO entregado desde el servidor o generado estáticamente.

## Línea base encontrada

| Área | Estado actual | Evaluación |
|---|---|---|
| Visibilidad pública | No se encontraron resultados del dominio en búsquedas `site:` ni por marca | Crítico |
| Productos | 52 fichas; 28 hoodies/jackets y 24 jeans/pants | Buena base comercial |
| Slugs | 52 slugs presentes y sin duplicados | Correcto |
| Descripciones | Promedio aproximado de 125 caracteres; 18 tienen menos de 120 | Mejorable |
| Categorías indexables | No existen rutas dedicadas; T-shirts y Conjuntos están vacías | Crítico |
| HTML de producto | Contenido, precio, disponibilidad y título llegan por JavaScript | Crítico |
| Sitemap XML | No existe | Crítico |
| Robots.txt | No existe en el proyecto | Alto |
| Canonical | No implementado | Alto |
| Product schema | No implementado | Crítico |
| Open Graph / X cards | No implementado | Alto |
| Página admin | Tiene `noindex, nofollow, noarchive` | Correcto |
| Imágenes | 355 archivos, aproximadamente 195 MB; varias portadas PNG pesan 3–4 MB | Crítico para móvil/LCP |
| Hero | PNG principal de aproximadamente 1.87 MB | Alto |
| CSS + JS principal | Aproximadamente 215 KB sin minificar | Medio |
| Semántica | H1 único en portada, H1 dinámico en producto, headings, alt y navegación accesible | Positivo |
| Confianza | FAQ, reseñas, contacto y redes presentes | Positivo |

## Hallazgos técnicos prioritarios

### P0 — Bloquean indexación y crecimiento

1. **Renderizar fichas con contenido real en el HTML inicial.**
   - Cada `/producto/{slug}` debe responder con título, descripción, precio, stock, imagen, H1 y enlaces internos sin depender de que Google ejecute JavaScript.
   - Alternativas válidas: generación estática durante el despliegue, función serverless que renderice desde Supabase o migración a un framework con SSR/SSG.
   - Mantener la interacción del carrito en JavaScript, pero no el contenido SEO esencial.

2. **Crear `sitemap.xml` dinámico o generado en cada despliegue.**
   - Debe incluir portada, categorías, políticas, FAQ y los 52 productos activos.
   - Excluir `/admin`, páginas archivadas y URLs con parámetros de carrito.
   - Enviar el sitemap a Google Search Console y Bing Webmaster Tools.

3. **Crear `robots.txt`.**
   - Permitir rastreo de portada, assets, categorías y productos.
   - Bloquear `/admin` y rutas internas que no aporten a búsqueda.
   - Declarar `Sitemap: https://dominio/sitemap.xml`.

4. **Metadatos únicos y canonical por URL.**
   - Portada: orientar a `streetwear premium en Perú` y propuesta de valor real.
   - Producto: `{nombre de prenda} | LYNX Boutique Perú`.
   - Descripción: 140–160 caracteres con tipo, color, talla/stock, envío y marca cuando corresponda.
   - Canonical absoluto para evitar duplicados entre parámetros, rutas antiguas y URLs de compra.

5. **Implementar JSON-LD de ecommerce en el HTML inicial.**
   - `Product`: nombre, imágenes, descripción, SKU, marca, color, material y talla cuando existan.
   - `Offer`: URL, precio, `PEN`, disponibilidad y condición nueva.
   - `AggregateRating` y `Review` únicamente con reseñas reales publicadas y visibles.
   - `Organization`/`OnlineStore`: logo, contacto, Instagram, TikTok, política de envíos y devoluciones.
   - `BreadcrumbList` en categorías y productos.

6. **Reducir peso de imágenes.**
   - Convertir portadas PNG a AVIF/WebP conservando PNG solo cuando la transparencia sea necesaria.
   - Objetivo orientativo: portada de producto entre 100 y 250 KB; hero móvil por debajo de 300 KB.
   - Generar tamaños responsivos con `srcset` y `sizes` para 320, 480, 768 y 1200 px.
   - Precargar solo el LCP real; mantener lazy loading para imágenes fuera de la primera vista.

### P1 — Aumentan relevancia y CTR

1. Crear páginas indexables:
   - `/streetwear-peru/`
   - `/hoodies-hombre/`
   - `/casacas-y-jackets/`
   - `/jeans-hombre/`
   - `/jeans-baggy-y-flare/`
   - `/preventa/` cuando existan productos activos.

2. Añadir 250–500 palabras útiles por categoría: estilos, calce, materiales, tallas, entregas y preguntas frecuentes específicas. Evitar texto genérico o repetido.

3. Mejorar descripciones de producto. La mayoría describe aspecto y talla, pero falta material, calce, cuidados, medidas, ocasión de uso, procedencia y política de cambios. Priorizar primero los 15 productos con mayor margen o demanda.

4. Añadir breadcrumbs visibles y enlaces relacionados: `Combínalo con`, `Productos similares`, categoría y productos vistos recientemente.

5. Implementar Open Graph y Twitter Cards para que WhatsApp, Instagram, Facebook y otras plataformas muestren nombre, precio e imagen correctos al compartir cada producto.

6. Crear páginas de confianza indexables: envíos, cambios/devoluciones, guía de tallas, contacto y acerca de LYNX. Esto mejora conversión y señales de fiabilidad.

### P2 — Escalamiento

1. Google Merchant Center con feed sincronizado desde Supabase y listados gratuitos.
2. Estrategia editorial y enlaces naturales.
3. Automatización de monitoreo de stock, errores 404, metadatos y datos estructurados.
4. `llms.txt` como documento complementario después de resolver indexación, HTML y schema; no sustituye sitemap ni SEO técnico.

## Investigación inicial de palabras clave

No hay acceso a Google Search Console, Keyword Planner, Ahrefs o Semrush, por lo que no se asignan volúmenes inventados. La validación de volumen, dificultad y posición debe hacerse con esas fuentes. La búsqueda pública muestra competencia activa para ropa urbana y streetwear en Perú.

### Clúster 1 — Marca y categoría principal

- lynx boutique perú
- lynx streetwear
- streetwear perú
- tienda streetwear perú
- ropa urbana hombre perú
- ropa streetwear lima
- streetwear premium perú

Intención: comercial/navegacional.  
Destino: portada y landing `/streetwear-peru/`.

### Clúster 2 — Hoodies y casacas

- hoodies hombre perú
- hoodie oversized hombre perú
- poleras oversized lima
- casacas streetwear hombre
- varsity jacket perú
- bomber jacket hombre perú
- hoodie con cierre hombre

Intención: transaccional.  
Destino: categorías y productos.

### Clúster 3 — Jeans y pantalones

- jeans baggy hombre perú
- jeans flare hombre perú
- jeans stacked hombre
- pantalones cargo hombre perú
- jeans streetwear hombre
- pantalón camuflado hombre

Intención: transaccional.  
Destino: categoría de jeans y subcategorías.

### Clúster 4 — Marca/importación

- fashion nova men perú
- fashion nova hombre perú
- ropa fashion nova original perú
- jeans fashion nova hombre

Intención: transaccional con alta sensibilidad a autenticidad.  
Destino: landing explicativa solo si LYNX puede demostrar procedencia y uso autorizado de marca.

### Clúster 5 — Preguntas y long tail

- cómo elegir talla de jeans fashion nova hombre
- diferencia entre jeans baggy flare y stacked
- cómo combinar hoodie oversized hombre
- qué talla de hoodie oversized comprar
- dónde comprar streetwear original en lima
- cuánto demora un envío de ropa a provincias perú

Intención: informacional/comercial.  
Destino: guía de tallas, FAQ y artículos.

## Competidores observados

| Competidor | Ventaja visible | Oportunidad para LYNX |
|---|---|---|
| DOPS Perú | Mensaje local fuerte, materiales, drops, showroom y contenido rastreable | Diferenciarse por curaduría importada, stock real y entrega nacional |
| HTNF | Amplio catálogo, títulos de producto y estructura ecommerce madura | Ganar en nichos de Fashion Nova Men, flare/stacked y atención personalizada |
| Bullet Co. | Historia de marca, fabricación local, materiales y lotes pequeños | Reforzar autenticidad, selección y prueba social |
| BUYANDSELL | Orientación a búsquedas de marcas y stock limitado | Crear landings por marca/categoría con evidencia de originalidad |
| The Kraniet / AKA Perú | Categorías claras, lenguaje local y contenido comercial | Construir páginas específicas para Lima y envíos a provincias |

La oportunidad de LYNX no está en competir por `ropa` de forma genérica. Debe dominar combinaciones de alta intención: producto + estilo + hombre + Perú/Lima + disponibilidad.

## Estrategia de contenido

Primeras piezas recomendadas:

1. Guía de tallas Fashion Nova Men para Perú.
2. Jeans stacked, flare y baggy: diferencias y cómo elegir.
3. Cómo combinar hoodies oversized sin perder proporción.
4. Streetwear para invierno en Lima: hoodies, bombers y parkas.
5. Cómo reconocer una prenda original y cuidar sus estampados.
6. Envíos de LYNX a provincias: tiempos, pagos y seguimiento.
7. Looks completos con hoodie + jacket + jean.
8. Calendario de drops, preventas y reposiciones.

Cada contenido debe enlazar a categorías y productos disponibles, incluir fotos originales, autor/fecha y experiencia real. El objetivo no es publicar volumen, sino responder mejor que la competencia y convertir la visita.

## Estrategia ética de enlaces

- Perfiles de negocio y moda local con nombre, dirección/área de servicio y contacto consistentes.
- Colaboraciones editoriales con creadores de streetwear peruanos y sesiones de outfit reales.
- Inclusión en guías de marcas/tiendas de Lima sin compra masiva de enlaces.
- Contenido conjunto con fotógrafos, barberías, estudios creativos, artistas y eventos urbanos.
- Enlaces desde TikTok, Instagram, YouTube y perfiles sociales hacia landings relevantes, no siempre a la portada.
- Evitar paquetes de backlinks, PBN, comentarios automatizados y textos ancla repetitivos.

## Visibilidad en buscadores de IA

1. Entregar contenido esencial en HTML y datos estructurados consistentes.
2. Mantener accesibles GPTBot, ClaudeBot, PerplexityBot y Google-Extended salvo decisión comercial explícita de bloqueo.
3. Publicar respuestas directas y verificables a preguntas de talla, stock, envío, cambios y autenticidad.
4. Añadir una página `Acerca de LYNX` con identidad, ubicación/mercado, contacto y propuesta de valor.
5. Crear `llms.txt` con URLs canónicas prioritarias, categorías, políticas y contacto después de lanzar sitemap y schema.
6. No crear contenido separado o distinto para bots; mantener una única versión útil para personas y rastreadores.

## Medición y panel de control

### Configuración mínima

- Google Search Console: propiedad de dominio, sitemap, inspección de URLs y reportes de rich results.
- GA4: adquisición, navegación de catálogo, vistas de producto y conversión.
- Google Merchant Center: feed, diagnósticos y clics gratuitos.
- Looker Studio: tablero mensual combinado de Search Console + GA4.
- Microsoft Clarity o alternativa equivalente, con revisión de privacidad, para detectar fricción móvil.

### Eventos de ecommerce recomendados

- `view_item_list`
- `select_item`
- `view_item`
- `add_to_cart`
- `view_cart`
- `begin_checkout`
- `generate_lead` o `purchase` según cómo se confirme la venta por WhatsApp
- `sign_up`
- `login`
- clic en WhatsApp, Instagram y TikTok

### KPI de referencia

No se debe prometer un porcentaje de crecimiento sin una línea base. Durante los primeros 28 días se establecerán:

- URLs válidas indexadas / URLs enviadas.
- Impresiones, clics, CTR y posición por clúster.
- Sesiones orgánicas y usuarios nuevos.
- Vistas de producto por sesión.
- Añadidos al carrito y pedidos iniciados desde orgánico.
- Conversión de registro y pedido.
- LCP, INP y CLS en el percentil 75, separados por móvil y escritorio.
- Errores de Merchant Listings, Product snippets y rastreo.

Objetivos técnicos: LCP ≤ 2.5 s, INP ≤ 200 ms y CLS ≤ 0.1 en al menos el 75 % de las visitas.

## Hoja de ruta 30/60/90 días

### Días 1–14

- Configurar Search Console, GA4 y Merchant Center.
- Implementar renderizado SEO de productos.
- Publicar robots, sitemap, canonical y metadatos únicos.
- Añadir Product/Offer, Organization y Breadcrumb schema.
- Convertir y redimensionar las imágenes principales.
- Solicitar indexación de portada, categorías y 10 productos prioritarios.

### Días 15–30

- Crear categorías indexables y políticas de confianza.
- Optimizar los 15 productos prioritarios.
- Corregir errores de cobertura y rich results.
- Crear feed de productos y activar listados gratuitos.
- Medir Core Web Vitals y conversión móvil.

### Días 31–60

- Publicar cuatro contenidos long-tail.
- Añadir enlaces internos y productos relacionados.
- Obtener primeras colaboraciones/enlaces locales.
- Optimizar títulos y descripciones según consultas reales de Search Console.

### Días 61–90

- Ampliar optimización a las 52 fichas.
- Publicar cuatro contenidos adicionales.
- Revisar canibalización, stock agotado, redirecciones y productos archivados.
- Evaluar nuevas subcategorías según impresiones y ventas.
- Documentar crecimiento y priorizar el siguiente trimestre.

## Criterios de aceptación de la implementación

- Cada ficha devuelve en el HTML inicial su H1, precio, disponibilidad, descripción e imagen.
- Cada URL tiene title, description, canonical y Open Graph únicos.
- `sitemap.xml` incluye solo URLs canónicas con estado 200.
- `/admin` y procesos internos siguen fuera del índice.
- Rich Results Test valida Product/Offer sin errores críticos.
- Las 10 fichas prioritarias aparecen como válidas en Search Console.
- Ninguna imagen LCP supera el presupuesto definido.
- Los eventos de ecommerce llegan a GA4 con parámetros de producto y valor.

## Limitaciones de esta auditoría

No se proporcionó acceso a Google Search Console, GA4, Merchant Center, Ahrefs/Semrush ni datos de ventas. Por ello, rankings, volúmenes, autoridad, backlinks, CTR y conversiones no pueden medirse todavía. La ausencia observada en búsquedas públicas es una señal, no un sustituto del informe de cobertura de Search Console.

## Fuentes de referencia

- Google Search Central — Product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Google Search Central — Merchant listings: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Google Search Central — JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Search Central — Ecommerce SEO: https://developers.google.com/search/docs/specialty/ecommerce
- web.dev — Core Web Vitals: https://web.dev/articles/vitals

