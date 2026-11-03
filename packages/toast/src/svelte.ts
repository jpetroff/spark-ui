import './styles.css'

import type { ComponentProps } from 'svelte'
import { Toast as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/toast-composition.svelte'
export * from './svelte/ark/index.ts'

export type ToastProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/toast-composition.svelte. */
export const Toast = Object.assign(AssembledComponent, ComponentParts)
