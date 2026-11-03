'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { Menu as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled Menu. Subcomponents remain available as Menu.Root, etc. */
export interface MenuProps {
  /** Accessible trigger content. */
  trigger: ReactNode
  /** Action values are reported through parts.root.onSelect. */
  items: { value: string; label: string; disabled?: boolean }[]
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Open/defaultOpen, onSelect, positioning and dismissal options. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Button props and optional asChild composition. */
    trigger?: Omit<ComponentProps<typeof ComponentParts.Trigger>, 'children'>
    /** Positioning wrapper props. */
    positioner?: Omit<ComponentProps<typeof ComponentParts.Positioner>, 'children'>
    /** Menu surface props. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children'>
    /** Props shared by actions; values and disabled states come from items. */
    item?: Omit<ComponentProps<typeof ComponentParts.Item>, 'children' | 'value' | 'disabled'>
    /** Action text props. */
    itemText?: Omit<ComponentProps<typeof ComponentParts.ItemText>, 'children'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/menu
 * @example
 * <Menu trigger="Actions" items={[{ value: "edit", label: "Edit" }]} />
 */
export const Menu = Object.assign(function Menu({ trigger, items, parts = {} }: MenuProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.Trigger {...parts.trigger}>{trigger}</ComponentParts.Trigger>
      <ComponentParts.Positioner {...parts.positioner}>
        <ComponentParts.Content {...parts.content}>
          {items.map((item) => (
            <ComponentParts.Item
              {...parts.item}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              <ComponentParts.ItemText {...parts.itemText}>{item.label}</ComponentParts.ItemText>
            </ComponentParts.Item>
          ))}
        </ComponentParts.Content>
      </ComponentParts.Positioner>
    </ComponentParts.Root>
  )
}, ComponentParts)
