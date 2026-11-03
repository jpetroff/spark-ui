import './styles.css'

import type { ComponentProps } from 'svelte'
import { Menu as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/menu-composition.svelte'
export * from './svelte/ark/index.ts'

export type MenuProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/menu-composition.svelte. */
export const Menu = Object.assign(AssembledComponent, ComponentParts)
