import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { HoverCard as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/hover-card-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled HoverCard. Subcomponents remain available as HoverCard.Root, etc. */
export interface HoverCardProps {
  /** Accessible trigger button content. */
  trigger: Snippet
  /** Supplementary hover content. Keep essential information outside the card. */
  children: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Open/defaultOpen, openDelay, closeDelay, positioning and callbacks. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Trigger button classes, events and optional asChild composition. */
    trigger?: Omit<ComponentProps<typeof ComponentParts.Trigger>, 'children'>
    /** Positioning wrapper props. */
    positioner?: Omit<ComponentProps<typeof ComponentParts.Positioner>, 'children'>
    /** Card surface props. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/hover-card-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/hover-card
 * @example
 * <HoverCard>{#snippet trigger()}About Spark UI{/snippet}<p>Components you own.</p></HoverCard>
 */
export const HoverCard = Object.assign(AssembledComponent, ComponentParts)
