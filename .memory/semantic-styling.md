# Semantic styling foundation

Updated 2026-11-02: functional defaults and editable component APIs replace the earlier styled/functional entry split. See [the consumer guide](../packages/styles/README.md) and [the source importer note](registry-source-importer.md).

## Current contract

Spark distributes ordinary CSS, stable component classes, Ark state attributes, and optional semantic `--spark-*` sample tokens. React and Svelte share CSS. Tailwind, CSS Modules, providers, application-level theme imports, and a reset are not required.

Each visual component has one public entry per framework (`react.tsx` or `svelte.ts`), installed as the component's `index.tsx` or `index.ts`. The entry imports `styles.css` and contains a commented `import './recipe.css'`. There are no `functional-react.tsx` or `functional-svelte.ts` entrypoints. Component imports stay identical across styling modes.

`styles.css` imports shared `styles/index.css` plus the component's `functional.css`. The foundation loads native cascade layers, `functional-tokens.css` (overlay base and visually-hidden size only), and visibility helpers. Importing a default component must not load palette, dimensions, typography, or recipes.

A component `recipe.css` imports shared `sample.css`, then defines optional appearance. The shared sample imports the functional foundation, visual `tokens.css`, light/dark `theme.css`, and the Fieldset recipe. Uncommenting a single component recipe enables the shared sample and that component's appearance. It does not enable other component recipes. Downloading the files alone has no styling effect.

Visual sample files remain installed as ordinary registry files, rather than automatically applied `registry:theme` items. Application-owned CSS or CSS Modules can replace recipes entirely. Project sample-token overrides belong in application-owned CSS to survive forced registry overwrites. Normal installation preserves edited distributed files when overwrite is declined.

## Editable examples

Button, Checkbox, Field, Dialog, Popover, and Date Picker expose additive `*Example` compositions. Their public entries document usage and typed `parts` APIs for every rendered nested primitive. Existing compound primitives, hooks, props, refs, polymorphism, and events remain available.

React examples are implemented in the public entry. Svelte entries define their documented interfaces and export small `svelte/<component>-example.svelte` files. Those files import interface types only from the public entry; registry rewriting preserves the installed paths. Svelte wrappers forward state/callbacks through part props; direct bindable refs/state use the primitives or an explicitly customized wrapper.

Examples deliberately illustrate editable APIs, rather than establish a required product API. FieldExample is an input composition. DatePickerExample fixes single selection and day view and renders a complete selectable day grid; range/month/year composition stays available through primitives. Every visual component has a customized-wrapper Storybook example. Locale and Environment entries document existing provider APIs and have no visual recipe.

## CSS layering and optional Tailwind

`@layer` is native CSS, not Tailwind notation. The default order is:

```css
@layer spark.tokens, spark.theme, spark.base, spark.components;
```

Low-specificity sample recipes occupy `spark.components`; normal unlayered application rules override them. Important visibility declarations deliberately retain priority. No Tailwind directives, utility classes, layer names, adapter imports, or build plugin are needed for default components or the workshop. Workshop/Storybook presentation explicitly imports sample recipes using plain CSS.

Tailwind projects can declare their complete layer order before any component styles, load Tailwind in their own build, optionally import `styles/tailwind.css`, and put utility strings in `className`/`class` or `parts`. The consumer guide contains the opt-in setup. The adapter only maps variables; it supplies neither defaults nor recipes. Keep Tailwind scanning configured for copied sources. `cn` combines classes with clsx without Tailwind conflict resolution.

## Functional invariants

- Preserve Zag-calculated coordinates, transforms, positioning variables, and presence behavior.
- Keep one `--spark-overlay-base` plus Zag's `--layer-index`; positioners consume synchronized `--z-index`, with dialog backdrops below content.
- Native `hidden` and `.spark-hidden` use `display: none !important`, so visual grid/flex rules cannot reveal closed content. Keep `[hidden=until-found]` behavior intact.
- Dialog scrolling belongs to the fixed positioner. Safe alignment and non-shrinking content allow scrolling without clipping nested inline popovers.
- Keep native focus indicators without samples, Checkbox.HiddenInput for forms/accessibility, and the semantic relationships of labels, titles, descriptions, and errors.
- Sample recipes provide semantic focus styling and reduced-motion/forced-colors behavior.
- Do not remove default browser appearance as part of functional CSS.

## Registry and maintenance

`buildRegistry` discovers shared style files, component functional/recipe CSS, and Svelte example compositions. Native Button registry entries explicitly list their framework's sources. Shared styles install once at `<ui alias>/styles/`; framework artifacts use release-specific dependency URLs. The installed source closure, including inactive samples, is included in release hashing. Active cross-package CSS imports are rewritten to consumer-compatible relative paths. Local commented recipe imports need no rewriting.

The verifier checks top-level CSS and Svelte example files alongside registry and locked sources. It rejects unvendored/workspace-only imports and framework dependencies in common sources. Importer fixture projects without shared styles remain supported. Preserve editable wrapper class additions through the source importer's local-customization/upstream-merge workflow.

Regenerate with `pnpm registry:build`; generated framework catalogs and `public/r/` are ignored by Git. No cross-platform JSON token generator is introduced. Document-wide sample tokens cover portalled overlays; nested independent themes and portal theme propagation remain deferred.

## Validation workflow

Run type/format checks, importer tests, registry generation, and import verification. Then run `test:registry`, `test:styling`, and `test:browser` sequentially: all reuse `.vendor-tests/consumers/`.

Registry checks install actual React/Svelte consumers without Tailwind, verify inactive samples are copied without alternate component entries, preserve customized shared files when overwrite is declined, and type-check/build wrapper consumers. Functional CSS must retain overlay/hidden rules and exclude sample recipes/palette.

Styling/browser suites use identical component import paths across functional, sample, and optional Tailwind modes. They enable samples by uncommenting installed index imports, and restore those imports/application CSS afterward. Browser coverage includes SSR/hydration, nested wrapper props, native refs/events, Checkbox forms/RTL, Field labels/errors, nested overlay dismissal/focus/scroll restoration, day selection, CSS Modules, theme switching, reduced motion, forced colors, and Tailwind override precedence.

Use the installed browser via `PLAYWRIGHT_CHROMIUM_EXECUTABLE` when needed. Verification results for this migration are reported in the task; historical results for the previous entrypoint architecture are not evidence for the new one.
