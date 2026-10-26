# Poses de Toto en nuestras apps

Esta colección pertenece a Spanish Total.js. Su integración en aplicaciones propias y el permiso editorial limitado de terceros se rigen por la [licencia privativa](../LICENSE.md).

Toto es una marca registrada de Spanish Total.js en la **OEPM** (**M4411785**). [Datos de la marca](marca.md).

## Catálogo

El [manifiesto JSON](../assets/poses/manifest.json) contiene identificador, archivo, dimensiones, textos alternativos e intención de cada pose. Las rutas del manifiesto son relativas a la raíz del repositorio. Los archivos originales son PNG con canal alfa; se sirven como imágenes estáticas.

| ID estable | Recurso | Uso recomendado |
| --- | --- | --- |
| `signature` | `assets/poses/toto-signature.png` | Identidad, presentaciones y firma. |
| `welcome` | `assets/poses/toto-welcome.png` | Bienvenida, primeros pasos y ayuda inicial. |
| `thinking` | `assets/poses/toto-thinking.png` | Consejos y preguntas sin resolver. |
| `coding` | `assets/poses/toto-coding.png` | Tutoriales y operaciones en curso. |
| `celebrate` | `assets/poses/toto-celebrate.png` | Confirmación de éxito y nuevas versiones. |

La [galería de la web](https://totaljs-es.github.io/toto/#poses) permite cambiar el fondo y comprobar cómo se ve cada pose.

## HTML

Copia el recurso autorizado a la carpeta estática de tu aplicación. Este ejemplo presupone que has copiado el PNG a `/assets/toto/`:

```html
<img class="toto" src="/assets/toto/toto-welcome.png"
     width="160" height="160"
     alt="Toto te da la bienvenida a Spanish Total.js.">
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

En una app de Spanish Total.js, coloca el archivo en `public/img/toto/` y úsalo desde la vista:

```html
<img src="/img/toto/toto-thinking.png" width="128" height="128"
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

`toto-signature.png` es una copia sin modificaciones del retrato aportado. La hoja 2D se conserva en `assets/reference/toto-character-sheet.png`. Las cuatro poses adicionales se han diseñado en Spanish Total.js a partir del retrato y se mantienen como archivos independientes. No son fotogramas de una animación ni exportaciones de un modelo 3D editable.

No hay SVG en esta entrega: los recursos originales son imágenes rasterizadas. Para una futura colección vectorial hará falta crear y revisar ilustraciones vectoriales propias.

## Comprobar la colección

Con Node.js disponible, ejecuta desde la raíz:

```sh
node tools/check.cjs
```

La comprobación valida las rutas de los recursos, dimensiones PNG, canal alfa, identificadores únicos y correspondencia de los catálogos de la galería. No instala paquetes ni utiliza servicios externos.
