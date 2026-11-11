'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { ScrollArea as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled ScrollArea. Subcomponents remain available as ScrollArea.Root, etc. */
export interface ScrollAreaProps {
  /** Scrollable content. Set dimensions through parts.root or parts.viewport. */
  children: ReactNode
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
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/scroll-area
 * @example
 * <ScrollArea parts={{ root: { style: { width: 300, height: 200 } } }}>Scrollable content</ScrollArea>
 */
export const ScrollArea = Object.assign(function ScrollArea({
  children,
  parts = {},
}: ScrollAreaProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Viewport tabIndex={0} {...parts.viewport}>
        <ComponentParts.Content {...parts.content}>{children}</ComponentParts.Content>
      </ComponentParts.Viewport>
      <ComponentParts.Scrollbar {...parts.verticalScrollbar} orientation="vertical">
        <ComponentParts.Thumb {...parts.verticalThumb} />
      </ComponentParts.Scrollbar>
      <ComponentParts.Scrollbar {...parts.horizontalScrollbar} orientation="horizontal">
        <ComponentParts.Thumb {...parts.horizontalThumb} />
      </ComponentParts.Scrollbar>
      <ComponentParts.Corner {...parts.corner} />
    </ComponentParts.Root>
  )
}, ComponentParts)
