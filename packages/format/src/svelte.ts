import './styles.css'
import type { ComponentProps } from 'svelte'
import { Format as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/format-composition.svelte'
export * from './svelte/ark/index.ts'

/** Number value and Intl.NumberFormat options. Locale comes from LocaleProvider. */
export type FormatProps = ComponentProps<typeof ComponentParts.Number>

/**
 * Editable number-format sample; Format.Byte, Format.Time and Format.RelativeTime remain available.
 * Ark behavior: https://ark-ui.com/docs/components/format
 * @example
 * <Format value={1234.5} style="currency" currency="EUR" />
 */
// Edit the Svelte markup in ./svelte/format-composition.svelte.

export const Format = Object.assign(AssembledComponent, ComponentParts)
