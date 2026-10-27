---
name: toto-verify-change
description: Verify a change to Toto's artwork, static pages, documentation or repository AI kit with the existing local checks and browser inspection where the change needs it.
---

# Verify a Toto change

Read [AGENTS.md](../../../AGENTS.md). Work from the repository root.

- Run `npm run generate` when documentation or catalog sources change; review generated diffs. It does not generate new artwork, WebP exports or the favicon ZIP.
- Run `npm run check` and `git diff --check`. The checks cover pose dimensions/transparency, catalogs, local page assets, documentation links, skill routing and generated AI documentation. They do not test a remote deployment or an assistant's behavior.
- For changed UI, use a local static server and check the affected Spanish and English pages in a browser. Exercise gallery backgrounds, integration details, language links and sticky-header anchors when relevant. Include narrow/mobile, tablet and desktop widths for layout changes.
- For changed artwork, inspect character identity, cropping and edge quality on light/dark surfaces. Inspect face icons at actual small sizes. Use the exported dimensions rather than estimates in documentation.
- For kit changes, make sure every shared workflow is reachable through its Codex entry and all new documentation is listed by `tools/llms.cjs`. A stale generated file or broken local link should make the checks fail.
- Report the commands and browser checks actually performed, along with anything unavailable. Distinguish local validation from publication and local trademark metadata from an external registry check.
