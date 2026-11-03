'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { Tabs as ComponentParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/** Editable assembled Tabs. Subcomponents remain available as Tabs.Root, etc. */
export interface TabsProps {
  /** Accessible name for the tab list. */
  label: string
  /** Unique values, trigger labels and corresponding panel content. */
  items: { value: string; label: string; content: ReactNode; disabled?: boolean }[]
  /** Typed primitive props. Customize markup here; use className (React) or class (Svelte). */
  parts?: {
    /** Value/defaultValue, onValueChange, orientation and activationMode. */
    root?: Omit<ComponentProps<typeof ComponentParts.Root>, 'children'>
    /** Tab list props. */
    list?: Omit<ComponentProps<typeof ComponentParts.List>, 'children' | 'aria-label'>
    /** Props shared by tabs; values and disabled states come from items. */
    trigger?: Omit<ComponentProps<typeof ComponentParts.Trigger>, 'children' | 'value' | 'disabled'>
    /** Panel props; value is supplied by each item. */
    content?: Omit<ComponentProps<typeof ComponentParts.Content>, 'children' | 'value'>
  }
}

/**
 * Customize this assembly and its documented parts for your application.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/tabs
 * @example
 * <Tabs label="Settings" items={[{ value: "account", label: "Account", content: "Account settings" }]} parts={{ root: { defaultValue: "account" } }} />
 */
export const Tabs = Object.assign(function Tabs({ label, items, parts = {} }: TabsProps) {
  return (
    <ComponentParts.Root {...parts.root}>
      <ComponentParts.List {...parts.list} aria-label={label}>
        {items.map((item) => (
          <ComponentParts.Trigger
            {...parts.trigger}
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </ComponentParts.Trigger>
        ))}
      </ComponentParts.List>
      {items.map((item) => (
        <ComponentParts.Content {...parts.content} key={item.value} value={item.value}>
          {item.content}
        </ComponentParts.Content>
      ))}
    </ComponentParts.Root>
  )
}, ComponentParts)
