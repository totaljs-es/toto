# Poses de Toto en nuestras apps

Esta colección pertenece a Spanish Total.js. Su integración en aplicaciones propias y el permiso editorial limitado de terceros se rigen por la [licencia privativa](../LICENSE.md).

**Toto™** es una marca de Spanish Total.js · OEPM **M4411785**. [Datos de la marca](marca.md).

## Catálogo

El [manifiesto JSON](../assets/poses/manifest.json) contiene identificador, archivo, dimensiones, textos alternativos e intención de cada pose. Las rutas del manifiesto son relativas a la raíz del repositorio. Cada pose existe en **WebP** (800 px, ligero, para web y firmas) y en **PNG** original (dimensiones en el manifiesto) con canal alfa. Usa el WebP salvo que necesites la máxima resolución; algunos clientes de correo antiguos, como Outlook de escritorio, no muestran WebP: en ese caso usa el PNG.

| ID estable | Recurso | Uso recomendado |
| --- | --- | --- |
| `signature` | `assets/poses/webp/toto-signature.webp` · `assets/poses/toto-signature.png` | Identidad, presentaciones y firma. |
| `welcome` | `assets/poses/webp/toto-welcome.webp` · `assets/poses/toto-welcome.png` | Bienvenida, primeros pasos y ayuda inicial. |
| `thinking` | `assets/poses/webp/toto-thinking.webp` · `assets/poses/toto-thinking.png` | Consejos y preguntas sin resolver. |
| `coding` | `assets/poses/webp/toto-coding.webp` · `assets/poses/toto-coding.png` | Tutoriales y operaciones en curso. |
| `celebrate` | `assets/poses/webp/toto-celebrate.webp` · `assets/poses/toto-celebrate.png` | Confirmación de éxito y nuevas versiones. |
| `error` | `assets/poses/webp/toto-error.webp` · `assets/poses/toto-error.png` | Páginas de error y rutas no encontradas, con una explicación y una acción de recuperación. |

La [galería de la web](https://totaljs-es.github.io/toto/#poses) permite cambiar el fondo y comprobar cómo se ve cada pose.

## HTML

Puedes enlazar la imagen directamente desde la web de Toto, sin descargarla. Es válido para una firma de correo o una página que mencione a Spanish Total.js; incluye la atribución y el enlace:

```html
<a href="https://totaljs-es.github.io/toto/">
  <img class="toto" src="https://totaljs-es.github.io/toto/assets/poses/webp/toto-welcome.webp"
       width="160" height="160"
       alt="Toto, mascota de Spanish Total.js">
</a>
<br>Toto, mascota de <a href="https://totaljs.es/">Spanish Total.js</a>
```

```css
.toto {
  display: block;
  width: min(160px, 100%);
  height: auto;
  object-fit: contain;
}
```

## Total.js

En una app de Spanish Total.js, enlaza la pose desde la vista:

```html
<img src="https://totaljs-es.github.io/toto/assets/poses/webp/toto-thinking.webp" width="128" height="128"
     alt="Toto está pensando.">
<p>Comprueba los datos antes de continuar.</p>
```

Para una imagen decorativa que acompaña a un texto equivalente, usa `alt=""`. Si comunica algo que no está escrito en otro lugar, describe ese significado. El nombre del archivo por sí solo no es un texto alternativo útil.

## Reglas prácticas

- Usa la pose como acompañamiento de una interfaz comprensible.
- Respeta la proporción, la silueta y el margen alrededor de la imagen.
- Evita que Toto tape acciones, errores, datos o navegación.
- Elige un fondo con suficiente contraste y revisa también el modo oscuro.
- Acompaña una tarea en curso con un estado textual real; la pose `coding` es estática.
- Muestra `celebrate` cuando la aplicación haya confirmado el éxito.
- Mantén el tono respetuoso cuando el usuario encuentre un error.

## Archivos de origen y generación

`toto-signature.png` es una copia sin modificaciones del retrato aportado. La hoja 2D se conserva en `assets/reference/toto-character-sheet.png`. Las cinco poses adicionales se han diseñado en Spanish Total.js a partir del retrato y se mantienen como archivos independientes. No son fotogramas de una animación ni exportaciones de un modelo 3D editable.

La pose `error` dispone de [referencias y prompt de generación](pose-error.md).

No hay SVG en esta entrega: los recursos originales son imágenes rasterizadas. Para una futura colección vectorial hará falta crear y revisar ilustraciones vectoriales propias.

## Comprobar la colección

Con Node.js disponible, ejecuta desde la raíz:

```sh
node tools/check.cjs
```

La comprobación valida las rutas de los recursos, dimensiones PNG, canal alfa, identificadores únicos y correspondencia de los catálogos de la galería. No instala paquetes ni utiliza servicios externos.
