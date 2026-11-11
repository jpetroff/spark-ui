# Spark styling and editable APIs

Component installs include the CSS required for positioning, overlay stacking, scrolling, and hidden content. Each public index imports its own `styles.css`, which loads that component's functional rules and the shared `styles/index.css` foundation. React and Svelte share the same CSS.

## Install and select a theme

Use the registry URL for your framework. The commands below use the local canvas server.

```sh
pnpm dlx shadcn add http://localhost:5173/r/react/spark-theme-default.json
pnpm dlx shadcn-svelte add http://localhost:5173/r/svelte/spark-theme-default.json
```

The theme installs under `<ui alias>/themes/default/`. Add one import near the top of your global stylesheet, adjusting the path to your UI directory:

```css
@import './components/ui/themes/default/index.css';
```

To make a project theme, copy the `default` folder as a sibling and point the import at its `index.css`. Edit `tokens.css` for shared values such as color, density, or typography. Edit `components/button.css` to change Button alone. Use the existing `.spark-*` classes and Ark's `data-scope`, `data-part`, and state attributes. Keep the theme import global so elements rendered through portals inherit its tokens. The canvas and Storybook both select their theme in `src/sample-styles.css`.

| File within the theme   | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `index.css`             | Cascade layer order and theme imports                      |
| `colors.css`            | Primitive color palette                                    |
| `tokens.css`            | Semantic colors, density, typography, and effects          |
| `base.css`              | Document typography and surfaces                           |
| `components/<name>.css` | Visual rules for each component, including Fieldset markup |
| `tailwind.css`          | Optional Tailwind v4 adapter                               |

To distribute another theme from Spark, list its CSS files in a `spark-theme-<folder>` item in `registry.json`. The registry builder creates the React and Svelte items from that list.

If your project enabled individual `recipe.css` imports, install the theme first and copy over edits from those recipes and any shared token edits. Remove the old recipe and sample imports, then add the global theme import. The Tailwind adapter has also moved into the theme folder.

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

The visual components have Storybook stories using their public indexes. Format, Highlight, and Portal use their existing primitive presentation. Highlight and Portal indexes include usage examples without an extra assembly. Toast stores should be created once per region; React content uses nodes and Svelte content uses snippets.

Locale and Environment indexes document their provider APIs. Locale supplies language/direction, and Environment supplies the document or root node.

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

Override semantic variables in application-owned CSS loaded after the theme. Use `tokens.css` to find the role for each override.

```css
:root {
  --color-background-action: var(--project-primary);
  --color-text-on-strong: var(--project-on-primary);
  --radius-control: 0.5rem;
}
```

When upgrading from the legacy `theme.css`, remove its imports and any code that toggles `.dark` on the document. Rename visual overrides by role. For example, `--spark-action` becomes `--color-background-action`, `--spark-focus` becomes `--color-outline-focus`, and `--spark-control-height` becomes `--size-row-min`. Existing Tailwind utilities such as `bg-spark-action` use the new variables through the adapter.

Use `data-spark-layer="0"` for a canvas, `"1"` for a panel, and `"2"` for a nested panel. Floating recipes default to layer `3`. Each layer paints a distinct surface, and translucent state fills respond to the surface behind them.

Set `data-spark-density="sm|md|lg"` on a document or subtree. Default density is `md`. Buttons with explicit `sm` and `lg` sizes use those profiles. Apply the subtree density to a portal mount outside that subtree so its controls match.

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
@import './components/ui/themes/default/index.css';
@import './components/ui/themes/default/tailwind.css';
```

You can then add literal utility strings to `className` / `class` in the public wrappers, or through `parts`. Include those installed source files in your Tailwind source scanning. With this order, normal utilities override Spark's component layer. Utilities that reference Spark tokens use the selected theme's values or your own definitions. Tailwind's optional reset is the application's choice.

## Maintenance and verification

Keep functional positioning, layer indices, presence behavior, native focus indicators, and hidden inputs intact when customizing. For machine-managed element IDs, configure `parts.root.ids` where supported instead of overriding an individual part's `id`; the positioning and dismissal code queries those IDs. Dialog scrolling belongs to its fixed positioner, allowing nested inline popovers to overflow the content correctly.

Normal registry installations preserve edited files when overwrite is declined. A component reinstall leaves theme folders alone. Keep customized themes in a project-named folder so you can reinstall the default theme independently.

After distributed-source edits, run `pnpm registry:build`. `pnpm verify-imports` checks consumer-compatible imports. `pnpm test:registry` installs and builds actual React/Svelte consumers without Tailwind; `pnpm test:styling` checks functional defaults, both test themes, and optional Tailwind; `pnpm test:browser` exercises the same installed APIs across those modes. Run those three suites sequentially because they share consumer fixtures. The latter two change the theme import in each consumer's global CSS and restore the file afterward. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` for the available browser if needed.
