import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { RadioGroup as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/radio-group-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled RadioGroup. Subcomponents remain available as RadioGroup.Root, etc. */
export interface RadioGroupProps {
  /** Accessible group label. */
  label: Snippet
  /** Unique values with display labels and optional disabled states. */
  items: { value: string; label: string; disabled?: boolean }[]
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, onValueChange, disabled, name and orientation. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Group label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Props shared by items; value and disabled come from items. */
    item?: Omit<ComponentProps<typeof ComponentParts.Item>, 'children' | 'value' | 'disabled'>
    /** Visual selection control. */
    itemControl?: Omit<ComponentProps<typeof ComponentParts.ItemControl>, 'children'>
    /** Item text props. */
    itemText?: Omit<ComponentProps<typeof ComponentParts.ItemText>, 'children'>
    /** Native inputs; preserve for form submission. */
    itemHiddenInput?: Omit<ComponentProps<typeof ComponentParts.ItemHiddenInput>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/radio-group-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/radio-group
 * @example
 * <RadioGroup items={[{ value: "pro", label: "Pro" }]}>{#snippet label()}Plan{/snippet}</RadioGroup>
 */
export const RadioGroup = Object.assign(AssembledComponent, ComponentParts)
