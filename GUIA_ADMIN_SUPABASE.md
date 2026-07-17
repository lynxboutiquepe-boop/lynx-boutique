# Guía del panel administrativo LYNX

**Última actualización:** 16 de julio de 2026  
**Objetivo:** administrar catálogo, inventario, preventas, clientes, ventas, ingresos y gastos con acceso privado.

## Estado actual de LYNX

- Proyecto Supabase conectado: `lynx-boutique`.
- Tablas, seguridad RLS y almacenamiento de imágenes creados.
- Catálogo cargado: **52 productos**.
- Administrador autorizado: `lynxboutique.pe@gmail.com`.
- URL de acceso: `https://lynx-boutique.vercel.app/admin.html`.

La configuración inicial ya está terminada. Las secciones 2 a 6 quedan como referencia para mantenimiento o para reconstruir el proyecto en el futuro.

## 1. Qué es Supabase y por qué lo usamos

Supabase es el servicio que guardará la información de LYNX fuera del navegador. Incluye:

- Base de datos para productos, stock, ventas e ingresos/gastos.
- Inicio de sesión con correo y contraseña.
- Almacenamiento para las imágenes nuevas del catálogo.
- Reglas de seguridad que deciden quién puede leer o modificar cada dato.

El plan **Free** cuesta USD 0 al mes e incluye actualmente hasta 2 proyectos activos, 500 MB de base de datos, 1 GB de archivos y 50 000 usuarios activos mensuales. Es más que suficiente para comenzar con LYNX. Los proyectos gratuitos con poca actividad pueden pausarse después de una semana y se pueden reactivar desde el panel de Supabase.

Referencias oficiales:

- Precios: <https://supabase.com/pricing>
- Facturación y plan gratuito: <https://supabase.com/docs/guides/platform/billing-on-supabase>
- Autenticación: <https://supabase.com/docs/guides/auth>
- Seguridad de archivos: <https://supabase.com/docs/guides/storage/security/access-control>

## 2. Crear la cuenta y el proyecto

1. Entra en <https://supabase.com> y pulsa **Start your project**.
2. Crea una cuenta con un correo que controles.
3. Crea una organización; puedes llamarla `LYNX Boutique`.
4. Pulsa **New project**.
5. Nombre recomendado: `lynx-boutique`.
6. Elige una contraseña fuerte para la base de datos y guárdala. Esa contraseña no será la misma del panel administrativo.
7. Selecciona la región más cercana disponible.
8. Mantén seleccionado el plan **Free** y crea el proyecto.

Supabase tardará unos minutos en preparar la base de datos.

## 3. Crear las tablas y reglas de seguridad

1. Dentro del proyecto, abre **SQL Editor**.
2. Pulsa **New query**.
3. Abre el archivo `supabase/schema.sql` de esta web.
4. Copia todo su contenido y pégalo en SQL Editor.
5. Pulsa **Run**.

El archivo crea:

- `products`: catálogo, tallas, precio, costo, stock y estado.
- `sales`: ventas confirmadas.
- `finance_entries`: ingresos y gastos.
- `admin_users`: lista privada de administradores autorizados.
- `customer_profiles`: nombre, correo, WhatsApp y permiso opcional para recibir promociones.
- Bucket `product-images`: imágenes que se suben desde el panel.
- Función `register_sale`: descuenta stock y crea el ingreso automáticamente.
- Políticas RLS: impiden que un visitante modifique datos o consulte la caja.

## 4. Crear tu usuario administrador

1. En Supabase abre **Authentication → Users**.
2. Pulsa **Add user → Send invitation**.
3. Escribe el correo que usarás para administrar LYNX.
4. Abre la invitación recibida y crea una contraseña de al menos 12 caracteres directamente en el panel LYNX.
5. Regresa a **SQL Editor** y ejecuta lo siguiente, reemplazando el correo:

```sql
insert into public.admin_users (user_id)
select id from auth.users
where email = 'TU_CORREO_AQUI';
```

