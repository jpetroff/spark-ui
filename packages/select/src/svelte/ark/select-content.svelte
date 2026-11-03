<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SelectContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SelectContentProps extends Assign<HTMLProps<'div'>, SelectContentBaseProps> {}
</script>

<script lang="ts">
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useSelectContext } from "./use-select-context.ts";

  let { ref = $bindable(null), ...props }: SelectContentProps = $props()
  const select = useSelectContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(select().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
