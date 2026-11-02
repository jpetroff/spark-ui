<!-- Editable composition. See the public component index for its documented prop API and usage. -->
<script lang="ts">
  import type { PopoverProps } from '../svelte.ts'
  import { Popover } from './ark/index.ts'

  let { title, description, trigger, children, closeLabel, parts = {} }: PopoverProps = $props()
</script>

<Popover.Root {...parts.root}>
  <Popover.Trigger {...parts.trigger}>
    {#if trigger}
      {@render trigger()}
    {:else}
      Open popover
    {/if}
  </Popover.Trigger>
  <Popover.Positioner {...parts.positioner}>
    <Popover.Content {...parts.content}>
      <Popover.Title {...parts.title}>{@render title()}</Popover.Title>
      {#if description}
        <Popover.Description {...parts.description}>{@render description()}</Popover.Description>
      {/if}
      {@render children?.()}
      <Popover.CloseTrigger {...parts.closeTrigger}>
        {#if closeLabel}
          {@render closeLabel()}
        {:else}
          Close
        {/if}
      </Popover.CloseTrigger>
    </Popover.Content>
  </Popover.Positioner>
</Popover.Root>
