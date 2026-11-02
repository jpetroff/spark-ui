<!-- Editable composition. See the public component index for its documented prop API and usage. -->
<script lang="ts">
  import type { DialogProps } from '../svelte.ts'
  import { Dialog } from './ark/index.ts'

  let { title, description, trigger, children, closeLabel, parts = {} }: DialogProps = $props()
</script>

<Dialog.Root {...parts.root}>
  <Dialog.Trigger {...parts.trigger}>
    {#if trigger}
      {@render trigger()}
    {:else}
      Open dialog
    {/if}
  </Dialog.Trigger>
  <Dialog.Backdrop {...parts.backdrop} />
  <Dialog.Positioner {...parts.positioner}>
    <Dialog.Content {...parts.content}>
      <Dialog.Title {...parts.title}>{@render title()}</Dialog.Title>
      {#if description}
        <Dialog.Description {...parts.description}>{@render description()}</Dialog.Description>
      {/if}
      {@render children?.()}
      <Dialog.CloseTrigger {...parts.closeTrigger}>
        {#if closeLabel}
          {@render closeLabel()}
        {:else}
          Close
        {/if}
      </Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
