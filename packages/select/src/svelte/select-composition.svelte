<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { SelectProps } from '../svelte.ts'
  import { Select as ComponentParts } from './ark/index.ts'
  import { createListCollection } from './ark/index.ts'

  let { label, items, placeholder = 'Select an option', parts = {} }: SelectProps = $props()
  const collection = $derived(createListCollection({ items }))
</script>

<ComponentParts.Root {...parts.root} {collection}>
  <ComponentParts.Label {...parts.label}>{@render label()}</ComponentParts.Label>
  <ComponentParts.Control {...parts.control}>
    <ComponentParts.Trigger {...parts.trigger}>
      <ComponentParts.ValueText {...parts.valueText} {placeholder} />
      <ComponentParts.Indicator aria-hidden="true" {...parts.indicator}>▾</ComponentParts.Indicator>
    </ComponentParts.Trigger>
  </ComponentParts.Control>
  <ComponentParts.Positioner {...parts.positioner}>
    <ComponentParts.Content {...parts.content}>
      <ComponentParts.List {...parts.list}>
        {#each collection.items as item (item.value)}
          <ComponentParts.Item {...parts.item} {item}>
            <ComponentParts.ItemText {...parts.itemText}>{item.label}</ComponentParts.ItemText>
            <ComponentParts.ItemIndicator aria-hidden="true" {...parts.itemIndicator}>✓</ComponentParts.ItemIndicator>
          </ComponentParts.Item>
        {/each}
      </ComponentParts.List>
    </ComponentParts.Content>
  </ComponentParts.Positioner>
  <ComponentParts.HiddenSelect {...parts.hiddenSelect} />
</ComponentParts.Root>
