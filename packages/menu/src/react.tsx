'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Menu as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type MenuProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: MenuProps) {
  return <ComponentParts.Root {...props} />
}

export const Menu = Object.assign(AssembledComponent, ComponentParts)
