'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { JsonTreeView as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type JsonTreeViewProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: JsonTreeViewProps) {
  return <ComponentParts.Root {...props} />
}

export const JsonTreeView = Object.assign(AssembledComponent, ComponentParts)
