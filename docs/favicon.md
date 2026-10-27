# Toto's face on our websites

Official face icon: it keeps Toto's wink and smile, with both ears complete and no body or tail. The favicons have transparent backgrounds; the Apple icon uses a Paper (#FFF9F2) background and extra margin. Their use follows [Toto's license](../LICENSE.md).

## Files

- [Kit to copy to another website](../assets/brand/toto-favicons.zip): icons, original, this guide and license.
- [Original face PNG](../assets/brand/toto-face.png): master image with transparency.
- [favicon.ico](../assets/brand/favicon.ico): includes 16, 32 and 48 px.
- PNG: [16](../assets/brand/favicon-16.png), [32](../assets/brand/favicon-32.png), [48](../assets/brand/favicon-48.png), [64](../assets/brand/favicon.png), [192](../assets/brand/favicon-192.png) and [512](../assets/brand/favicon-512.png) px.
- [apple-touch-icon.png](../assets/brand/apple-touch-icon.png): 180 × 180 px.

## Integration

Copy the icons to `assets/brand/` on the website and add these tags to its head. Adjust the paths if the application lives under a subdirectory. Toto's English, Spanish and 404 pages already include them.

```html
<link rel="icon" href="/assets/brand/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/apple-touch-icon.png">
```

As with any use of Toto, a site that shows him must state that it was built with Total.js, with a link to totaljs.com or totaljs.es. See the [license](../LICENSE.md).

[Versión en español](es/favicon.md)
