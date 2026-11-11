import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Tabs as ComponentParts } from './svelte/ark/index.ts'
import AssembledComponent from './svelte/tabs-composition.svelte'
export * from './svelte/ark/index.ts'

/** Editable assembled Tabs. Subcomponents remain available as Tabs.Root, etc. */
export interface TabsProps {
  /** Accessible name for the tab list. */
  label: string
  /** Unique values, trigger labels and corresponding panel content. */
  items: { value: string; label: string; content: Snippet; disabled?: boolean }[]
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
 * Editable markup lives in ./svelte/tabs-composition.svelte.
 * Content props are snippets; pass primitive state and callbacks through parts.root.
 * Use the compound API for bind:ref and individual primitive bindings.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/tabs
 * @example
 * {#snippet overview()}Project overview{/snippet}
 * <Tabs label="Project" items={[{ value: "overview", label: "Overview", content: overview }]} parts={{ root: { defaultValue: "overview" } }} />
 */
export const Tabs = Object.assign(AssembledComponent, ComponentParts)
