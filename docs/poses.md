# Toto's poses in your apps

Toto belongs to Spanish Total.js. The Total.js community may bring him into apps built with Total.js, and creators may use him to illustrate Total.js, under the [license](../LICENSE.md). The one condition: **show clearly that your app, website or service was built with Total.js, with a link to totaljs.com or totaljs.es.**

**Toto™** is a mark of Spanish Total.js · OEPM **M4411785**. [Trademark details](trademark.md).

## Catalog

The [JSON manifest](../assets/poses/manifest.json) contains the identifier, file, dimensions, alt texts and intent of each pose. Manifest paths are relative to the repository root. Every pose exists as **WebP** (800 px, light, for web) and as an original **PNG** (dimensions in the manifest), both with an alpha channel. Use the WebP unless you need the maximum resolution; some older email clients, such as desktop Outlook, do not display WebP: use the PNG there.

| Stable ID | Asset | Recommended use |
| --- | --- | --- |
| `signature` | `assets/poses/webp/toto-signature.webp` · `assets/poses/toto-signature.png` | Identity, presentations and sign-offs. |
| `welcome` | `assets/poses/webp/toto-welcome.webp` · `assets/poses/toto-welcome.png` | Welcome, first steps and initial help. |
| `thinking` | `assets/poses/webp/toto-thinking.webp` · `assets/poses/toto-thinking.png` | Tips and open questions. |
| `coding` | `assets/poses/webp/toto-coding.webp` · `assets/poses/toto-coding.png` | Tutorials and operations in progress. |
| `celebrate` | `assets/poses/webp/toto-celebrate.webp` · `assets/poses/toto-celebrate.png` | Success confirmation and new releases. |
| `error` | `assets/poses/webp/toto-error.webp` · `assets/poses/toto-error.png` | Error pages and missing routes, with an explanation and a recovery action. |

The [gallery on the website](https://totaljs-es.github.io/toto/#poses) lets you switch the background and see how each pose looks.

## HTML

You can link the image straight from Toto's website, with nothing to download. Put it where users can see it, for example in the footer or the about page of your app, with the Total.js notice and link:

```html
<a href="https://www.totaljs.com/">
  <img src="https://totaljs-es.github.io/toto/assets/poses/webp/toto-welcome.webp"
       width="160" height="160"
       alt="Toto, mascot of Spanish Total.js">
</a>
<p>Built with <a href="https://www.totaljs.com/">Total.js</a></p>
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

In an app built with Total.js, link the pose from the view:

```html
<img src="https://totaljs-es.github.io/toto/assets/poses/webp/toto-thinking.webp" width="128" height="128"
     alt="Toto is thinking.">
<p>Check the data before continuing.</p>
<footer>Built with <a href="https://www.totaljs.com/">Total.js</a></footer>
```

For a decorative image that accompanies equivalent text, use `alt=""`. If it conveys something not written elsewhere, describe that meaning. The file name alone is not useful alternative text.

## Practical rules

- Use the pose as a companion to an understandable interface.
- Respect the proportion, the silhouette and the margin around the image.
- Do not let Toto cover actions, errors, data or navigation.
- Choose a background with enough contrast and check dark mode too.
- Accompany a task in progress with a real textual status; the `coding` pose is static.
- Show `celebrate` when the application has confirmed success.
- Show `error` with a clear explanation and a way forward.
- Keep a respectful tone when the user runs into an error.

## Check the collection

With Node.js available, run from the root:

```sh
npm run check
```

The check validates asset paths, PNG and WebP dimensions, the alpha channel, unique identifiers and the match between the gallery catalogs. It installs no packages and uses no external services.

[Versión en español](es/poses.md)
