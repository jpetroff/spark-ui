<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface HoverCardContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardContentProps extends Assign<HTMLProps<'div'>, HoverCardContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useHoverCardContext } from "./use-hover-card-context.ts";

  let { ref = $bindable(null), ...props }: HoverCardContentProps = $props()

  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(hoverCard().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {@attach setNode} {...mergedProps} />
{/if}
