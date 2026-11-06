# Spark styling and editable APIs

Spark installs functional components by default. Ordinary CSS preserves positioning, overlay stacking, scrolling, and hidden content. There is no default palette, visual reset, Tailwind compiler, theme provider, or application-level stylesheet setup. React and Svelte share the same CSS.

Adding a component copies its sources, an editable public `index.tsx` (React) or `index.ts` (Svelte), and an **inactive design-system sample**. The public index is the customization point. The repository calls these files `react.tsx` and `svelte.ts`; the registry renames them on installation.

## Default and sample imports

Every visual component index follows this pattern:

```tsx
import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'
```

`styles.css` loads the shared functional foundation and the component's `functional.css`. Keep these enabled when writing a design system. Components automatically import the foundation; importing another component never enables its recipe.

To try the sample, uncomment `import './recipe.css'` in that component's index. The recipe imports shared `styles/sample.css`, which supplies the dark palette, visual tokens, and Fieldset sample. It then styles the component's stable `.spark-*` classes or Ark's `data-scope`/`data-part` attributes for the newly imported components. The sample is ordinary CSS, not a CSS Module. Edit, replace, or delete its appearance rules freely.

A project can also opt in centrally by importing selected component recipes from application CSS. The workshop and Storybook do this explicitly; that choice is not distributed in component indexes.

| File                                      | Purpose                                                              |
| ----------------------------------------- | -------------------------------------------------------------------- |
| Shared `styles/index.css`                 | Functional entry: layers, functional variables, visibility helpers   |
| Shared `styles/functional-tokens.css`     | `--spark-overlay-base` and `--spark-visually-hidden-size`            |
| Component `styles.css` / `functional.css` | Required component behavior                                          |
| Component `recipe.css`                    | Optional editable appearance, including its shared sample dependency |
| Shared `styles/sample.css`                | Optional sample entry                                                |
| Shared `styles/tokens.css`                | Semantic colors, density, typography, and effects                    |
| Shared `styles/colors.css`                | Raw palette used by the dark sample                                  |
| Shared `styles/fieldset.css`              | Sample styles for composed Fieldset markup; no public Fieldset API   |
| Shared `styles/tailwind.css`              | Optional adapter for applications that already use Tailwind v4       |

## Customize the API in the index

Each visual index exports an assembled component under its actual name, with matching props such as `DatePickerProps`. Add or remove props and markup to fit your application. The TypeScript interfaces document every nested part. The same export exposes its subcomponents, such as `DatePicker.Root` and `DatePicker.Input`, for custom compositions. The native Button primitive is available as `Button.Root`, with `ButtonRootProps` for its props.

| Component    | Composition and deliberate limits                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Button`     | Native Button with `parts.button` for events, refs, disabled, variant, and size                                        |
| `Checkbox`   | Label, control, checked/mixed indicators, and native hidden input                                                      |
| `Field`      | Label, required marker, Input, hint, and error; replace Input and its prop type for Textarea or Select                 |
| `Dialog`     | Trigger, backdrop, positioner, titled/described content, body, and close button                                        |
| `Popover`    | Trigger, positioner, titled/described content, body, and close button                                                  |
| `DatePicker` | Single-date day calendar with navigation, weekdays, and selectable cells; use primitives for range or month/year views |

The additional imported samples cover:

| Component                    | Editable composition                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `NumberInput`                | Label, input, and increment/decrement controls                                            |
| `Switch`                     | Track, thumb, label, and hidden input                                                     |
| `RadioGroup`, `SegmentGroup` | Labeled choices with native hidden inputs                                                 |
| `Select`                     | Labeled list collection, trigger, options, and hidden select; supports multiple selection |
| `Menu`                       | Trigger and action items; use primitives for submenus and checkbox/radio actions          |
| `Tabs`                       | Named tab list and matching panels from item data                                         |
| `HoverCard`                  | Trigger and supplementary hover content                                                   |
| `FloatingPanel`              | Trigger, draggable titled header, body, close button, and resize handle                   |
| `ScrollArea`                 | Dimensioned viewport with both scrollbars; supply dimensions through part props           |
| `TreeView`                   | Recursive `id`/`name` nodes; use primitives for custom collections and async loading      |
| `JsonTreeView`               | Accessible JSON tree with expansion and display options                                   |
| `Toggle`, `Swap`             | Toggle button content, or two controlled display states                                   |
| `Toast`                      | Notification region backed by a stable `createToaster()` store                            |
| `Format`                     | Callable number formatter with attached byte, time, and relative-time formatters          |

Each sample has Storybook stories using its public index. Visual recipes remain opt-in; Format, Highlight, and Portal use their existing primitive presentation. Highlight and Portal indexes include usage examples without an extra assembly. Toast stores should be created once per region; React content uses nodes and Svelte content uses snippets.

Locale and Environment indexes document their provider APIs; they have no visual recipe. Locale supplies language/direction, and Environment supplies the document or root node.

For example, the React Popover wrapper supports both part props and composition with your own button:

```tsx
import { Popover } from './components/ui/popover'
import { Button } from './components/ui/button'

;<Popover
  title="Notifications"
  description="You are all caught up."
  trigger={<Button.Root variant="outline">Open popover</Button.Root>}
  parts={{
    root: { defaultOpen: false, positioning: { placement: 'top' } },
    trigger: { asChild: true },
    content: { className: 'notification-panel' },
  }}
/>
```

The same parts remain available directly:

```tsx
<Popover.Root>
  <Popover.Trigger asChild>
    <Button.Root>Open popover</Button.Root>
  </Popover.Trigger>
  <Popover.Positioner>
    <Popover.Content className="notification-panel">
      <Popover.Title>Notifications</Popover.Title>
      <Popover.Description>You are all caught up.</Popover.Description>
      <Popover.CloseTrigger>Close</Popover.CloseTrigger>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
