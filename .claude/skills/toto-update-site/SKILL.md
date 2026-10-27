---
name: toto-update-site
description: Maintain Toto's bilingual static presentation, README previews or favicon integration while preserving its visual identity, mobile navigation and GitHub Pages paths.
---

# Maintain the Toto presentation

Read [AGENTS.md](../../../AGENTS.md) and the [favicon guide](../../../docs/favicon.md) when changing icons. Paths below are relative to the repository root.

- Edit the existing HTML, `styles/presentation.css` and `scripts/presentation.js`; no new framework or build layer is needed.
- Keep `index.html` in English (default) and `es/index.html` in Spanish. The latter uses `../` asset paths and `data-root="../"`. Preserve canonical/hreflang metadata and language switches.
- The sticky shell's height controls anchor offset through `--header-height`. Verify that navigation targets remain visible, the language switch works, and the whole page fits at 320 px as well as desktop widths. Decorative transformed images can overflow at tablet widths even when mobile and desktop look correct.
- The gallery comes from the generated pose catalog. Preserve light/dark controls and their `aria-pressed` state, useful alt text and the no-JavaScript fallback.
- The documentation pages are generated: change the Markdown (`docs/`, `docs/es/`, `LICENSE*.md`) or `tools/pages.cjs`, then run `npm run generate`. A new document needs an entry in `DOCS` in `tools/pages.cjs` and in `tools/llms.cjs`; keep the English and Spanish versions equivalent.
- Keep the SEO and accessibility baseline: absolute `hreflang`/canonical URLs with `x-default`, the JSON-LD graph, `robots.txt`, `sitemap.xml` and `manifest.webmanifest` in sync with the pages; text contrast of at least 4.5:1 (use `--orange-ink` and `--muted` for small text); touch targets of at least 24 px; images with `alt`, `width`, `height` and `srcset` from the 480/800 px WebP exports. `npm run check` enforces the structural parts; Lighthouse (mobile) should stay at 95+ in every category.
- `404.html` uses absolute published asset URLs so it works at nested missing routes. Local previewing may need these URLs mapped to local assets; do not accidentally validate the old published image instead.
- Favicons come from the approved face master. When changing them, keep ICO/PNG/Apple exports, HTML declarations, the downloadable ZIP and documentation consistent. Inspect the 16 and 32 px result at actual size on both backgrounds.
- For README changes, preserve English as default (`README.md`) and the Spanish version separately (`README.es.md`); show collection images rather than only file links.
- Run `npm run generate` after documentation or catalog edits, then `npm run check`. For HTML/CSS/interaction changes, inspect the affected pages in a real browser and report any publication work separately.
