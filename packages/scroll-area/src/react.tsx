'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { ScrollArea as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type ScrollAreaProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: ScrollAreaProps) {
  return <ComponentParts.Root {...props} />
}

export const ScrollArea = Object.assign(AssembledComponent, ComponentParts)
