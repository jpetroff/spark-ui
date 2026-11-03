<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { FloatingPanelProps } from '../svelte.ts'
  import { FloatingPanel as ComponentParts } from './ark/index.ts'

  let { title, trigger, children, parts = {} }: FloatingPanelProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Trigger {...parts.trigger}>{@render trigger()}</ComponentParts.Trigger>
  <ComponentParts.Positioner {...parts.positioner}>
    <ComponentParts.Content {...parts.content}>
      <ComponentParts.DragTrigger {...parts.dragTrigger}>
        <ComponentParts.Header {...parts.header}>
          <ComponentParts.Title {...parts.title}>{@render title()}</ComponentParts.Title>
          <ComponentParts.Control {...parts.control}>
            <ComponentParts.CloseTrigger {...parts.closeTrigger}>Close</ComponentParts.CloseTrigger>
          </ComponentParts.Control>
        </ComponentParts.Header>
      </ComponentParts.DragTrigger>
      <ComponentParts.Body {...parts.body}>{@render children?.()}</ComponentParts.Body>
      <ComponentParts.ResizeTrigger {...parts.resizeTrigger} axis="se" />
    </ComponentParts.Content>
  </ComponentParts.Positioner>
</ComponentParts.Root>
