import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Swap as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/swap-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled Swap. Subcomponents remain available as Swap.Root, etc. */
export interface SwapProps {
  /** Content shown when parts.root.swap is true. */
  on: Snippet
  /** Content shown when parts.root.swap is false. */
  off: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Controlled swap state, lazyMount and unmountOnExit. This is a display primitive; supply your own interactive trigger. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** On-state content props. */
    onIndicator?: Omit<ComponentProps<typeof ComponentParts.Indicator>, 'children' | 'type'>
    /** Off-state content props. */
    offIndicator?: Omit<ComponentProps<typeof ComponentParts.Indicator>, 'children' | 'type'>
  }
}

/**
 * Editable markup lives in ./svelte/swap-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/swap
 * @example
 * <Swap parts={{ root: { swap: true } }}>{#snippet on()}Saved{/snippet}{#snippet off()}Unsaved{/snippet}</Swap>
 */
export const Swap = Object.assign(AssembledComponent, ComponentParts)
