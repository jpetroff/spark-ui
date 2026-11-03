'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { HoverCard as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type HoverCardProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: HoverCardProps) {
  return <ComponentParts.Root {...props} />
}

export const HoverCard = Object.assign(AssembledComponent, ComponentParts)
