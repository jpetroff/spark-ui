'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { SegmentGroup as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled SegmentGroup. Subcomponents remain available as SegmentGroup.Root, etc. */
export interface SegmentGroupProps {
  /** Accessible group label. */
  label: ReactNode
  /** Unique values with display labels and optional disabled states. */
  items: { value: string; label: string; disabled?: boolean }[]
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, onValueChange, disabled, name and orientation. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Group label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Props shared by items; value and disabled come from items. */
    item?: Omit<ComponentProps<typeof ComponentParts.Item>, 'children' | 'value' | 'disabled'>
    /** Visual selection control. */
    itemControl?: Omit<ComponentProps<typeof ComponentParts.ItemControl>, 'children'>
    /** Item text props. */
    itemText?: Omit<ComponentProps<typeof ComponentParts.ItemText>, 'children'>
    /** Native inputs; preserve for form submission. */
    itemHiddenInput?: Omit<ComponentProps<typeof ComponentParts.ItemHiddenInput>, 'children'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/segment-group
 * @example
 * <SegmentGroup label="Plan" items={[{ value: "free", label: "Free" }, { value: "pro", label: "Pro" }]} parts={{ root: { defaultValue: "free" } }} />
 */
export const SegmentGroup = Object.assign(function SegmentGroup({
  label,
  items,
  parts = {},
}: SegmentGroupProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Label {...parts.label}>{label}</ComponentParts.Label>
      {items.map((item) => (
        <ComponentParts.Item
          {...parts.item}
          key={item.value}
          value={item.value}
          disabled={item.disabled}
        >
          <ComponentParts.ItemControl {...parts.itemControl} />
          <ComponentParts.ItemText {...parts.itemText}>{item.label}</ComponentParts.ItemText>
          <ComponentParts.ItemHiddenInput {...parts.itemHiddenInput} />
        </ComponentParts.Item>
      ))}
    </ComponentParts.Root>
  )
}, ComponentParts)
