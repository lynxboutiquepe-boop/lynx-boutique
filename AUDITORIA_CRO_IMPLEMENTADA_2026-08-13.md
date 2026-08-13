# Auditoría CRO y UX implementada — LYNX.PE

**Fecha:** 13 de agosto de 2026  
**Alcance:** Home, catálogo/colecciones, ficha de producto, carrito, pedido por WhatsApp y panel administrativo.  
**Criterio:** priorizar claridad, confianza, móvil y reducción de dudas antes del pago.

## Resumen ejecutivo

La tienda ya comunica mejor qué vende, para quién y por qué comprar en LYNX. El catálogo puede buscarse, filtrarse y ordenarse; las fichas explican fit, material, color, cuidado y tallas; el carrito valida los datos sin mensajes bruscos; y el panel incorpora un embudo de conversión sin guardar datos personales en los eventos.

Los resultados históricos de conversión no pueden inventarse: la medición comienza cuando se ejecute `supabase/cro_product_upgrade.sql` y se publique esta versión. La comparación correcta será 14 días antes vs. 14 días después, separando móvil y escritorio.

## Home

| Elemento / Ubicación | Problema o Falla Detectada | Impacto | Solución Exacta / Texto Corregido |
| :--- | :--- | :---: | :--- |
| Portada principal | “Streetwear premium” no explicaba surtido, público ni ventaja | Alto | Implementado: **“Piezas que no ves en todos”** + “Hoodies oversized, jackets y jeans flare seleccionados de Fashion Nova. Pocas unidades, asesoría de talla y envíos seguros a todo el Perú.” |
| CTA del héroe | Mensaje genérico y poca reducción de riesgo | Alto | Implementado: **“Ver prendas disponibles”** y prueba de confianza “Confirmamos stock y talla antes de solicitar el pago”. |
| Portada en móvil/PC | Riesgo de recorte y desbordamiento | Alto | Altura y tipografía responsivas; imagen móvil dedicada; comprobado a 390×844 y 1440×900 sin desplazamiento horizontal. |
| Navegación principal | Categorías sin contexto para regresar o filtrar | Medio | Navegación y etiquetas sincronizadas con catálogo y categorías. |
| Catálogo largo | Exceso de productos en Home | Medio | Implementado: máximo 6 por categoría y botón **Ver más Hoodies / Jeans / Conjuntos**. |
| Redes sociales | Iconos dependían de un servidor externo y fallaban en algunos equipos | Medio | Instagram, TikTok y WhatsApp ahora usan archivos SVG locales. |
| Animación | Elementos podían sentirse estáticos o bruscos | Medio | Revelado progresivo, microinteracciones y respeto de `prefers-reduced-motion`. |
| Confianza | Condiciones de envío dispersas | Alto | Franja y FAQs con Lima, Shalom, reserva, stock y asistencia de talla. |

## Colecciones / Catálogo

| Elemento / Ubicación | Problema o Falla Detectada | Impacto | Solución Exacta / Texto Corregido |
| :--- | :--- | :---: | :--- |
| Búsqueda | No era suficientemente explícita | Alto | Campo tipo búsqueda: **“Buscar por nombre, color o estilo”**. |
| Filtros | Faltaba separar lo agotado | Alto | Checkbox **“Solo disponibles”** y filtros por categoría. |
| Orden | No había orden comercial | Medio | Agregados: destacados, más recientes, menor precio y mayor precio. |
| Tarjetas | Nombre y precio tenían poca jerarquía | Alto | Mayor presencia visual y CTA directo **“Agregar al carrito”**. |
| Imágenes | Una ruta borrada dejaba un espacio vacío | Alto | Fallback local, WebP para mockups y comprobación de imágenes referenciadas. |
| Stock | Productos agotados podían generar expectativa errónea | Alto | Estado **AGOTADO**, botón deshabilitado y filtro de disponibles. |
| Rendimiento | Mockups críticos pesados | Alto | 4 imágenes críticas procesadas localmente pasaron de 9.7 MB a 0.3 MB; tarjetas usan WebP y dimensiones declaradas. Los originales se conservaron como respaldo. |

## Ficha de producto

