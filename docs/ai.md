# Working with Toto using AI assistants

This kit gives an arriving assistant the repository's actual structure, visual identity, asset contracts and verification commands. It follows the shared-workflow layout used by our other repositories, adapted to a small static mascot site.

## Entry points

| File | Purpose |
| --- | --- |
| [AGENTS.md](../AGENTS.md) | Maintained project instructions, source files and working conventions |
| [CLAUDE.md](../CLAUDE.md), [GEMINI.md](../GEMINI.md) | Imports of the common instructions |
| [Copilot instructions](../.github/copilot-instructions.md) | Short project-specific guidance pointing to AGENTS.md |
| [llms.txt](../llms.txt) | Linked index for models choosing which documents to read |
| [llms-full.txt](../llms-full.txt) | The same documentation and asset metadata in one file |
| [Pose manifest](../assets/poses/manifest.json) | Stable pose IDs, paths, dimensions, bilingual alt text and intended use |
| [Trademark metadata](../assets/brand/trademark.json) | Locally recorded brand data; not a live registry verification |

The original artwork and [identity guide](identidad.md) define Toto. Machine-readable descriptions do not replace visual review. The [license](../LICENSE.md) remains proprietary with a limited permission to display official assets; the AI kit does not broaden that permission.

## Skills

The maintained workflow lives in `.claude/skills/`. Each matching `.agents/skills/` entry links to that same file rather than duplicating it.

| Workflow | Codex entry | Shared checklist |
| --- | --- | --- |
| Add or revise a pose | [toto-add-pose](../.agents/skills/toto-add-pose/SKILL.md) | [Artwork and catalog workflow](../.claude/skills/toto-add-pose/SKILL.md) |
| Maintain the presentation | [toto-update-site](../.agents/skills/toto-update-site/SKILL.md) | [Bilingual website and icons](../.claude/skills/toto-update-site/SKILL.md) |
| Verify a change | [toto-verify-change](../.agents/skills/toto-verify-change/SKILL.md) | [Local and browser verification](../.claude/skills/toto-verify-change/SKILL.md) |

Start the assistant in the Toto repository so its local guidance and skills can be discovered. If the chat uses another workspace, explicitly read this repository's `AGENTS.md` and the applicable workflow. Mentioning a path alone does not change a chat's working directory or permissions. These instructions do not grant filesystem, network or publication access. `.claude/settings.json` only configures Claude Code's named local commands; other assistants use their own environment permissions.

## Maintain and verify the kit

```sh
npm run generate
npm run check
```

The generator updates the pose catalogs plus both `llms` files. Edit pose definitions in `tools/catalog.cjs` and the documentation list in `tools/llms.cjs`; the generated outputs are checked in. Adding a document under `docs/` requires adding it to that list.

`npm run check` validates existing artwork, catalogs and page assets, then runs the kit integrity tests. `npm run check:ai` runs only the latter. All use Node.js 18+ without installing dependencies. `node tools/webp.cjs` additionally needs `cwebp`; it is only needed when changing the PNG/WebP collection. The generators do not create new artwork or rebuild the favicon ZIP.

The tests verify local document links and image paths, executable npm-script references, shared skill metadata/routing, allowed-command targets, documentation coverage and freshness of the generated files. They do not prove remote link availability, publication, browser behavior, email rendering, legal status or a particular assistant's decisions. Use real browser checks when changing the presentation.
