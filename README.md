# Spark UI

A pnpm workspace for React components distributed as source through a [shadcn registry](https://ui.shadcn.com/docs/registry). Components live in source directories and share the root project dependencies and TypeScript aliases. Consumers copy components into their own codebase with the shadcn CLI.

## Getting started

Use Node.js 22.18+ and pnpm 12.16.1 (pinned in `package.json`). Install pnpm using the [official installation instructions](https://pnpm.io/installation) if it is unavailable.

```sh
pnpm install
pnpm dev        # Vite playground and registry: http://localhost:5173
pnpm storybook  # All component stories: http://localhost:6006
```

## Workspace

```text
.storybook/                  Shared Storybook configuration
packages/
  button/
    tsconfig.json
    src/
      react.tsx              Public React entry point
      svelte.ts              Public Svelte entry point
      styles.css             Component stylesheet
      react/button.tsx       Native React implementation
      svelte/button.svelte   Native Svelte implementation
      common/variants.ts     Shared classes, variants, and sizes
      button.stories.tsx      Stories colocated with the component
  utils/                     @spark-ui/utils, shared source utilities
src/                         Vite playground and shared preview styles
components.json              Local shadcn aliases and Tailwind configuration
registry.json                Installable items and their source files
public/r/                    Generated registry JSON (gitignored)
```

Component directories do not need package manifests: local imports use TypeScript source aliases, and registry consumers copy the source. `utils` retains a private workspace manifest for `clsx` and `tailwind-merge`; `vendor-tools` isolates the Svelte tooling dependencies. Shared development and framework dependencies belong in the root `package.json`.

TypeScript `paths` provide `@/*` for playground source, `@/components/ui/<name>` for component package entry points, and `@/lib/spark-utils` for the shared utility. Vite's `resolve.tsconfigPaths` reads those same mappings, including in Storybook; keep mappings in `tsconfig.json` rather than duplicating them in Vite.

Cross-component implementation imports use `@spark/<name>/…`, which resolves to `packages/<name>/src/…`. For example:

```ts
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { useFieldContext } from '@spark/field/react/ark/use-field-context.ts'
```

Keep relative imports within the same component's `src` tree, including `../`. The `@spark/<name>/*` mappings are generated in the root `tsconfig.json` from all `packages/<name>/src` directories, including internal dependencies such as Presence. Run `pnpm aliases:sync` after adding or removing a source root; `pnpm aliases:check` detects missing, incorrect, or stale mappings and runs as part of `pnpm check`. Unrelated aliases remain unchanged. Component imports synchronize aliases automatically. Each source directory has a `tsconfig.json` extending `../../tsconfig.json` with `include: ["src"]`, so editors inherit these aliases even for files outside the root project include. These configs provide editor project boundaries; use the root React and Svelte checks for framework-aware validation. Vite derives explicit aliases from the same entries so files outside the root tsconfig's `include` resolve in both the playground and Storybook.

## Registry installation

Start `pnpm dev`, then run this from a consumer project already initialized with shadcn and Tailwind CSS v4:

```sh
pnpm dlx shadcn@latest add http://localhost:5173/r/button.json
```

Button uses the same framework layout as the other components: `button/index.tsx` for React or `button/index.ts` for Svelte, plus its framework implementation, shared variants, and stylesheet. The registry also includes `utils/spark-utils.ts` and installs `clsx` and `tailwind-merge`. Imports are rewritten to relative paths; consumers need no Spark aliases. The existing `button.json` URL remains a React alias for `button-react.json`. The component uses the consumer's standard shadcn theme tokens; playground styles are not shipped with it.

Registry JSON is also served by Storybook at `http://localhost:6006/r/button.json`. To publish, set `homepage` in `registry.json` to your production URL, run a build, and host either `dist/` or `storybook-static/` as static files. Consumers can then use the deployed item URL or configure their own namespace:

```json
{
  "registries": {
    "@spark-ui": "https://YOUR_HOST/r/{name}.json"
  }
}
```

```sh
pnpm dlx shadcn@latest add @spark-ui/button
```

The registry homepage initially points to the local playground. No public hosting address is configured.

## Adding a component

1. Create `packages/<name>/src` and a component-root `tsconfig.json` extending `../../tsconfig.json` with `include: ["src"]`. A component package manifest is unnecessary.
2. Add the public entry files and any colocated stories. Storybook automatically discovers all package stories and generates component documentation. Keep imports within a component relative, including explicit file extensions; use `@spark/<name>/…` for local cross-component imports.
3. Run `pnpm aliases:sync` to add the new source alias. Declare shared development and framework dependencies in the root `package.json`.
4. Add an item to `registry.json` listing every source file and external dependency required by the copied component. Exclude development configs, barrels used only for development, and stories. Use `registry:ui`, `registry:lib`, or `registry:hook` file types to choose consumer destinations.
5. For native items without framework metadata, keep distributed imports consumer-compatible: use `@/components/ui/<name>` for other components and `@/lib/...` for utilities, with matching TypeScript paths. Include dependent source files or declare `registryDependencies` using a full item URL or a configured namespace. Bare dependency names resolve to the official shadcn registry.
6. Run the checks below and install the generated item into a separate shadcn project to verify aliases and dependencies.

Native framework items declare `meta.framework` (`react` or `svelte`) in `registry.json` and list their complete source files and npm dependencies. The framework registry builder resolves their `@spark/` imports to portable relative paths, just as it does for vendored Ark/Zag sources. Native entries without framework metadata must use consumer-compatible imports.

## Commands

| Command                | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `pnpm dev`             | Build registry JSON and start the Vite playground                        |
| `pnpm storybook`       | Build registry JSON and start all component stories                      |
| `pnpm build`           | Typecheck, build registry JSON, and build the playground into `dist/`    |
| `pnpm storybook:build` | Build registry JSON and static Storybook into `storybook-static/`        |
| `pnpm registry:build`  | Rebuild installable JSON in `public/r/` after source or metadata changes |
| `pnpm typecheck`       | Check playground, config, stories, and workspace packages                |
| `pnpm check`           | Check alias drift, TypeScript, and formatting                            |
| `pnpm aliases:sync`    | Regenerate `@spark` mappings from component source roots                 |
| `pnpm aliases:check`   | Verify `@spark` mappings without changing configuration                  |
| `pnpm format`          | Format repository source and configuration                               |
| `pnpm preview`         | Preview the production playground build                                  |

Registry JSON is generated before either dev server starts. Re-run `pnpm registry:build` after editing source to refresh the copy served at `/r/`; component previews update through Vite HMR.

## Editable Ark/Zag imports

Ark and Zag are read-only upstream sources in sibling `../ark` and `../zag` checkouts. The importer reads **committed Git objects**, pins both commits in `vendor.lock.json`, and never changes those repositories. Set `ARK_SOURCE` / `ZAG_SOURCE` to override their locations. The current imports include Checkbox, Field, Dialog, Popover, Locale, and Environment for React and Svelte; Button stays native.

```sh
make import checkbox DRY_RUN=1  # dependency/file/change report, no writes
make import checkbox            # equivalent: make import COMPONENT=checkbox
make verify-imports
pnpm registry:build
```

Node 22.18+ with built-in TypeScript stripping is required for importer commands (the development environment uses Node 26). `package.json` pins pnpm. The private `vendor-tools` workspace supplies TypeScript 6 for Svelte's language tools; the app remains on TypeScript 7.

Each component has editable `react.tsx`, `svelte.ts`, and `styles.css` entry files under `packages/<name>/src`. Ark implementation lives in the framework folders; Zag machines live in `common/zag`. Framework adapters, providers, and shared utilities live in `packages/shared/src`. Provider entrypoints reference those same shared context modules. Internal cross-component sources, such as Presence, are included automatically without forcing a public styled component installation.

Public entry files and CSS are seeded once. Add wrappers and exports there, or edit implementation files directly. The importer rejects direct regeneration over locally modified/deleted implementation files; use the merge workflow below. Keep registered source paths stable. The registry verifier rejects unregistered file imports: register additional source files in the import tooling before publishing new local modules. Installed consumer copies are entirely owned by the consumer and have no such generation constraint.

### Registry installation

```sh
pnpm dlx shadcn add http://localhost:5173/r/react/button-react.json
pnpm dlx shadcn-svelte add http://localhost:5173/r/svelte/button-svelte.json
```

Replace the component name with `checkbox`, `field`, `dialog`, `popover`, `locale`, or `environment`. React public items and native framework items are included in the root `registry.json`. `registry.react.json` and `registry.svelte.json` are generated catalogs.

The installed layout is `<ui alias>/<component>/index.tsx` (React) or `index.ts` (Svelte), `styles.css`, `react/` or `svelte/`, and `common/`. Shared files install under `<ui alias>/_spark/`. Workspace `@spark/` imports are rewritten to normal relative imports during registry generation; consumers need no Spark aliases, Ark packages, or Zag packages. Each source module has one canonical target and one internal registry item; a public item explicitly lists its complete dependency closure, avoiding registry cycles. Installing another component reuses the same context/store/layer-stack files.

Third-party packages such as Floating UI, Internationalized Date, and framework runtimes remain npm dependencies. Node ambient types are declared because upstream sources reference `process` and `Error.captureStackTrace`. Preserve the included Ark/Zag license notices when redistributing.

For production, set the public registry URL before building:

```sh
REGISTRY_BASE_URL=https://your-domain.example/r pnpm registry:build
```

Publish the entire `public/r` directory. Retain previous release directories: public aliases point to immutable, content-addressed release dependencies. Release identity includes the locked graph, source contents, and registry base URL. Do not mix shared sources from different releases in one consumer project; upgrade interacting components together. Registry CLI overwrite is not a three-way merge for consumer customizations.

### Upstream update branches

Bootstrap **once**, after committing the initial import and before customizing upstream implementation files:

```sh
make bootstrap-upstream
```

This creates `vendor/upstream` from the clean committed baseline. It intentionally refuses a dirty checkout or implementation files that no longer match their generated hashes.

```sh
make update
```

By default, this uses the committed `HEAD` of the sibling `../ark` and `../zag` folders. Check out the desired compatible branches in those repositories first; tracked changes must be committed or stashed. The updater never switches or modifies their branches. Set `ARK_SOURCE` / `ZAG_SOURCE` to override the folders.

To select specific commits instead, pass either or both refs (an omitted ref still defaults to its local `HEAD`):

```sh
make update ARK_REF=<ark-commit> ZAG_REF=<zag-commit>
```

`make update-upstream` remains an alias with the same options. The command regenerates all previously imported components on a `vendor/candidate-*` branch, advances `vendor/upstream`, then merges it into a new `update/upstream-*` branch based on your current branch. Once bootstrapped, `make import <new-component>` uses this same workflow at the revisions pinned in `vendor.lock.json`. Compatible Ark/Zag versions are required; the importer checks Ark's declared Zag requirements against the selected source versions.

Generated commits use your Git identity when configured, otherwise the explicit automation identity `Spark UI Importer <spark-ui-importer@localhost>` without changing Git configuration. No automatic conflict resolution favors upstream. Resolve source conflicts and commit, then run `pnpm registry:build`, commit the regenerated `registry.json`, and validate before merging the update branch. `git merge --abort` aborts a conflicted integration. A generation failure leaves the candidate branch available for inspection and preserves your original branch. Do not merge candidate branches directly or delete the permanent baseline branch. This v1 workflow updates Spark; it does not update customized copies in consuming projects.

### Importer validation

```sh
pnpm test:importer       # parsing, dependency closure, version constraints, Git merge conflicts
pnpm verify-imports
pnpm check              # alias drift, app, imported React/Svelte types, authored formatting
pnpm build
pnpm storybook:build
pnpm test:registry       # real CLIs, isolated installs, reversed installation order, type checks
pnpm exec playwright install chromium
pnpm test:browser        # run after test:registry; uses its installed consumer fixtures
```

Consumer fixtures live under ignored `.vendor-tests/`. Browser checks render on the server and hydrate in Chromium, then exercise Field/Checkbox context, RTL provider propagation, nested Dialog/Popover dismissal, focus restoration, and scroll restoration in both frameworks. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can select an existing Chromium binary. Automated merge fixtures cover independent edits, overlapping changes, additions, upstream deletion, and deletion of locally modified files.
