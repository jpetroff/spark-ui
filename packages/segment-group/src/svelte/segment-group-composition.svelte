<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { SegmentGroupProps } from '../svelte.ts'
  import { SegmentGroup as ComponentParts } from './ark/index.ts'

  let { label, items, parts = {} }: SegmentGroupProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Label {...parts.label}>{@render label()}</ComponentParts.Label>
  {#each items as item (item.value)}
    <ComponentParts.Item {...parts.item} value={item.value} disabled={item.disabled}>
      <ComponentParts.ItemControl {...parts.itemControl} />
      <ComponentParts.ItemText {...parts.itemText}>{item.label}</ComponentParts.ItemText>
      <ComponentParts.ItemHiddenInput {...parts.itemHiddenInput} />
    </ComponentParts.Item>
  {/each}
</ComponentParts.Root>
