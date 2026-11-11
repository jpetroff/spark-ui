'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { Swap as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled Swap. Subcomponents remain available as Swap.Root, etc. */
export interface SwapProps {
  /** Content shown when parts.root.swap is true. */
  on: ReactNode
  /** Content shown when parts.root.swap is false. */
  off: ReactNode
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Controlled swap state, lazyMount and unmountOnExit. This is a display primitive; supply your own interactive trigger. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** On-state content props. */
    onIndicator?: Omit<ComponentProps<typeof ComponentParts.Indicator>, 'children' | 'type'>
    /** Off-state content props. */
    offIndicator?: Omit<ComponentProps<typeof ComponentParts.Indicator>, 'children' | 'type'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/swap
 * @example
 * <Swap on="Saved" off="Unsaved" parts={{ root: { swap: true } }} />
 */
export const Swap = Object.assign(function Swap({ on, off, parts = {} }: SwapProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Indicator {...parts.onIndicator} type="on">
        {on}
      </ComponentParts.Indicator>
      <ComponentParts.Indicator {...parts.offIndicator} type="off">
        {off}
      </ComponentParts.Indicator>
    </ComponentParts.Root>
  )
}, ComponentParts)
