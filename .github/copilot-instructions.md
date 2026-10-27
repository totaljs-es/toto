# Toto repository instructions

Read [AGENTS.md](../AGENTS.md) for the maintained project guidance.

- Toto is the official European red fox mascot of Spanish Total.js. Preserve the reference artwork, identity and the limited-use license.
- This is a bilingual static HTML/CSS/JavaScript site, not a server application. Keep the existing implementation and equivalent Spanish/English content.
- English is the default (`README.md`, `LICENSE.md`, `index.html`, `docs/`); Spanish lives in `README.es.md`, `LICENSE.es.md`, `es/index.html` and `docs/es/`. Both show the collection previews.
- Edit pose definitions in `tools/catalog.cjs`; regenerate the manifest and browser catalog with `npm run generate`.
- Run `npm run check` before reporting validation. Browser checks are additionally needed for changed presentation or interaction.
- Keep mobile navigation, the language switch, sticky-header anchor offsets and accessible image descriptions working.
- Generated files and the reusable favicon kit must match their sources. Local validation is distinct from publication.
