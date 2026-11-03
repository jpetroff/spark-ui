import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Select as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/select-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled Select. Subcomponents remain available as Select.Root, etc. */
export interface SelectProps {
  /** Associated label. */
  label: Snippet
  /** Unique values and labels; this wrapper builds a list collection for you. */
  items: { value: string; label: string; disabled?: boolean }[]
  /** Displayed before a value is selected. */
  placeholder?: string
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, multiple, onValueChange, disabled, name and positioning. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children' | 'collection'>
    /** Associated label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Control layout props. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Select trigger button props. */
    trigger?: Omit<ComponentProps<typeof ComponentParts.Trigger>, 'children'>
    /** Selected value text props. */
    valueText?: Omit<ComponentProps<typeof ComponentParts.ValueText>, 'children' | 'placeholder'>
    /** Dropdown indicator props. */
    indicator?: Omit<ComponentProps<typeof ComponentParts.Indicator>, 'children'>
    /** Positioning wrapper props. */
    positioner?: Omit<ComponentProps<typeof ComponentParts.Positioner>, 'children'>
    /** Popup surface props. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children'>
    /** Listbox props. */
    list?: Omit<ComponentProps<typeof ComponentParts.List>, 'children'>
    /** Shared item props; item data is supplied by the wrapper. */
    item?: Omit<ComponentProps<typeof ComponentParts.Item>, 'children' | 'item'>
    /** Option text props. */
    itemText?: Omit<ComponentProps<typeof ComponentParts.ItemText>, 'children'>
    /** Selected option marker props. */
    itemIndicator?: Omit<ComponentProps<typeof ComponentParts.ItemIndicator>, 'children'>
    /** Native select for form submission and autofill. */
    hiddenSelect?: Omit<ComponentProps<typeof ComponentParts.HiddenSelect>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/select-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/select
 * @example
 * <Select items={[{ value: "react", label: "React" }]}>{#snippet label()}Framework{/snippet}</Select>
 */
export const Select = Object.assign(AssembledComponent, ComponentParts)
