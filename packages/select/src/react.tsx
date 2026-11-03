'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Select as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type SelectProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: SelectProps) {
  return <ComponentParts.Root {...props} />
}

export const Select = Object.assign(AssembledComponent, ComponentParts)
