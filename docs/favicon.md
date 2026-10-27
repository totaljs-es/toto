# La carita de Toto en nuestras webs

Icono oficial de rostro: conserva el guiño y la sonrisa de Toto, con las orejas completas y sin cuerpo ni cola. Los favicons tienen fondo transparente; el icono de Apple usa fondo Papel (#FFF9F2) y margen adicional. Su uso se rige por la [licencia de Toto](../LICENSE.md).

## Archivos

- [Kit para copiar a otra web](../assets/brand/toto-favicons.zip): iconos, original, esta guía y licencia.
- [Cara original PNG](../assets/brand/toto-face.png): imagen maestra con transparencia.
- [favicon.ico](../assets/brand/favicon.ico): incluye 16, 32 y 48 px.
- PNG: [16](../assets/brand/favicon-16.png), [32](../assets/brand/favicon-32.png), [48](../assets/brand/favicon-48.png), [64](../assets/brand/favicon.png), [192](../assets/brand/favicon-192.png) y [512](../assets/brand/favicon-512.png) px.
- [apple-touch-icon.png](../assets/brand/apple-touch-icon.png): 180 × 180 px.

## Integración

Copia los iconos en assets/brand/ de la web y añade estas etiquetas en su head. Ajusta las rutas si la aplicación vive bajo un subdirectorio. Las páginas española, inglesa y 404 de Toto ya las incluyen.

```html
<link rel="icon" href="/assets/brand/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">
```

## Generación

Se ha usado la herramienta integrada de generación de imágenes para aislar la cabeza, con el [retrato original](../assets/poses/toto-signature.png) como referencia. Los tamaños PNG son exportaciones de la misma imagen; el ICO agrupa los PNG de 16, 32 y 48 px.

### Prompt utilizado

Use case: background-extraction / identity-preserve. Edit the provided official Toto mascot illustration into a reusable face-only website favicon master. Preserve the exact same head design, orange colors, polished softly shaded 3D illustration finish, forelock, large dark-rimmed ears with pink interiors, cream muzzle, amber open eye, wink on the other eye, black nose and cheerful open smile. Remove ALL body, chest tuft, paws and tail. Output ONLY the entire head including BOTH complete ears and cheek fur, with a clean natural rounded silhouette beneath the chin. Do not invent a different fox, do not change expression, do not add any objects, text, border, circle, badge, background or shadow. Keep the head upright and centrally balanced in a square canvas; let the head fill roughly 92 percent of its available width and height, preserving its proportions, with a small equal safe transparent margin so ear tips are never cropped. True transparent alpha background. Designed to remain recognizable at 16x16 and 32x32. Single standalone high-resolution PNG image.
