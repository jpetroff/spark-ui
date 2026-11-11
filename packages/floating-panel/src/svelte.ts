import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { FloatingPanel as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/floating-panel-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled FloatingPanel. Subcomponents remain available as FloatingPanel.Root, etc. */
export interface FloatingPanelProps {
  /** Accessible panel title. */
  title: Snippet
  /** Button content that opens the panel. */
  trigger: Snippet
  /** Panel body content. */
  children?: Snippet
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Open/defaultOpen, defaultPosition, defaultSize, stage and callbacks. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Open button props. */
    trigger?: Omit<ComponentProps<typeof ComponentParts.Trigger>, 'children'>
    /** Floating positioning props. */
    positioner?: Omit<ComponentProps<typeof ComponentParts.Positioner>, 'children'>
    /** Panel surface props. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children'>
    /** Draggable header props. */
    dragTrigger?: Omit<ComponentProps<typeof ComponentParts.DragTrigger>, 'children'>
    /** Header layout props. */
    header?: Omit<ComponentProps<typeof ComponentParts.Header>, 'children'>
    /** Accessible title props. */
    title?: Omit<ComponentProps<typeof ComponentParts.Title>, 'children'>
    /** Window control group props. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Close button props. */
    closeTrigger?: Omit<ComponentProps<typeof ComponentParts.CloseTrigger>, 'children'>
    /** Body layout props. */
    body?: Omit<ComponentProps<typeof ComponentParts.Body>, 'children'>
    /** Bottom-right resize handle props. */
    resizeTrigger?: Omit<ComponentProps<typeof ComponentParts.ResizeTrigger>, 'children' | 'axis'>
  }
}

/**
 * Editable markup lives in ./svelte/floating-panel-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/floating-panel
 * @example
 * <FloatingPanel>{#snippet title()}Notes{/snippet}{#snippet trigger()}Open notes{/snippet}<p>Drag the header to move this panel.</p></FloatingPanel>
 */
export const FloatingPanel = Object.assign(AssembledComponent, ComponentParts)
