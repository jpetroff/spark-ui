'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { useMemo } from 'react'
import { createListCollection } from './react/ark/index.ts'
import { Select as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled Select. Subcomponents remain available as Select.Root, etc. */
export interface SelectProps {
  /** Associated label. */
  label: ReactNode
  /** Unique values and labels; this wrapper builds a list collection for you. */
  items: { value: string; label: string; disabled?: boolean }[]
  /** Displayed before a value is selected. */
  placeholder?: string
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, multiple, onValueChange, disabled, name and positioning. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children' | 'collection'>
    /** Associated label props. */
    label?: Omit<ComponentProps<typeof ComponentParts.Label>, 'children'>
    /** Control layout props. */
    control?: Omit<ComponentProps<typeof ComponentParts.Control>, 'children'>
    /** Select trigger button props. */
    trigger?: Omit<ComponentProps<typeof ComponentParts.Trigger>, 'children'>
    /** Selected value text props. */
    valueText?: Omit<ComponentProps<typeof ComponentParts.ValueText>, 'children' | 'placeholder'>
    /** Dropdown indicator props. */
    indicator?: Omit<ComponentProps<typeof ComponentParts.Indicator>, 'children'>
    /** Positioning wrapper props. */
    positioner?: Omit<ComponentProps<typeof ComponentParts.Positioner>, 'children'>
    /** Popup surface props. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children'>
    /** Listbox props. */
    list?: Omit<ComponentProps<typeof ComponentParts.List>, 'children'>
    /** Shared item props; item data is supplied by the wrapper. */
    item?: Omit<ComponentProps<typeof ComponentParts.Item>, 'children' | 'item'>
    /** Option text props. */
    itemText?: Omit<ComponentProps<typeof ComponentParts.ItemText>, 'children'>
    /** Selected option marker props. */
    itemIndicator?: Omit<ComponentProps<typeof ComponentParts.ItemIndicator>, 'children'>
    /** Native select for form submission and autofill. */
    hiddenSelect?: Omit<ComponentProps<typeof ComponentParts.HiddenSelect>, 'children'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/select
 * @example
 * <Select label="Framework" items={[{ value: "react", label: "React" }, { value: "svelte", label: "Svelte" }]} />
 */
export const Select = Object.assign(function Select({
  label,
  items,
  placeholder = 'Select an option',
  parts = {},
}: SelectProps) {
  const collection = useMemo(() => createListCollection({ items }), [items])
  return (
    <ComponentParts.Root {...parts.root} collection={collection}>
      <ComponentParts.Label {...parts.label}>{label}</ComponentParts.Label>
      <ComponentParts.Control {...parts.control}>
        <ComponentParts.Trigger {...parts.trigger}>
          <ComponentParts.ValueText {...parts.valueText} placeholder={placeholder} />
          <ComponentParts.Indicator aria-hidden="true" {...parts.indicator}>
            ▾
          </ComponentParts.Indicator>
        </ComponentParts.Trigger>
      </ComponentParts.Control>
      <ComponentParts.Positioner {...parts.positioner}>
        <ComponentParts.Content {...parts.content}>
          <ComponentParts.List {...parts.list}>
            {collection.items.map((item) => (
              <ComponentParts.Item {...parts.item} key={item.value} item={item}>
                <ComponentParts.ItemText {...parts.itemText}>{item.label}</ComponentParts.ItemText>
                <ComponentParts.ItemIndicator aria-hidden="true" {...parts.itemIndicator}>
                  ✓
                </ComponentParts.ItemIndicator>
              </ComponentParts.Item>
            ))}
          </ComponentParts.List>
        </ComponentParts.Content>
      </ComponentParts.Positioner>
      <ComponentParts.HiddenSelect {...parts.hiddenSelect} />
    </ComponentParts.Root>
  )
}, ComponentParts)
