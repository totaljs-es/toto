# Toto: guidance for coding agents

Toto is the official mascot of **Spanish Total.js**, a European red fox (*Vulpes vulpes*). This repository contains his identity, licensed artwork, pose catalog and bilingual static presentation. It is not a Total.js server or an npm library: `package.json` is private and provides local tools only.

## Start here

- [README.md](README.md) is the English entry point; [README.es.md](README.es.md) is Spanish. Keep their previews, links and pose coverage consistent.
- Read [the identity guide](docs/identity.md) before changing artwork, [the pose guide](docs/poses.md) for app integration, and [the favicon guide](docs/favicon.md) for face icons and the reusable ZIP.
- [LICENSE.md](LICENSE.md) grants the Total.js community limited use, not an open-source asset license: every app, site or service showing Toto must state that it was built with Total.js, with a link to totaljs.com or totaljs.es. Keep that condition and the permitted-use language intact; English prevails over [LICENSE.es.md](LICENSE.es.md). [Trademark data](assets/brand/trademark.json) is local metadata, not evidence of a fresh registry check; do not infer registration or legal status from the application number.
- [docs/ai.md](docs/ai.md) maps this kit; [llms.txt](llms.txt) and [llms-full.txt](llms-full.txt) are generated documentation for assistants.

## Repository map

| Area | Source and responsibility |
| --- | --- |
| Presentation | `index.html` (English, default), `es/index.html` (Spanish), `404.html` |
| Documentation pages | The Markdown in `docs/`, `docs/es/` and the two licenses is the source; `tools/pages.cjs` generates `story/`, `identity/`, `poses/`, `favicon/`, `trademark/`, `license/` and their `es/` equivalents plus `sitemap.xml`. Never edit the generated HTML; edit the Markdown and run `npm run generate` |
| Discovery | `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, JSON-LD and `hreflang` in both pages, plus `llms.txt` for agents |
| Interaction and layout | `scripts/presentation.js`, `styles/presentation.css` |
| Artwork | `assets/poses/toto-*.png`, web exports in `assets/poses/webp/`, brand assets in `assets/brand/` |
| Pose definitions | `tools/catalog.cjs` writes `assets/poses/manifest.json` and `assets/poses/catalog.js`; edit definitions, then regenerate |
| Brand | `assets/brand/`: official face, favicons, Apple icon, favicon ZIP, social preview and trademark metadata |
| AI documentation | `tools/llms.cjs` lists the pages and generates both `llms` files; `tests/ai.test.cjs` checks kit integrity |

## Working conventions

- Use existing static HTML, CSS and plain JavaScript. No framework, build system or server is needed. Node.js 18+ runs all checks without installing packages; WebP generation (800 px and 480 px per pose) separately needs `cwebp` on PATH.
- Preserve the warm visual design, soft 3D illustration style, species and recognizable features. Additional poses should use the original portrait as reference. Keep the original artwork intact.
- The face-only artwork is `assets/brand/toto-face.png`. Use its favicon exports for small icons; update the reusable ZIP and its guide when its contents change.
- Keep Spanish and English pages equivalent. Relative paths in `es/index.html` start with `../` and it sets `data-root="../"`; English is the default and lives at the root. Documentation follows the same rule: English in `docs/`, Spanish in `docs/es/`, `README.md`/`LICENSE.md` in English and `README.es.md`/`LICENSE.es.md` in Spanish; pose paths in the manifest are relative to the repository root, and the browser script uses the page's `data-root` prefix.
- Keep the header sticky and the language switch accessible on mobile. Anchor navigation must clear the header. Check modified layouts on narrow screens and desktop; preserve keyboard focus, descriptive alt text and reduced-motion behavior.
- Poses accompany real text and state. Show `celebrate` after confirmed success; use `error` with an explanation and a recovery action. Images alone never indicate real progress or success.
- GitHub Pages serves this static tree under `/toto/`. Preserve `.nojekyll`, canonical/social metadata and absolute asset URLs in `404.html`, which must work from missing nested paths.
- Generated catalogs and `llms` files are checked in. Regenerate them from their sources; do not maintain a second copy by hand.

## Commands

```sh
npm run generate          # regenerate the pose catalogs, both llms files, the documentation pages and the sitemap
npm run check             # artwork, links, catalogs and AI-kit integrity
npm run check:ai          # AI-kit and generated documentation checks only
npm run check:pages       # documentation pages: freshness, links, hreflang, sitemap
npm test                  # same complete local checks as npm run check
node tools/webp.cjs       # regenerate WebP exports; requires cwebp
git diff --check
```

When presentation changes, also serve the repository with a local static server and verify the affected interactions in a real browser. Local checks do not prove a GitHub Pages deployment, external registry status or email-client rendering. Report the checks actually performed and distinguish local changes from published changes.

## Local workflows

Codex entry points are in `.agents/skills/`; each links to the maintained workflow in `.claude/skills/`. Their paths and commands are relative to the repository root. Select the relevant workflow: `toto-add-pose`, `toto-update-site` or `toto-verify-change`.

`CLAUDE.md` and `GEMINI.md` import this guide; `.github/copilot-instructions.md` provides a short pointer. Repository guidance does not grant filesystem, network or publishing permissions.
