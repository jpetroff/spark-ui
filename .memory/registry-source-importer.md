# Ark/Zag source importer

For command-by-command checks, exact error messages, ledger interpretation, and recovery procedures, see [Import diagnostics and recovery](import-troubleshooting.md). This document describes the implementation; the runbook explains how to diagnose an interrupted or rejected operation.

## Purpose and boundaries

- Vendor editable Ark/Zag sources into registry installations; retain framework runtimes and third-party npm dependencies.
- Support React and Svelte. The committed `vendor.lock.json.components` is the authoritative list of imported public components; it currently includes Checkbox, Date Picker, Field, Dialog, Popover, Locale, and Environment. Button remains native.
- Work exclusively in `spark-ui`; sibling `ark` and `zag` are read-only source repositories.
- Permanent upstream branch: `vendor/upstream`. Its commit advances on successful baseline generation; inspect `git rev-parse vendor/upstream` rather than relying on a historical SHA.

## Implementation map

| File                        | Responsibility                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `scripts/vendor/graph.ts`   | Git snapshots, source resolution, dependency traversal, parser-based rewriting, canonical destinations. |
| `scripts/vendor/import.ts`  | Generation, lock manifest, npm range intersection, registry catalogs/artifacts, import verification.    |
| `scripts/vendor/command.ts` | Route imports to direct generation before bootstrap or branch updates afterward.                        |
| `scripts/vendor/update.ts`  | Clean-checkout enforcement, baseline regeneration, integration branches, ordinary Git merges.           |
| `scripts/vendor/ledger.ts`  | Local operation schema, atomic persistence, generation diagnostics, captured command output.            |
| `scripts/vendor/merge.ts`   | Review selection, merging into the checked-out target, ancestry checks, resumable branch cleanup.       |
| `scripts/vendor/aliases.ts` | Canonical cross-component aliases, root TypeScript path synchronization, Vite aliases.                  |
| `Makefile`                  | Positional/named batch imports, dry runs, bootstrap, updates, merge cleanup, verification.              |

## Source graph

