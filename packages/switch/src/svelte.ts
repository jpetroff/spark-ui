import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Switch as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/switch-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled Switch. Subcomponents remain available as Switch.Root, etc. */
export interface SwitchProps {
  /** Accessible label next to the control. */
  label: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Checked/defaultChecked, onCheckedChange, disabled, name and value. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Associated label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Track classes and events. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Movable thumb props. */
    thumb?: Omit<ComponentProps<typeof ComponentParts.Thumb>, 'children'>
    /** Native input; preserve for forms and accessibility. */
    hiddenInput?: Omit<ComponentProps<typeof ComponentParts.HiddenInput>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/switch-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/switch
 * @example
 * <Switch parts={{ root: { name: "updates" } }}>{#snippet label()}Email updates{/snippet}</Switch>
 */
export const Switch = Object.assign(AssembledComponent, ComponentParts)
