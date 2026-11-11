'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { Switch as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled Switch. Subcomponents remain available as Switch.Root, etc. */
export interface SwitchProps {
  /** Accessible label next to the control. */
  label: ReactNode
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Checked/defaultChecked, onCheckedChange, disabled, name and value. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Associated label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Track classes and events. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Movable thumb props. */
    thumb?: Omit<ComponentProps<typeof ComponentParts.Thumb>, 'children'>
    /** Native input; preserve for forms and accessibility. */
    hiddenInput?: Omit<ComponentProps<typeof ComponentParts.HiddenInput>, 'children'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/switch
 * @example
 * <Switch label="Email notifications" parts={{ root: { defaultChecked: true } }} />
 */
export const Switch = Object.assign(function Switch({ label, parts = {} }: SwitchProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Control {...parts.control}>
        <ComponentParts.Thumb {...parts.thumb} />
      </ComponentParts.Control>
      <ComponentParts.Label {...parts.label}>{label}</ComponentParts.Label>
      <ComponentParts.HiddenInput {...parts.hiddenInput} />
    </ComponentParts.Root>
  )
}, ComponentParts)
