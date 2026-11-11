import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Menu as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/menu-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled Menu. Subcomponents remain available as Menu.Root, etc. */
export interface MenuProps {
  /** Accessible trigger content. */
  trigger: Snippet
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
 * Editable markup lives in ./svelte/menu-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/menu
 * @example
 * <Menu items={[{ value: "edit", label: "Edit" }]}>{#snippet trigger()}Actions{/snippet}</Menu>
 */
export const Menu = Object.assign(AssembledComponent, ComponentParts)
