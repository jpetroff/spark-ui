'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { Toggle as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled Toggle. Subcomponents remain available as Toggle.Root, etc. */
export interface ToggleProps {
  /** Button content must give the toggle an accessible name. */
  children: ReactNode
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Pressed/defaultPressed, onPressedChange, disabled, label and button events. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/toggle
 * @example
 * <Toggle parts={{ root: { defaultPressed: true } }}>Bold</Toggle>
 */
export const Toggle = Object.assign(function Toggle({ children, parts = {} }: ToggleProps) {
  return <ComponentParts.Root {...parts.root}>{children}</ComponentParts.Root>
}, ComponentParts)
