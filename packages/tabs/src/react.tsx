'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Tabs as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type TabsProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: TabsProps) {
  return <ComponentParts.Root {...props} />
}

export const Tabs = Object.assign(AssembledComponent, ComponentParts)
