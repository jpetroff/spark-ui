'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { Dialog as DialogParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/**
 * Editable assembled Dialog component. Customize its markup and props for your application.
 * Dialog.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, uncomment recipe.css and edit its stable .spark-* selectors.
 */
export interface DialogProps {
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
    root?: Omit<ComponentProps<typeof DialogParts.Root>, 'children'>
    /** Trigger events/classes; React asChild accepts one element, Svelte asChild is a snippet. */
    trigger?: Omit<ComponentProps<typeof DialogParts.Trigger>, 'children'>
    /** Backdrop classes and DOM props. */
    backdrop?: Omit<ComponentProps<typeof DialogParts.Backdrop>, 'children'>
    /** Positioner classes; preserve functional positioning/scroll rules. */
    positioner?: Omit<ComponentProps<typeof DialogParts.Positioner>, 'children'>
    /** Surface classes, DOM events and ref. */
    content?: Omit<ComponentProps<typeof DialogParts.Content>, 'children'>
    /** Accessible title classes and DOM props. */
    title?: Omit<ComponentProps<typeof DialogParts.Title>, 'children'>
    /** Accessible description classes and DOM props. */
    description?: Omit<ComponentProps<typeof DialogParts.Description>, 'children'>
    /** Close button classes/events and optional asChild composition. */
    closeTrigger?: Omit<ComponentProps<typeof DialogParts.CloseTrigger>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/dialog
 * @example
 * <Dialog title="Notifications" description="You are all caught up." parts={{ root: { defaultOpen: false }, content: { className: "notification-panel" } }} />
 */
export const Dialog = Object.assign(function Dialog({
  title,
  description,
  trigger = 'Open dialog',
  children,
  closeLabel = 'Close',
  parts = {},
}: DialogProps) {
  return (
    <DialogParts.Root {...parts.root}>
      <DialogParts.Trigger {...parts.trigger}>{trigger}</DialogParts.Trigger>
      <DialogParts.Backdrop {...parts.backdrop} />
      <DialogParts.Positioner {...parts.positioner}>
        <DialogParts.Content {...parts.content}>
          <DialogParts.Title {...parts.title}>{title}</DialogParts.Title>
          {description != null && (
            <DialogParts.Description {...parts.description}>{description}</DialogParts.Description>
          )}
          {children}
          <DialogParts.CloseTrigger {...parts.closeTrigger}>{closeLabel}</DialogParts.CloseTrigger>
        </DialogParts.Content>
      </DialogParts.Positioner>
    </DialogParts.Root>
  )
}, DialogParts)
