import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Dialog as DialogParts } from './svelte/ark/index.ts'
import DialogComponent from './svelte/dialog-composition.svelte'
export * from './svelte/ark/index.ts'

/**
 * Compound usage (all primitive props and snippets remain available):
 * <Dialog.Root>
 *   <Dialog.Trigger>Open dialog</Dialog.Trigger>
 *   <Dialog.Backdrop />
 *   <Dialog.Positioner><Dialog.Content>
 *     <Dialog.Title>Edit profile</Dialog.Title>
 *     <Dialog.Description>Update your details.</Dialog.Description>
 *     <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
 *   </Dialog.Content></Dialog.Positioner>
 * </Dialog.Root>
 *
 * Editable assembled Dialog component. Customize its markup and props for your application.
 * Dialog.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, uncomment recipe.css and edit its stable .spark-* selectors.
 */
export interface DialogProps {
  /** Required accessible title. */
  title: Snippet
  /** Optional accessible description. */
  description?: Snippet
  /** Trigger content; defaults to a text button. */
  trigger?: Snippet
  /** Optional body content after the description. */
  children?: Snippet
  /** Close trigger content; defaults to Close. */
  closeLabel?: Snippet
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
 * <Dialog parts={{ content: { class: "notification-panel" } }}>
 *   {#snippet title()}Notifications{/snippet}
 *   {#snippet description()}You are all caught up.{/snippet}
 * </Dialog>
 * `parts` forwards controlled values and change callbacks. For bind:ref or
 * bind:value/checked/open on individual primitives, use the compound API directly.
 */
export const Dialog = Object.assign(DialogComponent, DialogParts)
