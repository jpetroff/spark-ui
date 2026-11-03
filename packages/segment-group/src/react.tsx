'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { SegmentGroup as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type SegmentGroupProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: SegmentGroupProps) {
  return <ComponentParts.Root {...props} />
}

export const SegmentGroup = Object.assign(AssembledComponent, ComponentParts)
