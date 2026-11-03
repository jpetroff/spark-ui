'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { NumberInput as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type NumberInputProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: NumberInputProps) {
  return <ComponentParts.Root {...props} />
}

export const NumberInput = Object.assign(AssembledComponent, ComponentParts)
