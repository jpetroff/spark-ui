import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Popover as PopoverParts } from './svelte/ark/index.ts'
import PopoverComponent from './svelte/popover-composition.svelte'
export * from './svelte/ark/index.ts'

/**
 * Compound usage (all primitive props and snippets remain available):
 * <Popover.Root>
 *   <Popover.Trigger>Open popover</Popover.Trigger>
 *   <Popover.Positioner><Popover.Content>
 *     <Popover.Title>Notifications</Popover.Title>
 *     <Popover.Description>You are all caught up.</Popover.Description>
 *     <Popover.CloseTrigger>Close</Popover.CloseTrigger>
 *   </Popover.Content></Popover.Positioner>
 * </Popover.Root>
 *
 * Editable assembled Popover component. Customize its markup and props for your application.
 * Popover.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, target the stable .spark-* selectors or install the Spark theme.
 */
export interface PopoverProps {
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
 * <Popover parts={{ content: { class: "notification-panel" } }}>
 *   {#snippet title()}Notifications{/snippet}
 *   {#snippet description()}You are all caught up.{/snippet}
 * </Popover>
 * `parts` forwards controlled values and change callbacks. For bind:ref or
 * bind:value/checked/open on individual primitives, use the compound API directly.
 */
export const Popover = Object.assign(PopoverComponent, PopoverParts)