```

Svelte indexes contain the documented prop API and export the rendered composition from `svelte/<component>-composition.svelte`. Edit that small file for markup changes. Content uses snippets; DOM classes use `class`:

```svelte
<script lang="ts">
  import { Popover } from './components/ui/popover'
</script>

<Popover parts={{ root: { defaultOpen: false }, content: { class: 'notification-panel' } }}>
  {#snippet title()}Notifications{/snippet}
  {#snippet description()}You are all caught up.{/snippet}
</Popover>
```

The wrappers forward controlled state and callbacks through `parts.root`. React part props retain refs. When you need Svelte `bind:ref`, `bind:checked`, `bind:open`, or `bind:value`, use the compound primitives directly or add the desired binding to your wrapper. Svelte `asChild` uses a snippet receiving a prop-merging function, rather than React's boolean `asChild`. Keep that merged prop spread when replacing a DOM element. See the vendored primitive types for this checkout's exact API.

Ark's [composition guide](https://ark-ui.com/docs/guides/composition) describes the underlying compound-component pattern. Each index links to its component reference. Existing stories show raw compound composition alongside a customized wrapper story.

## Your own CSS and CSS Modules

You can style the stable `spark-<component>-<part>` classes and Ark state attributes (`data-state`, `data-invalid`, `data-disabled`) directly, or pass application-owned classes through part props. No sample tokens are required when you supply your own design values:

```css
/* Notification.module.css */
.panel {
  padding: 1rem;
  border: 1px solid var(--project-border);
  border-radius: 0.5rem;
  background: var(--project-surface);
  color: var(--project-text);
}
```

```tsx
<Popover title="Notifications" parts={{ content: { className: styles.panel } }} />
```

## Dark tokens, surfaces, and density

Override semantic variables in application-owned CSS loaded after the sample. Use `tokens.css` to find the role for each override.

```css
:root {
  --color-background-action: var(--project-primary);
  --color-text-on-strong: var(--project-on-primary);
  --radius-control: 0.5rem;
}
```

When upgrading, remove imports of `theme.css` and any code that toggles `.dark` on the document. Rename visual overrides by role. For example, `--spark-action` becomes `--color-background-action`, `--spark-focus` becomes `--color-outline-focus`, and `--spark-control-height` becomes `--size-row-min`. Existing Tailwind utilities such as `bg-spark-action` use the new variables through the adapter.

Use `data-spark-layer="0"` for a canvas, `"1"` for a panel, and `"2"` for a nested panel. Floating recipes default to layer `3`. Each layer paints a distinct surface, and translucent state fills respond to the surface behind them.

Set `data-spark-density="sm|md|lg"` on a document or subtree. Default density is `md`. Buttons with explicit `sm` and `lg` sizes use those profiles. Apply the subtree density to a portal mount outside that subtree so its controls match. For an interactive comparison, open **Design System / Token Workbench** in Storybook.

## Why `@layer` is plain CSS

`@layer` is a native CSS cascade feature, standardized in [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/#layering) and described by [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer). Browsers interpret it directly; it does not require Tailwind or a plugin. The default declaration names only Spark's own layers:

```css
@layer spark.tokens, spark.base, spark.components;
```

For normal declarations, later layers take priority over earlier ones. Normal unlayered application CSS takes priority over layered library styles. Sample selectors also use low specificity, making application overrides straightforward. The native `hidden` attribute and `.spark-hidden` use `display: none !important` deliberately: a recipe's grid/flex display must never reveal a closed overlay. Important declarations have different cascade precedence; treat these visibility rules as behavior invariants.

You can remove the layer wrappers if your project chooses another cascade strategy, but then selector specificity and source order decide overrides. Preserve the hiding rules and recheck overlays after changing that strategy.

## Optional Tailwind integration

Nothing in the default component setup imports Tailwind, uses utility classes, or loads the adapter. If your application already uses Tailwind v4, declare its layers and Spark's order **before any component CSS loads**:

```css
/* Your application's CSS entry. Configure Tailwind in your application build. */
@layer theme, base, spark.tokens, spark.base, spark.components, components, utilities;
@import 'tailwindcss';
/* Optional mapping from Spark sample variables to Tailwind utilities: */
@import './components/ui/styles/tailwind.css';
```

You can then add literal utility strings to `className` / `class` in the public wrappers, or through `parts`. Include those installed source files in your Tailwind source scanning. With this order, normal utilities override Spark's sample component layer. Utilities referencing sample variables require either the sample or your own definitions for those variables. The adapter does not enable recipes or provide a palette. Tailwind's optional reset is the application's choice.

## Maintenance and verification

Keep functional positioning, layer indices, presence behavior, native focus indicators, and hidden inputs intact when customizing. For machine-managed element IDs, configure `parts.root.ids` where supported instead of overriding an individual part's `id`; the positioning and dismissal code queries those IDs. Dialog scrolling belongs to its fixed positioner, allowing nested inline popovers to overflow the content correctly.

Normal registry installations preserve edited files when overwrite is declined. Explicit overwrite can replace public indexes and samples; keep project-specific overrides in application-owned files when they must survive reinstalls.

After distributed-source edits, run `pnpm registry:build`. `pnpm verify-imports` checks consumer-compatible imports. `pnpm test:registry` installs and builds actual React/Svelte consumers without Tailwind; `pnpm test:styling` checks functional defaults, enabled samples, and optional Tailwind; `pnpm test:browser` exercises the same installed APIs across those modes. Run those three suites sequentially because they share consumer fixtures. The latter two toggle the commented recipe imports and restore files afterward; component import paths never change. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` for the available browser if needed.
