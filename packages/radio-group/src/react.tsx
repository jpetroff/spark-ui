'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { RadioGroup as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type RadioGroupProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: RadioGroupProps) {
  return <ComponentParts.Root {...props} />
}

export const RadioGroup = Object.assign(AssembledComponent, ComponentParts)
