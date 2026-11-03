import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Toggle as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/toggle-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled Toggle. Subcomponents remain available as Toggle.Root, etc. */
export interface ToggleProps {
  /** Button content must give the toggle an accessible name. */
  children: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Pressed/defaultPressed, onPressedChange, disabled, label and button events. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/toggle-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/toggle
 * @example
 * <Toggle parts={{ root: { defaultPressed: true } }}>Bold</Toggle>
 */
export const Toggle = Object.assign(AssembledComponent, ComponentParts)
