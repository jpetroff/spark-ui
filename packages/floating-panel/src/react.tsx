'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { FloatingPanel as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type FloatingPanelProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: FloatingPanelProps) {
  return <ComponentParts.Root {...props} />
}

export const FloatingPanel = Object.assign(AssembledComponent, ComponentParts)
