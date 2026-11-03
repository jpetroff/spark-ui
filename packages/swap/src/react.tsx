'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Swap as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type SwapProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: SwapProps) {
  return <ComponentParts.Root {...props} />
}

export const Swap = Object.assign(AssembledComponent, ComponentParts)
