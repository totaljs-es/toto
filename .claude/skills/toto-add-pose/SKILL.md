---
name: toto-add-pose
description: Add or revise artwork in the Toto mascot pose collection, preserving the official identity and updating its catalogs, bilingual previews and integration guidance.
---

# Add a Toto pose

Read [AGENTS.md](../../../AGENTS.md), [the identity guide](../../../docs/identity.md) and [the pose guide](../../../docs/poses.md). Paths below are relative to the repository root.

- Use `assets/poses/toto-signature.png` as the identity reference: soft 3D illustration, orange forelock, cream muzzle and chest, dark paws, large dark-edged ears and fluffy light-tipped tail. Inspect the finished image; an alpha channel alone does not prove a clean cutout or consistent anatomy.
- Save a new independent transparent RGBA PNG with a stable `toto-<id>.png` name. Keep existing pose IDs and the original reference. Preserve complete ears, tail and paws with useful margin.
- Export its WebP at 800 px width with transparency. `node tools/webp.cjs` requires `cwebp` and regenerates every pose export; inspect that diff if only one new pose was requested.
- Add the bilingual name, intended use and alt descriptions to `tools/catalog.cjs`; run `npm run generate`. The manifest and browser catalog are generated from these definitions.
- Add matching previews to both READMEs. Update collection counts in both presentation pages, both pose guides (`docs/poses.md`, `docs/es/poses.md`) and any relevant fallback page. An error pose should accompany a clear explanation and useful next action; celebration follows actual success.
- Keep the license and the "Built with Total.js" condition unchanged unless the task explicitly changes them. Do not add notes on how the artwork was produced.
- Run `npm run check`, inspect the image on light/dark backgrounds and view the affected gallery in a browser. Report what was verified.
