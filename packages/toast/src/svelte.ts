import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps } from 'svelte'
import { Toast as ComponentParts, Toaster } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/toast-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable notification region. Create the store once and call toaster.create() to show a toast. */
export interface ToastProps {
  /** Stable createToaster() store; create one per notification region. */
  toaster: ComponentProps<typeof Toaster>['toaster']
  parts?: {
    /** Notification region label and layout props. */
    toaster?: Omit<ComponentProps<typeof Toaster>, 'toaster' | 'children'>
    /** Individual toast surface props. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Notification title props. */
    title?: Omit<ComponentProps<typeof ComponentParts.Title>, 'children'>
    /** Notification description props. */
    description?: Omit<ComponentProps<typeof ComponentParts.Description>, 'children'>
    /** Dismiss button props. */
    closeTrigger?: Omit<ComponentProps<typeof ComponentParts.CloseTrigger>, 'children'>
  }
}

/**
 * Editable store renderer; Toast.Root and other primitives remain attached for custom layouts.
 * Ark behavior: https://ark-ui.com/docs/components/toast
 * @example
 * const toaster = createToaster({ placement: 'bottom-end' })
 * // Render <Toast toaster={toaster} />, then call toaster.create({ title: 'Saved', type: 'success' }).
 */
// Edit markup in ./svelte/toast-composition.svelte; createToaster content uses snippets.

export const Toast = Object.assign(AssembledComponent, ComponentParts)
