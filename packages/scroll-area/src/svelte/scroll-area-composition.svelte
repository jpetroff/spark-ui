<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { ScrollAreaProps } from '../svelte.ts'
  import { ScrollArea as ComponentParts } from './ark/index.ts'

  let { children, parts = {} }: ScrollAreaProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Viewport tabindex={0} {...parts.viewport}>
    <ComponentParts.Content {...parts.content}>{@render children()}</ComponentParts.Content>
  </ComponentParts.Viewport>
  <ComponentParts.Scrollbar {...parts.verticalScrollbar} orientation="vertical"><ComponentParts.Thumb {...parts.verticalThumb} /></ComponentParts.Scrollbar>
  <ComponentParts.Scrollbar {...parts.horizontalScrollbar} orientation="horizontal"><ComponentParts.Thumb {...parts.horizontalThumb} /></ComponentParts.Scrollbar>
  <ComponentParts.Corner {...parts.corner} />
</ComponentParts.Root>
