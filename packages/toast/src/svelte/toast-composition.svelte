<!-- Editable notification-region composition; store title/description values are snippets. -->
<script lang="ts">
  import type { ToastProps } from '../svelte.ts'
  import { Toast as ComponentParts, Toaster } from './ark/index.ts'
  let { toaster, parts = {} }: ToastProps = $props()
</script>

<Toaster {...parts.toaster} {toaster}>
  {#snippet children(toast)}
    <ComponentParts.Root {...parts.root}>
      {#if toast().title}
        <ComponentParts.Title {...parts.title}>{@render toast().title?.()}</ComponentParts.Title>
      {/if}
      {#if toast().description}
        <ComponentParts.Description {...parts.description}>{@render toast().description?.()}</ComponentParts.Description>
      {/if}
      <ComponentParts.CloseTrigger {...parts.closeTrigger}>Dismiss</ComponentParts.CloseTrigger>
    </ComponentParts.Root>
  {/snippet}
</Toaster>