Solo las cuentas incluidas en `admin_users` podrán abrir el panel y modificar información.

## 5. Conectar la web con Supabase

1. En Supabase abre **Project Settings → API**.
2. Copia **Project URL** y **Publishable key**. En proyectos antiguos puede aparecer como `anon public`.
3. Abre el archivo `supabase-config.js`.
4. Completa únicamente estas dos líneas:

```js
window.LYNX_SUPABASE_CONFIG = {
    url: 'PEGA_AQUI_PROJECT_URL',
    publishableKey: 'PEGA_AQUI_PUBLISHABLE_KEY'
};
```

La publishable key está diseñada para usarse en el navegador. La seguridad depende de las políticas RLS creadas por `schema.sql`.

**Nunca pegues una `secret key` ni una `service_role key` en archivos de la web.** Esas llaves permiten saltarse las reglas de seguridad.

## 6. Importar todo el catálogo actual

El catálogo inicial ya fue cargado. Si alguna vez necesitas restaurarlo:

1. Abre `supabase/seed.sql`.
2. Copia su contenido en **Supabase → SQL Editor**.
3. Pulsa **Run**.

También puedes abrir `admin.html`, entrar en **Productos** y pulsar **Importar catálogo actual**.

Los archivos `catalog-seed.json` y `supabase/seed.sql` contienen las 52 prendas actuales, con sus imágenes, precios, tallas y etiquetas. La importación no duplica productos existentes.

## 7. Cómo administrar productos

### Añadir una prenda

1. Ve a **Productos → Añadir producto**.
2. Completa nombre, categoría, precio, costo, stock, tallas y descripción.
3. Pega enlaces existentes o selecciona imágenes desde el dispositivo.
4. Elige el estado.
5. Pulsa **Guardar producto**.

### Editar una prenda

Pulsa el icono del lápiz. Puedes cambiar precios, imágenes, tallas, stock, descripción y estado.

### Estados disponibles

- **Disponible:** venta normal.
- **Últimas unidades:** muestra un aviso de stock limitado.
- **Preventa:** muestra `PREVENTA` y permite reservar por WhatsApp.
- **Agotado:** se mantiene visible, muestra `AGOTADO` y bloquea añadirlo al carrito.
- **Archivado:** deja de aparecer en la tienda, pero conserva su información en la base de datos.

### Eliminar una prenda

El icono de papelera la elimina definitivamente. Si existe la posibilidad de volver a venderla, es mejor usar **Archivado**.

## 8. Caja, ventas e ingresos automáticos

### Registrar una venta

1. Abre **Caja**.
2. Selecciona la prenda.
3. Escribe la cantidad.
4. Pulsa **Confirmar venta**.

El sistema registra la venta, descuenta el stock y añade el total como ingreso automático. Si el stock llega a cero, el producto queda marcado como **Agotado**.

### Registrar un gasto o ingreso manual

Usa **Movimiento manual** para publicidad, empaques, transporte, compra de mercadería u otros movimientos. Indica tipo, monto, categoría, fecha y descripción. El resumen calcula ingresos, gastos y balance del mes actual.

## 9. Registro de clientes y novedades

- Cualquier visitante puede ver el catálogo y añadir prendas al carrito.
- Para pasar al pedido o solicitar un outfit por WhatsApp debe crear una cuenta o iniciar sesión.
- El registro comienza con el correo y exige confirmarlo desde el enlace que recibe el cliente.
- Si el mensaje no aparece, el cliente puede pulsar **Reenviar correo de verificación** y revisar Spam o Promociones.
- El registro guarda nombre, correo y número de WhatsApp.
- La casilla para recibir novedades y descuentos es opcional; no se exige para comprar.
- Cada cliente puede cambiar ese permiso desde **Mi cuenta**.

