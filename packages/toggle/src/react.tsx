'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Toggle as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type ToggleProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: ToggleProps) {
  return <ComponentParts.Root {...props} />
}

export const Toggle = Object.assign(AssembledComponent, ComponentParts)
