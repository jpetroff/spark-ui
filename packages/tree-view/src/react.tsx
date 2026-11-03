'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { TreeView as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type TreeViewProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: TreeViewProps) {
  return <ComponentParts.Root {...props} />
}

export const TreeView = Object.assign(AssembledComponent, ComponentParts)
