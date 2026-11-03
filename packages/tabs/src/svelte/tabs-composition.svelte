<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { TabsProps } from '../svelte.ts'
  import { Tabs as ComponentParts } from './ark/index.ts'

  let { label, items, parts = {} }: TabsProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.List {...parts.list} aria-label={label}>
    {#each items as item (item.value)}
      <ComponentParts.Trigger {...parts.trigger} value={item.value} disabled={item.disabled}>{item.label}</ComponentParts.Trigger>
    {/each}
  </ComponentParts.List>
  {#each items as item (item.value)}
    <ComponentParts.Content {...parts.content} value={item.value}>{@render item.content()}</ComponentParts.Content>
  {/each}
</ComponentParts.Root>
