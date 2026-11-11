import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import ButtonPrimitive from './svelte/button.svelte'
import ButtonComponent from './svelte/button-composition.svelte'
export type { ButtonProps as ButtonRootProps } from './svelte/button.svelte'

/**
 * Compound usage (all primitive props and snippets remain available):
 * <Button.Root variant="outline" disabled={false}>Save</Button.Root>
 *
 * Editable assembled Button component. Customize its markup and props for your application.
 * Button.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, target the stable .spark-* selectors or install the Spark theme.
 */
export interface ButtonProps {
  /** Button label or icon; supply aria-label for an icon-only button. */
  children?: Snippet
  /** Props for the nested primitives. Add or remove entries with the markup. */
  parts?: {
    /** Native button events, ref, disabled, type, variant and size. */
    button?: Omit<ComponentProps<typeof ButtonPrimitive>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/button
 * @example
 * <Button parts={{ button: { variant: "outline" } }}>Save</Button>
 * `parts` forwards controlled values and change callbacks. For bind:ref or
 * bind:value/checked/open on individual primitives, use the compound API directly.
 */
export const Button = Object.assign(ButtonComponent, { Root: ButtonPrimitive })