| Elemento / Ubicación | Problema o Falla Detectada | Impacto | Solución Exacta / Texto Corregido |
| :--- | :--- | :---: | :--- |
| Descripción | Texto técnico sin traducir el beneficio | Alto | Bloque **“Por qué te va a gustar”** adaptado a jeans, conjuntos, oversized y piezas protagonistas. |
| Especificaciones | Faltaban color, material, fit, cuidado y peso | Alto | Nueva cuadrícula técnica y campos editables desde Admin. |
| Guía de tallas | Recomendación fija de subir 1–2 tallas podía causar devoluciones | Alto | Eliminada. Nueva regla: comparar cintura/cadera; si queda entre tallas, elegir la mayor y confirmar por WhatsApp. |
| Medidas reales | No se podían registrar por modelo/talla | Alto | Nueva tabla por producto. En Admin se escribe fácil: `M: pecho=108, largo=70`. |
| Variantes | Selección de talla poco explicativa | Medio | Talla activa visible, nota de selección y cantidad limitada al stock. |
| Confianza | Políticas lejos del CTA | Alto | Envíos, reserva/pagos y cambios aparecen debajo de compra. |
| CTA | No explicaba el siguiente paso | Alto | **“Comprar · completar entrega”** y aviso: no se cobra automáticamente; stock y total se confirman por WhatsApp. |
| SEO | Fichas dependían demasiado de JavaScript | Alto | 63 fichas estáticas con Product schema, metadatos, canonical, copy y fotos locales; 68 URLs validadas en sitemap. |

## Carrito y Checkout por WhatsApp

| Elemento / Ubicación | Problema o Falla Detectada | Impacto | Solución Exacta / Texto Corregido |
| :--- | :--- | :---: | :--- |
| Flujo | El cliente no sabía en qué paso estaba | Alto | Indicador: **1 Carrito → 2 Entrega → 3 Confirmación**. |
| Campos | Errores mediante alertas y datos incompletos | Alto | Validación junto a nombre, WhatsApp, ciudad y dirección; autocompletado móvil. |
| Envío | Posible confusión entre Lima y provincias | Alto | Motorizado Lima vs. Shalom; el flete de Shalom se informa como pago en agencia. |
| Reserva | La separación con S/ 50 podía confundirse con pago final | Alto | Explicación del saldo y del método antes de generar el mensaje. |
| Cupón | No había lugar para copiar el descuento enviado por correo | Medio | Campo opcional de código incluido en el resumen de WhatsApp. |
| CTA final | Podía parecer un cobro inmediato | Alto | **“Revisar pedido en WhatsApp”** + “todavía no se realiza ningún pago”. |
| Compatibilidad móvil | `window.open` puede ser bloqueado | Alto | Navegación directa a WhatsApp después de la validación. |

## Dirección de arte: estándar obligatorio

| Recurso | Medida maestra | Relación | Formato / peso objetivo |
| :--- | :---: | :---: | :--- |
| Héroe escritorio | 1920×960 px | 2:1 | WebP, ideal ≤ 250 KB |
| Héroe móvil | 1080×1350 px | 4:5 | WebP, ideal ≤ 180 KB |
| Producto catálogo | 1200×1600 px | 3:4 | WebP, ideal ≤ 180 KB |
| Miniatura | 360×480 px | 3:4 | WebP, ideal ≤ 40 KB |
| Foto de detalle | 1200×1200 px | 1:1 | WebP, ideal ≤ 150 KB |
| Video corto de prenda | 1080×1920 px | 9:16 | MP4 H.264, 6–12 s, sin texto crítico en bordes |

Cada ficha debe aspirar a: portada limpia, frente, espalda, detalle de textura/bordado, prenda puesta, referencia de talla del modelo y video corto de movimiento. No mezclar temperaturas de color ni fondos distintos dentro de la misma primera fila.

## Medición y criterio de éxito

Eventos preparados: vista de página, catálogo, búsqueda, ficha, selección, agregar al carrito, ver carrito, comenzar pedido, seleccionar envío, lead por WhatsApp y registro/verificación del descuento. El panel Admin muestra el embudo de los últimos 30 días y dispositivo.

Revisar semanalmente:

1. Ficha → carrito.
2. Carrito → formulario.
3. Formulario → WhatsApp.
4. Conversión móvil vs. escritorio.
5. Búsquedas sin resultado.
6. Productos con muchas vistas pero pocos carritos.

No usar falsos contadores, falsas ventas recientes ni temporizadores. La escasez solo debe mostrarse con el stock real.

## Paso técnico pendiente antes de publicar

En Supabase, abrir **SQL Editor**, pegar todo el contenido de `supabase/cro_product_upgrade.sql` y pulsar **Run**. Esto activa los campos técnicos y el embudo. La tienda mantiene compatibilidad con la base anterior hasta ejecutar ese paso.
