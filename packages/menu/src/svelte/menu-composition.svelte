<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { MenuProps } from '../svelte.ts'
  import { Menu as ComponentParts } from './ark/index.ts'

  let { trigger, items, parts = {} }: MenuProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Trigger {...parts.trigger}>{@render trigger()}</ComponentParts.Trigger>
  <ComponentParts.Positioner {...parts.positioner}>
    <ComponentParts.Content {...parts.content}>
      {#each items as item (item.value)}
        <ComponentParts.Item {...parts.item} value={item.value} disabled={item.disabled}>
          <ComponentParts.ItemText {...parts.itemText}>{item.label}</ComponentParts.ItemText>
        </ComponentParts.Item>
      {/each}
    </ComponentParts.Content>
  </ComponentParts.Positioner>
</ComponentParts.Root>