En el panel abre **Clientes** para buscar registros y distinguir entre correo **Verificado** o **Pendiente**. El contador y el archivo de **Exportar suscritos** incluyen únicamente a quienes verificaron el correo y aceptaron recibir promociones. Una persona pendiente o sin permiso nunca entra en esa lista.

Supabase administra las cuentas y los correos de confirmación o recuperación. Con el proveedor gratuito predeterminado, este proyecto tiene actualmente un límite de **2 correos de autenticación por hora**; después de varias pruebas el siguiente correo puede demorarse hasta que se renueve ese límite. Para una tienda en producción se debe conectar un SMTP propio, por ejemplo Brevo o Resend, desde **Supabase → Authentication → Email → SMTP Settings**.

Los correos de autenticación sirven para confirmar cuentas o recuperar contraseñas, no para campañas comerciales. Los envíos masivos de promociones todavía requieren configurar un proveedor especializado y realizar el envío únicamente a la lista verificada y autorizada. Nunca se debe colocar la llave secreta de ese proveedor dentro de `app.js` o de otro archivo público de la web.

## 10. Reseñas de clientes

- Las reseñas son reales: solo un cliente con cuenta y correo verificado puede enviar una.
- Cada nueva reseña queda en estado **Pendiente**; no aparece en la tienda hasta que la apruebes.
- En el panel abre **Reseñas** para verlas. El botón de check la publica y el de ojo tachado la oculta.
- Si un cliente modifica y vuelve a enviar su reseña, esta vuelve a quedar pendiente de tu aprobación.
- La tienda pública muestra solamente las reseñas con estado **Publicada**.
- Una reseña puede llevar hasta 3 fotos JPG, PNG o WebP de 5 MB cada una. No se muestran de frente: el visitante debe pulsar **Ver foto(s)** para abrirlas.
- Antes de usar fotos, ejecuta una sola vez el archivo `supabase/review_images.sql` en **Supabase → SQL Editor**. Este crea el almacenamiento privado y permite ver una foto únicamente cuando su reseña fue publicada.

## 11. Cambiar o recuperar la contraseña

- En la pantalla de acceso pulsa **Olvidé mi contraseña**.
- Escribe primero tu correo.
- Revisa el mensaje enviado por Supabase.
- Al abrir el enlace, el panel mostrará **Crea tu contraseña** y pedirá confirmarla.

También puedes cambiarla desde **Supabase → Authentication → Users**. Nunca compartas la contraseña por WhatsApp ni la escribas en archivos del proyecto.

## 12. Copias de seguridad

Como práctica mensual:

1. En Supabase abre **Table Editor**.
2. Entra en `products` y exporta CSV.
3. Repite con `finance_entries` y `sales`.
4. Guarda los archivos en una carpeta privada.

El plan gratuito no incluye copias automáticas restaurables. Para una operación más grande, el plan Pro ofrece copias diarias.

## 13. Publicar cambios en Vercel

1. Prueba primero `index.html` y `admin.html` localmente.
2. Sube nuevamente la carpeta completa a Vercel.
3. Comprueba la tienda pública.
4. Abre `/admin.html` e inicia sesión.
5. Verifica que un producto editado desde el panel se refleje en la tienda.

## 14. Solución rápida de problemas

### “Falta conectar Supabase”

Revisa `supabase-config.js`: Project URL y publishable key siguen vacíos o tienen espacios incorrectos.

### “Este usuario no tiene permisos de administrador”

La cuenta existe, pero falta agregarla a `admin_users`. Repite el SQL del paso 4.

### Las prendas no aparecen

Entra en Productos y pulsa **Importar catálogo actual**. Revisa también que no estén marcadas como Archivado.

### No se pueden subir imágenes

Confirma que `schema.sql` terminó sin errores y que existe el bucket `product-images` en **Storage**.

### El proyecto gratuito está pausado

Entra en Supabase, abre el proyecto y pulsa **Restore project**. La tienda utilizará el catálogo local de respaldo si temporalmente no puede conectarse.
