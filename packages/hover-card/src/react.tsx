'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { HoverCard as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled HoverCard. Subcomponents remain available as HoverCard.Root, etc. */
export interface HoverCardProps {
  /** Accessible trigger button content. */
  trigger: ReactNode
  /** Supplementary hover content. Keep essential information outside the card. */
  children: ReactNode
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
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/hover-card
 * @example
 * <HoverCard trigger="Spark UI" parts={{ trigger: { title: "Learn about Spark UI" } }}>Components you own.</HoverCard>
 */
export const HoverCard = Object.assign(function HoverCard({
  trigger,
  children,
  parts = {},
}: HoverCardProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Trigger {...parts.trigger}>{trigger}</ComponentParts.Trigger>
      <ComponentParts.Positioner {...parts.positioner}>
        <ComponentParts.Content {...parts.content}>{children}</ComponentParts.Content>
      </ComponentParts.Positioner>
    </ComponentParts.Root>
  )
}, ComponentParts)
