'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Switch as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type SwitchProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: SwitchProps) {
  return <ComponentParts.Root {...props} />
}

export const Switch = Object.assign(AssembledComponent, ComponentParts)
