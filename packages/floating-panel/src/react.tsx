'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { FloatingPanel as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled FloatingPanel. Subcomponents remain available as FloatingPanel.Root, etc. */
export interface FloatingPanelProps {
  /** Accessible panel title. */
  title: ReactNode
  /** Button content that opens the panel. */
  trigger: ReactNode
  /** Panel body content. */
  children?: ReactNode
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
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/floating-panel
 * @example
 * <FloatingPanel title="Notes" trigger="Open notes">Drag this panel by its header.</FloatingPanel>
 */
export const FloatingPanel = Object.assign(function FloatingPanel({
  title,
  trigger,
  children,
  parts = {},
}: FloatingPanelProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Trigger {...parts.trigger}>{trigger}</ComponentParts.Trigger>
      <ComponentParts.Positioner {...parts.positioner}>
        <ComponentParts.Content {...parts.content}>
          <ComponentParts.DragTrigger {...parts.dragTrigger}>
            <ComponentParts.Header {...parts.header}>
              <ComponentParts.Title {...parts.title}>{title}</ComponentParts.Title>
              <ComponentParts.Control {...parts.control}>
                <ComponentParts.CloseTrigger {...parts.closeTrigger}>
                  Close
                </ComponentParts.CloseTrigger>
              </ComponentParts.Control>
            </ComponentParts.Header>
          </ComponentParts.DragTrigger>
          <ComponentParts.Body {...parts.body}>{children}</ComponentParts.Body>
          <ComponentParts.ResizeTrigger {...parts.resizeTrigger} axis="se" />
        </ComponentParts.Content>
      </ComponentParts.Positioner>
    </ComponentParts.Root>
  )
}, ComponentParts)
