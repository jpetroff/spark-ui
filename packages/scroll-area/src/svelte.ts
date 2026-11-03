import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { ScrollArea as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/scroll-area-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled ScrollArea. Subcomponents remain available as ScrollArea.Root, etc. */
export interface ScrollAreaProps {
  /** Scrollable content. Set dimensions through parts.root or parts.viewport. */
  children: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Root dimensions, classes, scroll callbacks and options. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Viewport dimensions, accessible label and keyboard focus props. */
    viewport?: Omit<ComponentProps<typeof ComponentParts.Viewport>, 'children'>
    /** Inner content layout props. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children'>
    /** Vertical scrollbar props. */
    verticalScrollbar?: Omit<
      ComponentProps<typeof ComponentParts.Scrollbar>,
      'children' | 'orientation'
    >
    /** Vertical drag thumb props. */
    verticalThumb?: Omit<ComponentProps<typeof ComponentParts.Thumb>, 'children'>
    /** Horizontal scrollbar props. */
    horizontalScrollbar?: Omit<
      ComponentProps<typeof ComponentParts.Scrollbar>,
      'children' | 'orientation'
    >
    /** Horizontal drag thumb props. */
    horizontalThumb?: Omit<ComponentProps<typeof ComponentParts.Thumb>, 'children'>
    /** Scrollbar corner props. */
    corner?: Omit<ComponentProps<typeof ComponentParts.Corner>, 'children'>
  }
}

/**
 * Editable markup lives in ./svelte/scroll-area-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/scroll-area
 * @example
 * <ScrollArea parts={{ root: { style: "width: 300px; height: 200px" } }}><p>Scrollable content</p></ScrollArea>
 */
export const ScrollArea = Object.assign(AssembledComponent, ComponentParts)
