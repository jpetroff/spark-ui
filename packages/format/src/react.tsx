'use client'

import './styles.css'
import type { ComponentProps } from 'react'
import { Format as ComponentParts } from './react/ark/index.ts'

export * from './react/ark/index.ts'

/** Number value and Intl.NumberFormat options. Locale comes from LocaleProvider. */
export type FormatProps = ComponentProps<typeof ComponentParts.Number>

/**
 * Editable number-format sample; Format.Byte, Format.Time and Format.RelativeTime remain available.
 * Ark behavior: https://ark-ui.com/docs/components/format
 * @example
 * <Format value={1234.5} style="currency" currency="EUR" />
 */
function AssembledComponent(props: FormatProps) {
  return <ComponentParts.Number {...props} />
}

export const Format = Object.assign(AssembledComponent, ComponentParts)