- Read committed content with `git ls-tree` / `git show`; reject tracked upstream modifications.
- Pin full Ark/Zag SHAs. Defaults: lock revisions, then `HEAD` for first import. Override source locations with `ARK_SOURCE` / `ZAG_SOURCE`.
- `make update` / `make update-upstream` default each upstream ref to that source repository's `HEAD`. Branch-based imports default to the locked commits but honor exported `ARK_REF` / `ZAG_REF`. Direct generation and import dry runs use the lock or first-import `HEAD`, ignoring those two ref environment variables. See the runbook's precedence table before diagnosing an unexpected revision.
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
- Cross-component implementation imports use `@spark/<component>/...`; imports inside the same component stay relative. Importing synchronizes root `tsconfig.json` paths for all `packages/*/src` directories, preserving unrelated aliases.
- Shared identity is required for Field/provider contexts and Zag layer stacks, stores, and listeners.
- `vendor.lock.json` records importer version, upstream commits/versions, public entry closures, source mappings, source/generated hashes, external requirements, and starter paths.
- Direct regeneration refuses modified/deleted implementation files and collisions with unowned files. Baseline updates replace generated files and remove obsolete sources.
- Generate missing package-root `tsconfig.json` files for participating public components, internal dependencies, and shared source roots. Each extends `../../tsconfig.json` and includes `src`. Preserve existing configs, format newly generated configs and the root config, and commit them with the baseline. Package configs are editor boundaries and are excluded from registry source/starter lists. The root includes `ES2023.Array` for Date Picker's `findLastIndex` usage.
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
make import dialog popover
make import COMPONENTS="dialog popover"
pnpm vendor:import dialog popover --dry-run
make verify-imports
make bootstrap-upstream                 # once, clean committed initial import
make update-upstream                    # both upstream HEADs by default
# For explicit revisions, replace the example values with actual commits:
make update ARK_REF=ark-commit ZAG_REF=zag-commit
# After reviewing, checking, and committing all work on the review branch:
git switch main                         # or another intended target branch
pnpm vendor:merge                       # sole pending review operation
pnpm vendor:merge update/upstream-date-picker-SUFFIX
make merge-import BRANCH=update/upstream-date-picker-SUFFIX
```

- Supply one or more lowercase, hyphen-separated component names. Deduplicate names; reject positional names combined with `COMPONENT`/`COMPONENTS` or both variables together. Any nonempty `DRY_RUN` value enables the Makefile dry run, including `DRY_RUN=0`.
- Before bootstrap, imports generate directly in the working tree, record an `imported` operation, and leave changes for the caller to commit. They can run before the initial Spark commit, but still require an attached Git branch. No review branches or automatic registry build are created in this mode.
- After bootstrap, component imports use the update workflow. All existing components regenerate against one upstream pair. Batch component/dependency/ownership validation finishes before source writes; an invalid batch can still leave a candidate branch and failure record. Filesystem or later Git failures are not rolled back automatically.
- Generate on `vendor/candidate-<label>-<timestamp>-<hash>` from `vendor/upstream`; commit packages, source manifest, and root TypeScript config, then advance the permanent baseline. The label is the unique requested name or `<count>-components`; ordinary updates without names label the existing component set.
- Create `update/upstream-<same-suffix>` from the caller's branch; merge the baseline normally. Generate framework registry metadata and commit `registry.json` after a successful merge. This internal registry step does not run the full `pnpm registry:build` command or validation suites.
- Preserve source conflicts for manual resolution. Use `git merge --abort` to abort integration; generation failures retain the candidate for inspection. Aborting the integration merge does not undo the earlier `vendor/upstream` advance.
- Pending reviews share the advancing baseline. A later import from an older source branch can include components already present in `vendor/upstream` from an earlier pending review; branch labels describe requested names, not an isolated generated component set. Inspect resulting components and the diff.
- Require a clean checkout for branch operations. Commits use configured Git identity or `Spark UI Importer <spark-ui-importer@localhost>` without changing Git configuration.
- Import dry runs call direct generation against the current checkout, even after bootstrap. They create no ledger, branches, source/config writes, or registry artifacts, and can reject local customizations that an isolated baseline update could merge successfully.

## Local ledger and merge cleanup

- `vendor.lock.json` is the committed source/dependency manifest. `.import.lock.json` is a separate, Git-ignored local operation history with `{ version: 1, operations: [...] }`; it is also excluded from Prettier. It is not a concurrency mutex or a replacement for Git history.
- Applying public imports, applying the low-level generation CLI, and ordinary updates record operations. Bootstrap, dry runs, registry generation, and verification do not start new operation records. A missing ledger starts a fresh history on import; a malformed existing ledger blocks writing. Merge requires an existing valid ledger.
- Each record retains an ID, mode, requested/resulting component lists, source branch/commit, upstream revisions, optional generation report, candidate/review refs and commits, phase/status, timestamped events, and optional merge/cleanup results. Early failure can leave later fields absent. First-import source commit can be `null`.
- Writes use a unique temporary file and atomic rename. Captured Git/registry commands record their invocation and stdout/stderr; successful stderr is classified as `warning`, including ordinary Git progress, while failed command output is classified as `error`. Preflight errors before a record exists remain terminal-only. See the runbook for all logging limits.
- `vendor:merge` selects a ledger review branch, automatically only when exactly one operation with a review reference remains non-`complete`. It accepts no candidate branch and performs no remote operations. The destination is the branch checked out when merging, which may differ from the import's starting branch.
- Require a clean, attached target branch outside the permanent/candidate/review service namespaces. Verify that the review tip includes both its recorded review commit and candidate commit. After a merge attempt, retries must use its recorded target, and the review tip cannot change during an unfinished target merge.
- Merge normally, preserving conflicts. After a manual resolution and commit, rerunning recognizes that the review tip is already included. A recorded successful merge must remain in the target's ancestry before cleanup resumes.
- Cleanup considers only that operation's recorded candidate and review branches. Each existing tip must match its expected commit, be included in the target, and be absent from other worktrees. Delete with `git branch -d`; treat already absent branches as `missing`. Preserve changed, unmerged, or checked-out branches and record why.
- If all cleanup succeeds, set `complete`; otherwise leave `merged` with retained-branch reasons and exit nonzero even though the merge succeeded. Retrying cleanup does not repeat the merge. Keep `vendor/upstream` and unrelated branches. Old branches without ledger records are not discovered or deleted automatically.
- `ready` means generation and registry metadata succeeded. Import and merge scripts do not automatically run type checks, tests, full builds, or consumer checks. Manually recovered records can still say `failed`/`conflicted` until merge; ancestry and checkout checks determine eligibility.

## Validation/toolchain

- Node >=22.18, pnpm 12.16.1. App compiler: TypeScript 7; parser API: TypeScript 6.
- `packages/vendor-tools` isolates Svelte checking with TypeScript 6. Dedicated configs cover imported React, Svelte, and importer code.
- Preserve upstream formatting; generated implementation sources/metadata and the local ledger are excluded from Prettier. New package configs and the root TypeScript config are formatted during import.
- `pnpm test:importer`: parsing, canonical identity/cycles, range constraints, aliases, registry boundaries, batch commands, source/config preservation, Git updates, merge conflicts, current-target selection, ledger errors, and retryable cleanup. The tooling implementation was validated with 35 tests; the live suite is authoritative for future counts.
- `pnpm check`: alias drift, app/workspace types, imported React/Svelte types, importer types, and authored formatting. `pnpm verify-imports` checks registered import boundaries; neither command is run automatically by `vendor:merge`.
- `pnpm test:registry`: real React/Svelte CLIs, isolated consumers, reversed install order, framework isolation, type checks.
- `pnpm test:browser`: run after registry tests; SSR/hydration, Field context, RTL, nested dismissal, focus and scroll restoration in Chromium.
- Fixtures live in ignored `.vendor-tests/`; `PLAYWRIGHT_CHROMIUM_EXECUTABLE` selects an existing browser.
- The batch-import/merge-cleanup change passed `pnpm test:importer`, `pnpm typecheck:importer`, `pnpm check`, and `pnpm registry:build`. Registry consumer/browser suites and full app/Storybook builds are separate checks; do not infer that a new import passed them from its ledger status.
