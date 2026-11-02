# Import starter templates

`make import …` seeds missing customization files from this directory. Edit these files to change future imports; existing components and configs are preserved. Templates are read from the invoking branch before the update workflow switches to the upstream baseline. No template migration runs.

| Template                                                    | Destination / use                                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `tsconfig.json`                                             | `packages/<component>/tsconfig.json`, including internal and shared packages     |
| `react.tsx.template`                                        | `packages/<component>/src/react.tsx` for compound components                     |
| `svelte.ts.template`                                        | `packages/<component>/src/svelte.ts` for compound components                     |
| `svelte-composition.svelte.template`                        | `packages/<component>/src/svelte/<component>-composition.svelte`                 |
| `react-exports.tsx.template` / `svelte-exports.ts.template` | Public barrels for providers and utilities without a matching compound namespace |
| `styles.css.template`                                       | `packages/<component>/src/styles.css`                                            |
| `recipe-import.ts.template`                                 | Optional commented import when that component already has `recipe.css`           |

Compound entries export the component as `Object.assign(AssembledComponent, ComponentParts)`. Initially the assembly forwards Root props and children. Add labels, controls, layout, and typed part props to the generated assembly as needed. All upstream subcomponents remain attached, for example `Accordion.Item`. React markup lives in the public index; Svelte markup lives in its composition file. Root props may require additional component-specific content before the component is useful.

Templates use literal `{{name}}` placeholders with no spaces. Available values:

| Placeholder             | Meaning                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| `{{component}}`         | Hyphenated package name, such as `date-picker`                     |
| `{{componentName}}`     | Matching upstream namespace, such as `DatePicker`                  |
| `{{entryImport}}`       | Relative import from the public index to the upstream barrel       |
| `{{compositionImport}}` | Relative import from the Svelte index to its composition           |
| `{{partsImport}}`       | Relative import from the Svelte composition to the upstream barrel |
| `{{propsImport}}`       | Relative import from the Svelte composition to its public props    |
| `{{recipeImport}}`      | Optional recipe import comment, or an empty string                 |

Unknown placeholders fail generation before source writes. Keep `tsconfig.json` valid JSON; it is copied and formatted without substitutions. Template filenames and output paths are mapped in `scripts/vendor/templates.ts`; the template bodies contain the editable file contents. `.template` files are text inputs rather than compiled TypeScript/Svelte files.

Composition helpers are recorded as starters in `vendor.lock.json` and included in Svelte registry items. Package configs remain outside registry sources. Source graph files, licenses, registry metadata, and manifests are generated from upstream/data and do not use starter templates.

Run `pnpm test:importer` after changing template routing or rendering. Its isolated fixtures check new imports, preservation, dry runs, branch updates, registry inclusion, and React/Svelte type checking without migrating the repository's existing components.
