# La carita de Toto en nuestras webs

Icono oficial de rostro: conserva el guiño y la sonrisa de Toto, con las orejas completas y sin cuerpo ni cola. Los favicons tienen fondo transparente; el icono de Apple usa fondo Papel (#FFF9F2) y margen adicional. Su uso se rige por la [licencia de Toto](../../LICENSE.es.md).

## Archivos

- [Kit para copiar a otra web](../../assets/brand/toto-favicons.zip): iconos, original, esta guía y licencia.
- [Cara original PNG](../../assets/brand/toto-face.png): imagen maestra con transparencia.
- [favicon.ico](../../assets/brand/favicon.ico): incluye 16, 32 y 48 px.
- PNG: [16](../../assets/brand/favicon-16.png), [32](../../assets/brand/favicon-32.png), [48](../../assets/brand/favicon-48.png), [64](../../assets/brand/favicon.png), [192](../../assets/brand/favicon-192.png) y [512](../../assets/brand/favicon-512.png) px.
- [apple-touch-icon.png](../../assets/brand/apple-touch-icon.png): 180 × 180 px.

## Integración

Copia los iconos en assets/brand/ de la web y añade estas etiquetas en su head. Ajusta las rutas si la aplicación vive bajo un subdirectorio. Las páginas española, inglesa y 404 de Toto ya las incluyen.

```html
<link rel="icon" href="/assets/brand/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">
```

Como con cualquier uso de Toto, una web que lo muestre debe indicar que está creada con Total.js, con un enlace a totaljs.com o a totaljs.es. Consulta la [licencia](../../LICENSE.es.md).

[English version](../favicon.md)
