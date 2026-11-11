'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { Popover as PopoverParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/**
 * Editable assembled Popover component. Customize its markup and props for your application.
 * Popover.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, target the stable .spark-* selectors or install the Spark theme.
 */
export interface PopoverProps {
  /** Required accessible title. */
  title: ReactNode
  /** Optional accessible description. */
  description?: ReactNode
  /** Trigger content; defaults to a text button. */
  trigger?: ReactNode
  /** Optional body content after the description. */
  children?: ReactNode
  /** Close trigger content; defaults to Close. */
  closeLabel?: ReactNode
  /** Props for the nested primitives. Add or remove entries with the markup. */
  parts?: {
    /** open/defaultOpen, onOpenChange, modal, closeOnEscape and presence options. */
    root?: Omit<ComponentProps<typeof PopoverParts.Root>, 'children'>
    /** Trigger events/classes; React asChild accepts one element, Svelte asChild is a snippet. */
    trigger?: Omit<ComponentProps<typeof PopoverParts.Trigger>, 'children'>
    /** Positioner classes; preserve functional positioning/scroll rules. */
    positioner?: Omit<ComponentProps<typeof PopoverParts.Positioner>, 'children'>
    /** Surface classes, DOM events and ref. */
    content?: Omit<ComponentProps<typeof PopoverParts.Content>, 'children'>
    /** Accessible title classes and DOM props. */
    title?: Omit<ComponentProps<typeof PopoverParts.Title>, 'children'>
    /** Accessible description classes and DOM props. */
    description?: Omit<ComponentProps<typeof PopoverParts.Description>, 'children'>
    /** Close button classes/events and optional asChild composition. */
    closeTrigger?: Omit<ComponentProps<typeof PopoverParts.CloseTrigger>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/popover
 * @example
 * <Popover title="Notifications" description="You are all caught up." parts={{ root: { defaultOpen: false }, content: { className: "notification-panel" } }} />
 */
export const Popover = Object.assign(function Popover({
  title,
  description,
  trigger = 'Open popover',
  children,
  closeLabel = 'Close',
  parts = {},
}: PopoverProps) {
  return (
    <PopoverParts.Root {...parts.root}>
      <PopoverParts.Trigger {...parts.trigger}>{trigger}</PopoverParts.Trigger>

      <PopoverParts.Positioner {...parts.positioner}>
        <PopoverParts.Content {...parts.content}>
          <PopoverParts.Title {...parts.title}>{title}</PopoverParts.Title>
          {description != null && (
            <PopoverParts.Description {...parts.description}>
              {description}
            </PopoverParts.Description>
          )}
          {children}
          <PopoverParts.CloseTrigger {...parts.closeTrigger}>
            {closeLabel}
          </PopoverParts.CloseTrigger>
        </PopoverParts.Content>
      </PopoverParts.Positioner>
    </PopoverParts.Root>
  )
}, PopoverParts)
