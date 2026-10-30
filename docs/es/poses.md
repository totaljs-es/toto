# Poses de Toto en tus apps

Toto pertenece a Spanish Total.js. La comunidad Total.js puede llevarlo a apps creadas con Total.js, y los creadores pueden usarlo para ilustrar Total.js, según la [licencia](../../LICENSE.es.md). La única condición: **indica con claridad que tu app, web o servicio está creado con Total.js, con un enlace a totaljs.com o a totaljs.es.**

**Toto™** es una marca de Spanish Total.js · OEPM **M4411785**. [Datos de la marca](marca.md).

## Catálogo

El [manifiesto JSON](../../assets/poses/manifest.json) contiene identificador, archivo, dimensiones, textos alternativos e intención de cada pose. Las rutas del manifiesto son relativas a la raíz del repositorio. Cada pose existe en **WebP** (800 px, ligero, para web y firmas) y en **PNG** original (dimensiones en el manifiesto) con canal alfa. Usa el WebP salvo que necesites la máxima resolución; algunos clientes de correo antiguos, como Outlook de escritorio, no muestran WebP: en ese caso usa el PNG.

| ID estable | Recurso | Uso recomendado |
| --- | --- | --- |
| `signature` | `assets/poses/webp/toto-signature.webp` · `assets/poses/toto-signature.png` | Identidad, presentaciones y firma. |
| `welcome` | `assets/poses/webp/toto-welcome.webp` · `assets/poses/toto-welcome.png` | Bienvenida, primeros pasos y ayuda inicial. |
| `thinking` | `assets/poses/webp/toto-thinking.webp` · `assets/poses/toto-thinking.png` | Consejos y preguntas sin resolver. |
| `coding` | `assets/poses/webp/toto-coding.webp` · `assets/poses/toto-coding.png` | Tutoriales y operaciones en curso. |
| `celebrate` | `assets/poses/webp/toto-celebrate.webp` · `assets/poses/toto-celebrate.png` | Confirmación de éxito y nuevas versiones. |
| `error` | `assets/poses/webp/toto-error.webp` · `assets/poses/toto-error.png` | Páginas de error y rutas no encontradas, con una explicación y una acción de recuperación. |
| `production` | `assets/poses/webp/toto-production.webp` · `assets/poses/toto-production.png` | Servidores, despliegues y operaciones en producción. |
| `email` | `assets/poses/webp/toto-email.webp` · `assets/poses/toto-email.png` | Correo, mensajes y comunicación. |
| `totaljs` | `assets/poses/webp/toto-totaljs.webp` · `assets/poses/toto-totaljs.png` | Presentaciones de Total.js y su comunidad. |
| `ia` | `assets/poses/webp/toto-ia.webp` · `assets/poses/toto-ia.png` | Asistentes de IA, aprendizaje y colaboración. |

La [galería de la web](https://totaljs-es.github.io/toto/es/#poses) permite cambiar el fondo y comprobar cómo se ve cada pose.

## HTML

Puedes enlazar la imagen directamente desde la web de Toto, sin descargarla. Colócala donde los usuarios puedan verla, por ejemplo en el pie o en la página «acerca de» de tu app, con el aviso y el enlace a Total.js:

```html
<a href="https://www.totaljs.es/">
  <img class="toto" src="https://totaljs-es.github.io/toto/assets/poses/webp/toto-welcome.webp"
       width="160" height="160"
       alt="Toto, mascota de Spanish Total.js">
</a>
<p>Creado con <a href="https://www.totaljs.es/">Total.js</a></p>
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

En una app creada con Total.js, enlaza la pose desde la vista:

```html
<img src="https://totaljs-es.github.io/toto/assets/poses/webp/toto-thinking.webp" width="128" height="128"
     alt="Toto está pensando.">
<p>Comprueba los datos antes de continuar.</p>
<footer>Creado con <a href="https://www.totaljs.es/">Total.js</a></footer>
```

Para una imagen decorativa que acompaña a un texto equivalente, usa `alt=""`. Si comunica algo que no está escrito en otro lugar, describe ese significado. El nombre del archivo por sí solo no es un texto alternativo útil.

## Reglas prácticas

- Usa la pose como acompañamiento de una interfaz comprensible.
- Respeta la proporción, la silueta y el margen alrededor de la imagen.
- Evita que Toto tape acciones, errores, datos o navegación.
- Elige un fondo con suficiente contraste y revisa también el modo oscuro.
- Acompaña una tarea en curso con un estado textual real; la pose `coding` es estática.
- Muestra `celebrate` cuando la aplicación haya confirmado el éxito.
- Muestra `error` con una explicación clara y una salida útil.
- Mantén el tono respetuoso cuando el usuario encuentre un error.

## Comprobar la colección

Con Node.js disponible, ejecuta desde la raíz:

```sh
npm run check
```

La comprobación valida las rutas de los recursos, dimensiones PNG, canal alfa, identificadores únicos y correspondencia de los catálogos de la galería. No instala paquetes ni utiliza servicios externos.

[English version](../poses.md)
