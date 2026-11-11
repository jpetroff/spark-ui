import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { NumberInput as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/number-input-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled NumberInput. Subcomponents remain available as NumberInput.Root, etc. */
export interface NumberInputProps {
  /** Associated input label. */
  label: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, min, max, step, disabled, name and change callbacks. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Associated label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Layout around the input and step buttons. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Input classes, placeholder, ref and events. */
    input?: Omit<ComponentProps<typeof ComponentParts.Input>, 'children'>
    /** Decrease button props. */
    decrementTrigger?: Omit<ComponentProps<typeof ComponentParts.DecrementTrigger>, 'children'>
    /** Increase button props. */
    incrementTrigger?: Omit<ComponentProps<typeof ComponentParts.IncrementTrigger>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/number-input-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/number-input
 * @example
 * <NumberInput parts={{ root: { defaultValue: "1", min: 0 } }}>{#snippet label()}Quantity{/snippet}</NumberInput>
 */
export const NumberInput = Object.assign(AssembledComponent, ComponentParts)
