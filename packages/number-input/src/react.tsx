'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { NumberInput as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled NumberInput. Subcomponents remain available as NumberInput.Root, etc. */
export interface NumberInputProps {
  /** Associated input label. */
  label: ReactNode
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, min, max, step, disabled, name and change callbacks. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Associated label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Layout around the input and step buttons. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Input classes, placeholder, ref and events. */
    input?: Omit<ComponentProps<typeof ComponentParts.Input>, 'children'>
    /** Decrease button props. */
    decrementTrigger?: Omit<ComponentProps<typeof ComponentParts.DecrementTrigger>, 'children'>
    /** Increase button props. */
    incrementTrigger?: Omit<ComponentProps<typeof ComponentParts.IncrementTrigger>, 'children'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/number-input
 * @example
 * <NumberInput label="Quantity" parts={{ root: { defaultValue: "1", min: 0, max: 10 } }} />
 */
export const NumberInput = Object.assign(function NumberInput({
  label,
  parts = {},
}: NumberInputProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Label {...parts.label}>{label}</ComponentParts.Label>
      <ComponentParts.Control {...parts.control}>
        <ComponentParts.DecrementTrigger aria-label="Decrease value" {...parts.decrementTrigger}>
          −
        </ComponentParts.DecrementTrigger>
        <ComponentParts.Input {...parts.input} />
        <ComponentParts.IncrementTrigger aria-label="Increase value" {...parts.incrementTrigger}>
          +
        </ComponentParts.IncrementTrigger>
      </ComponentParts.Control>
    </ComponentParts.Root>
  )
}, ComponentParts)
