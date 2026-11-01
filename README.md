# Spark UI

A pnpm workspace for React components distributed as source through a [shadcn registry](https://ui.shadcn.com/docs/registry). Each component is a private development package. Consumers copy components into their own codebase with the shadcn CLI.

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
    package.json             @spark-ui/button, private, source exports
    tsconfig.json
    src/
      button.tsx             Source copied into consumer projects
      button.stories.tsx      Stories colocated with the component
      index.ts               Local workspace entry point
  utils/                     @spark-ui/utils, shared source utilities
src/                         Vite playground and shared preview styles
components.json              Local shadcn aliases and Tailwind configuration
registry.json                Installable items and their source files
public/r/                    Generated registry JSON (gitignored)
```

Workspace package exports resolve `@spark-ui/button` and `@spark-ui/utils` directly to TypeScript source. Declare new workspace dependencies with `workspace:*` in the importing package. The playground declares its dependencies in the root `package.json`.

TypeScript `paths` also provide `@/*` for playground source, `@/components/ui/<name>` for component package entry points, and `@/lib/spark-utils` for the shared utility. Vite's `resolve.tsconfigPaths` reads those same mappings, including in Storybook; keep mappings in `tsconfig.json` rather than duplicating them in Vite.

## Registry installation

Start `pnpm dev`, then run this from a consumer project already initialized with shadcn and Tailwind CSS v4:

```sh
pnpm dlx shadcn@latest add http://localhost:5173/r/button.json
```

The registry copies `button.tsx` into the consumer's UI directory and `spark-utils.ts` into its lib directory, rewriting aliases to match the consumer's `components.json`. It also installs `clsx` and `tailwind-merge`. The copied files have no `@spark-ui/*` imports. The component uses the consumer's standard shadcn theme tokens; playground styles are not shipped with it.

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

1. Create `packages/<name>/package.json` with `name: "@spark-ui/<name>"`, `private: true`, `type: "module"`, and an export pointing to `./src/index.ts`. Declare runtime dependencies and React peer dependencies there.
2. Extend `../../tsconfig.json` from the package's `tsconfig.json`, include `src`, and add a `typecheck` script (`tsc --noEmit`).
3. Add `src/<name>.tsx`, its exports in `src/index.ts`, and `src/<name>.stories.tsx`. Storybook automatically discovers all package stories and generates component documentation.
4. Add an item to `registry.json` listing every source file and external dependency required by the copied component. Exclude package manifests, barrels used only for development, and stories. Use `registry:ui`, `registry:lib`, or `registry:hook` file types to choose consumer destinations.
5. Keep distributed imports consumer-compatible: use `@/components/ui/<name>` for other components and `@/lib/...` for utilities, with matching TypeScript paths. Include dependent source files or declare `registryDependencies` using a full item URL or a configured namespace. Bare dependency names resolve to the official shadcn registry.
6. Declare `"@spark-ui/<name>": "workspace:*"` in any workspace package or playground that imports it, then run `pnpm install`.
7. Run the checks below and install the generated item into a separate shadcn project to verify aliases and dependencies.

Do not introduce workspace-only imports into files listed in `registry.json`; those files must work after copying into the consumer's repository.

## Commands

| Command                | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `pnpm dev`             | Build registry JSON and start the Vite playground                        |
| `pnpm storybook`       | Build registry JSON and start all component stories                      |
| `pnpm build`           | Typecheck, build registry JSON, and build the playground into `dist/`    |
| `pnpm storybook:build` | Build registry JSON and static Storybook into `storybook-static/`        |
| `pnpm registry:build`  | Rebuild installable JSON in `public/r/` after source or metadata changes |
| `pnpm typecheck`       | Check playground, config, stories, and workspace packages                |
| `pnpm check`           | Run TypeScript and formatting checks                                     |
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
pnpm dlx shadcn add http://localhost:5173/r/react/checkbox-react.json
pnpm dlx shadcn-svelte add http://localhost:5173/r/svelte/checkbox-svelte.json
```

Replace the component name with `field`, `dialog`, `popover`, `locale`, or `environment`. React public items are also included in the root `registry.json`. `registry.react.json` and `registry.svelte.json` are generated catalogs.

The installed layout is `<ui alias>/<component>/index.tsx` (React) or `index.ts` (Svelte), `styles.css`, `react/` or `svelte/`, and `common/`. Shared files install under `<ui alias>/_spark/`. Sources retain normal relative imports; no Spark workspace aliases, Ark packages, or Zag packages are required. Each source module has one canonical target and one internal registry item; a public item explicitly lists its complete dependency closure, avoiding registry cycles. Installing another component reuses the same context/store/layer-stack files.

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
make update-upstream ARK_REF=<ark-commit> ZAG_REF=<zag-commit>
```

The command regenerates all previously imported components on a `vendor/candidate-*` branch, advances `vendor/upstream`, then merges it into a new `update/upstream-*` branch based on your current branch. Once bootstrapped, `make import <new-component>` uses this same workflow. Compatible Ark/Zag versions are required; the importer checks Ark's declared Zag requirements against the selected source versions.

Generated commits use your Git identity when configured, otherwise the explicit automation identity `Spark UI Importer <spark-ui-importer@localhost>` without changing Git configuration. No automatic conflict resolution favors upstream. Resolve source conflicts and commit, then run `pnpm registry:build`, commit the regenerated `registry.json`, and validate before merging the update branch. `git merge --abort` aborts a conflicted integration. A generation failure leaves the candidate branch available for inspection and preserves your original branch. Do not merge candidate branches directly or delete the permanent baseline branch. This v1 workflow updates Spark; it does not update customized copies in consuming projects.

### Importer validation

```sh
pnpm test:importer       # parsing, dependency closure, version constraints, Git merge conflicts
pnpm verify-imports
pnpm check              # app, imported React/Svelte types, authored formatting
pnpm build
pnpm storybook:build
pnpm test:registry       # real CLIs, isolated installs, reversed installation order, type checks
pnpm exec playwright install chromium
pnpm test:browser        # run after test:registry; uses its installed consumer fixtures
```

Consumer fixtures live under ignored `.vendor-tests/`. Browser checks render on the server and hydrate in Chromium, then exercise Field/Checkbox context, RTL provider propagation, nested Dialog/Popover dismissal, focus restoration, and scroll restoration in both frameworks. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` can select an existing Chromium binary. Automated merge fixtures cover independent edits, overlapping changes, additions, upstream deletion, and deletion of locally modified files.
