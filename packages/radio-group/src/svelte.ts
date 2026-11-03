import './styles.css'

import type { ComponentProps } from 'svelte'
import { RadioGroup as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/radio-group-composition.svelte'
export * from './svelte/ark/index.ts'

export type RadioGroupProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly; customize its markup in ./svelte/radio-group-composition.svelte. */
export const RadioGroup = Object.assign(AssembledComponent, ComponentParts)
