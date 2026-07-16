# Documentación LYNX Boutique

**Última actualización:** 15 de julio de 2026  
**Proyecto:** LYNX | Premium Streetwear Co.  
**Carpeta local:** `C:\Users\Lynx\Documents\LYNX BOUTIQUE WEB\whatsapp-clothing-store`

## Estado actual

- La web está publicada en Vercel.
- URL temporal de producción: <https://lynx-boutique.vercel.app>
- Proyecto de Vercel: `lynx-boutique`
- El dominio personalizado añadido en Vercel es `lynx.pe`.
- `www.lynx.pe` también está añadido y configurado para apuntar a producción.
- En la última revisión, ambos dominios personalizados mostraban **Invalid Configuration** porque todavía faltaba configurar el DNS en Punto.pe.

## Conectar el dominio lynx.pe

En la administración DNS de Punto.pe, crear o corregir estos registros:

| Tipo | Host / Nombre | Valor |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns-0.com` |

Importante:

- No escribir `https://` en los campos DNS.
- No eliminar registros `MX` ni `TXT` si se utiliza correo electrónico del dominio.
- Si ya existe otro registro A para `@`, puede entrar en conflicto; debe quedar el registro que indique Vercel.
- Después de guardar, volver a Vercel → proyecto `lynx-boutique` → **Settings → Domains** y pulsar **Refresh**.
- La propagación DNS puede tardar desde unos minutos hasta 24 horas.

## Cómo actualizar la web

Actualmente la publicación se hizo subiendo la carpeta manualmente a Vercel.

1. Editar los archivos dentro de la carpeta del proyecto.
2. Probar localmente abriendo `index.html`.
3. En Vercel, abrir el proyecto `lynx-boutique`.
4. Crear un nuevo deployment subiendo nuevamente la carpeta actualizada.
5. Comprobar primero la URL `lynx-boutique.vercel.app`.
6. Luego revisar `lynx.pe` y `www.lynx.pe`.

Para ver cambios locales sin caché, abrir `index.html` y presionar **Ctrl + F5**.

## Estructura importante

- `index.html`: estructura y contenido principal de la web.
- `styles.css`: estilos, paleta, responsive y componentes visuales.
- `app.js`: catálogo, filtros, carrito, WhatsApp y comportamiento interactivo.
- `assets/`: logos, imágenes de productos y recursos generales.
- `mockups/`: mockups utilizados en el catálogo.
- `mockups-finales/`: mockups finales organizados por producto.
- `admin.html`: panel auxiliar de administración.

## Fit Lab

El Fit Lab fue pausado temporalmente para evitar errores de composición del maniquí.

- La sección está oculta mediante CSS.
- El código y los recursos se conservaron para reconstruirlo en el futuro.
- La regla temporal está en `styles.css`, cerca de la sección `LYNX Outfit Builder`:

```css
.outfit-builder-section {
    display: none !important;
}
```

No eliminar todavía el código del Fit Lab hasta decidir si se reconstruye con capas transparentes correctamente alineadas o con un sistema 3D más sólido.

## Catálogo y diseño

- El catálogo incluye hoodies, jackets, jeans y pants.
- Los mockups reemplazaron parte de las imágenes principales del catálogo.
- La portada utiliza el estilo streetwear cinematográfico de LYNX.
- El sitio está pensado para funcionar en ordenador y móvil.
- La compra y las consultas se gestionan por WhatsApp.

## Próximos pasos

1. Configurar los registros DNS en Punto.pe.
2. Verificar que `lynx.pe` y `www.lynx.pe` aparezcan como **Valid Configuration** en Vercel.
3. Probar la web desde móvil usando el dominio real.
4. Revisar enlaces, imágenes y botón de WhatsApp.
5. Más adelante decidir si se reconstruye el Fit Lab desde cero.

## Referencias oficiales

- Vercel: <https://vercel.com/docs/domains/set-up-custom-domain>
- Vercel DNS: <https://vercel.com/docs/domains/working-with-dns>

## Panel administrativo seguro

La configuración y el uso del nuevo panel están documentados en `GUIA_ADMIN_SUPABASE.md`.

- `admin.html`: acceso y panel de administración.
- `admin.js`: productos, inventario, ventas y caja.
- `admin.css`: diseño responsive del panel.
- `supabase/schema.sql`: tablas y reglas de seguridad.
- `supabase-config.js`: conexión pública con Supabase.
- `catalog-seed.json`: importación inicial de las 52 prendas.
