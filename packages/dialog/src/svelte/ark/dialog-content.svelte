<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface DialogContentBaseProps extends PolymorphicProps<'div'> {
    ref?: Element | null
  }
  export interface DialogContentProps extends Assign<HTMLProps<'div'>, DialogContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogContentProps = $props()

  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-dialog-content' }, dialog().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
