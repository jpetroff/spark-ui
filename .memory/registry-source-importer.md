# Ark/Zag source importer

## Purpose and boundaries

- Vendor editable Ark/Zag sources into registry installations; retain framework runtimes and third-party npm dependencies.
- Support React and Svelte. Public imports: Checkbox, Field, Dialog, Popover, Locale, Environment. Button remains native.
- Work exclusively in `spark-ui`; sibling `ark` and `zag` are read-only source repositories.
- Initial baseline: `63de186`; permanent upstream branch: `vendor/upstream`.

## Implementation map

| File                        | Responsibility                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `scripts/vendor/graph.ts`   | Git snapshots, source resolution, dependency traversal, parser-based rewriting, canonical destinations. |
| `scripts/vendor/import.ts`  | Generation, lock manifest, npm range intersection, registry catalogs/artifacts, import verification.    |
| `scripts/vendor/command.ts` | Route imports to direct generation before bootstrap or branch updates afterward.                        |
| `scripts/vendor/update.ts`  | Clean-checkout enforcement, baseline regeneration, integration branches, ordinary Git merges.           |
| `Makefile`                  | Positional/named component imports, dry runs, bootstrap, updates, verification.                         |

## Source graph

- Read committed content with `git ls-tree` / `git show`; reject tracked upstream modifications.
- Pin full Ark/Zag SHAs. Defaults: lock revisions, then `HEAD` for first import. Override source locations with `ARK_SOURCE` / `ZAG_SOURCE`.
- Ark roots: `packages/react/src`, `packages/svelte/src/lib`.
- Discover upstream packages from manifests. Resolve relative paths, package exports/conditions/wildcards, and Svelte `$lib` aliases.
- Parse TS/TSX with `typescript-parser` (TypeScript 6 alias); parse Svelte scripts with `svelte/compiler` plus TypeScript.
- Rewrite imports, re-exports, import types, literal dynamic imports, and external module references. Reject nonliteral module loads.
- Narrow named imports through explicit pure re-export barrels only when the owning package declares `sideEffects: false`. Retain star barrels.
- Traverse runtime and type edges; deduplicate cycles by source identity. Reject production edges into tests, stories, or examples.
- Validate selected Zag package versions against Ark's declared requirements. Intersect external npm ranges; reject unsatisfiable constraints.

## Ownership and customization

```text
packages/<component>/src/
  common/zag/<machine>/   # component machine
  react/ark/             # Ark React implementation
  svelte/ark/            # Ark Svelte implementation
  react.tsx              # public exports/customization; seeded once
  svelte.ts              # public exports/customization; seeded once
  styles.css             # seeded once
packages/shared/src/
  common/zag/            # shared utilities, core, store
  react/{ark,zag}/       # providers/helpers and React adapter
  svelte/{ark,zag}/      # providers/helpers and Svelte adapter
  licenses/              # upstream license notices
```

- Each upstream module has one canonical destination. Cross-component dependencies reference canonical component sources, including internal components such as Presence.
- Shared identity is required for Field/provider contexts and Zag layer stacks, stores, and listeners.
- `vendor.lock.json` records importer version, upstream commits/versions, public entry closures, source mappings, source/generated hashes, external requirements, and starter paths.
- Direct regeneration refuses modified/deleted implementation files and collisions with unowned files. Baseline updates replace generated files and remove obsolete sources.
- Registry sources must be registered in the locked graph/starter list. New local helper files require importer registration before publication; consumer-owned installed copies have no generation restriction.

## Registry generation

- `pnpm registry:build`: build native registry with shadcn, then generate both framework catalogs and artifacts.
- Compose public React items into `registry.json`; generate ignored `registry.react.json` and `registry.svelte.json` catalogs.
- Emit one internal item per source module. Each public item lists its complete source closure directly, avoiding registry dependency cycles.
- Install under the UI alias: `<component>/index.tsx` for React, `<component>/index.ts` for Svelte; shared sources under `_spark/`.
- Recalculate relative imports for installed paths. React uses `registry:file` with `@ui/` targets; Svelte uses `registry:ui` with relative UI targets.
- Declare external runtime packages and required ambient types in registry metadata. Preserve Ark/Zag licenses.
- `REGISTRY_BASE_URL` defaults to `http://localhost:5173/r`. Release identity hashes lock metadata, source contents, target-policy marker, and base URL.
- Emit immutable dependencies under `public/r/<release>/<framework>/`; public aliases under `public/r/<framework>/`. React also has root public aliases.
- Publish the complete output and retain old release directories. Upgrade interacting components together; consumer upgrades do not perform three-way merges.

## Import/update commands

```sh
make import checkbox DRY_RUN=1
make import checkbox                    # or COMPONENT=checkbox
make verify-imports
make bootstrap-upstream                 # once, clean committed initial import
make update-upstream ARK_REF=<sha> ZAG_REF=<sha>
```

- After bootstrap, component imports use the update workflow. All existing components regenerate against one upstream pair.
- Generate on `vendor/candidate-<suffix>` from `vendor/upstream`; commit packages/lock and advance the permanent baseline.
- Create `update/upstream-<suffix>` from the caller's branch; merge the baseline normally. Rebuild and commit registry metadata after a successful merge.
- Preserve source conflicts for manual resolution. Use `git merge --abort` to abort integration; generation failures retain the candidate for inspection.
- Require a clean checkout for branch operations. Commits use configured Git identity or `Spark UI Importer <spark-ui-importer@localhost>` without changing Git configuration.

## Validation/toolchain

- Node >=22.18, pnpm 12.16.1. App compiler: TypeScript 7; parser API: TypeScript 6.
- `packages/vendor-tools` isolates Svelte checking with TypeScript 6. Dedicated configs cover imported React, Svelte, and importer code.
- Preserve upstream formatting; generated sources/metadata are excluded from Prettier.
- `pnpm test:importer`: 14 tests covering parsing, canonical identity/cycles, range constraints, entry extensions, and Git merge/update behavior.
- `pnpm test:registry`: real React/Svelte CLIs, isolated consumers, reversed install order, framework isolation, type checks.
- `pnpm test:browser`: run after registry tests; SSR/hydration, Field context, RTL, nested dismissal, focus and scroll restoration in Chromium.
- Fixtures live in ignored `.vendor-tests/`; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` selects an existing browser.
- Initial validation passed importer tests, registry/browser suites, `pnpm check`, `pnpm build`, and `pnpm storybook:build`. Reimporting identical revisions produced no source changes.
