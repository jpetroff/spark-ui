'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Format as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type FormatProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: FormatProps) {
  return <ComponentParts.Root {...props} />
}

export const Format = Object.assign(AssembledComponent, ComponentParts)
