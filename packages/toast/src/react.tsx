'use client'

import './styles.css'

import type { ComponentProps } from 'react'
import { Toast as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

export type ToastProps = ComponentProps<typeof ComponentParts.Root>

/** Editable assembly. Add subcomponents and their props here as needed. */
function AssembledComponent(props: ToastProps) {
  return <ComponentParts.Root {...props} />
}

export const Toast = Object.assign(AssembledComponent, ComponentParts)
