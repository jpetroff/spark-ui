<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { HoverCardProps } from '../svelte.ts'
  import { HoverCard as ComponentParts } from './ark/index.ts'

  let { trigger, children, parts = {} }: HoverCardProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Trigger {...parts.trigger}>{@render trigger()}</ComponentParts.Trigger>
  <ComponentParts.Positioner {...parts.positioner}>
    <ComponentParts.Content {...parts.content}>{@render children()}</ComponentParts.Content>
  </ComponentParts.Positioner>
</ComponentParts.Root>
