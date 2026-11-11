import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Checkbox as CheckboxParts } from './svelte/ark/index.ts'
import CheckboxComponent from './svelte/checkbox-composition.svelte'
export * from './svelte/ark/index.ts'

/**
 * Compound usage (all primitive props and snippets remain available):
 * <Checkbox.Root name="terms" defaultChecked={true}>
 *   <Checkbox.Control><Checkbox.Indicator>✓</Checkbox.Indicator></Checkbox.Control>
 *   <Checkbox.Label>Accept terms</Checkbox.Label>
 *   <Checkbox.HiddenInput />
 * </Checkbox.Root>
 *
 * Editable assembled Checkbox component. Customize its markup and props for your application.
 * Checkbox.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, target the stable .spark-* selectors or install the Spark theme.
 */
export interface CheckboxProps {
  /** Accessible label shown next to the control. */
  label: Snippet
  /** Props for the nested primitives. Add or remove entries with the markup. */
  parts?: {
    /** checked/defaultChecked, onCheckedChange, disabled, invalid, name and value. */
    root?: Omit<ComponentProps<typeof CheckboxParts.Root>, 'children'>
    /** Visual box; add className/class here. */
    control?: Omit<ComponentProps<typeof CheckboxParts.Control>, 'children'>
    /** Checked indicator props; its children are supplied by the wrapper. */
    indicator?: Omit<ComponentProps<typeof CheckboxParts.Indicator>, 'children'>
    /** Mixed-state indicator; indeterminate is fixed by the wrapper. */
    indeterminateIndicator?: Omit<
      ComponentProps<typeof CheckboxParts.Indicator>,
      'children' | 'indeterminate'
    >
    /** Label classes and DOM events. */
    label?: Omit<ComponentProps<typeof CheckboxParts.Label>, 'children'>
    /** Native form input; preserve this part for submission and accessibility. */
    hiddenInput?: Omit<ComponentProps<typeof CheckboxParts.HiddenInput>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/checkbox
 * @example
 * <Checkbox>
 *   {#snippet label()}Accept terms{/snippet}
 * </Checkbox>
 * `parts` forwards controlled values and change callbacks. For bind:ref or
 * bind:value/checked/open on individual primitives, use the compound API directly.
 */
export const Checkbox = Object.assign(CheckboxComponent, CheckboxParts)
