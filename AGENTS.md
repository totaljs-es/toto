# Toto: guidance for coding agents

Toto is the official mascot of **Spanish Total.js**, a European red fox (*Vulpes vulpes*). This repository contains his identity, licensed artwork, pose catalog and bilingual static presentation. It is not a Total.js server or an npm library: `package.json` is private and provides local tools only.

## Start here

- [README.md](README.md) is the English entry point; [README.es.md](README.es.md) is Spanish. Keep their previews, links and pose coverage consistent.
- Read [the identity guide](docs/identidad.md) before changing artwork, [the pose guide](docs/poses.md) for app integration, and [the favicon guide](docs/favicon.md) for face icons and the reusable ZIP.
- [LICENSE.md](LICENSE.md) grants limited use, not an open-source asset license. Keep attribution and permitted-use language intact. [Trademark data](assets/brand/trademark.json) is local metadata, not evidence of a fresh registry check; do not infer registration or legal status from the application number.
- [docs/ai.md](docs/ai.md) maps this kit; [llms.txt](llms.txt) and [llms-full.txt](llms-full.txt) are generated documentation for assistants.

## Repository map

| Area | Source and responsibility |
| --- | --- |
| Presentation | `index.html` (Spanish), `en/index.html` (English), `404.html` |
| Interaction and layout | `scripts/presentation.js`, `styles/presentation.css` |
| Artwork | `assets/poses/toto-*.png`, web exports in `assets/poses/webp/`, original development references in `assets/reference/` |
| Pose definitions | `tools/catalog.cjs` writes `assets/poses/manifest.json` and `assets/poses/catalog.js`; edit definitions, then regenerate |
| Brand | `assets/brand/`: official face, favicons, Apple icon, favicon ZIP, social preview and trademark metadata |
| AI documentation | `tools/llms.cjs` lists the pages and generates both `llms` files; `tests/ai.test.cjs` checks kit integrity |

## Working conventions

- Use existing static HTML, CSS and plain JavaScript. No framework, build system or server is needed. Node.js 18+ runs all checks without installing packages; WebP generation separately needs `cwebp` on PATH.
- Preserve the warm visual design, soft 3D illustration style, species and recognizable features. Additional poses should use the original portrait as reference. Keep the original artwork and development references intact.
- The face-only artwork is `assets/brand/toto-face.png`. Use its favicon exports for small icons; update the reusable ZIP and its guide when its contents change.
- Keep Spanish and English pages equivalent. Relative paths in `en/index.html` start with `../`; pose paths in the manifest are relative to the repository root, and the browser script uses the page's `data-root` prefix.
- Keep the header sticky and the language switch accessible on mobile. Anchor navigation must clear the header. Check modified layouts on narrow screens and desktop; preserve keyboard focus, descriptive alt text and reduced-motion behavior.
- Poses accompany real text and state. Show `celebrate` after confirmed success; use `error` with an explanation and a recovery action. Images alone never indicate real progress or success.
- GitHub Pages serves this static tree under `/toto/`. Preserve `.nojekyll`, canonical/social metadata and absolute asset URLs in `404.html`, which must work from missing nested paths.
- Generated catalogs and `llms` files are checked in. Regenerate them from their sources; do not maintain a second copy by hand.

## Commands

```sh
npm run generate          # regenerate the pose catalogs and both llms files
npm run check             # artwork, links, catalogs and AI-kit integrity
npm run check:ai          # AI-kit and generated documentation checks only
npm test                  # same complete local checks as npm run check
node tools/webp.cjs       # regenerate WebP exports; requires cwebp
git diff --check
```

When presentation changes, also serve the repository with a local static server and verify the affected interactions in a real browser. Local checks do not prove a GitHub Pages deployment, external registry status or email-client rendering. Report the checks actually performed and distinguish local changes from published changes.

## Local workflows

Codex entry points are in `.agents/skills/`; each links to the maintained workflow in `.claude/skills/`. Their paths and commands are relative to the repository root. Select the relevant workflow: `toto-add-pose`, `toto-update-site` or `toto-verify-change`.

`CLAUDE.md` and `GEMINI.md` import this guide; `.github/copilot-instructions.md` provides a short pointer. Repository guidance does not grant filesystem, network or publishing permissions.
