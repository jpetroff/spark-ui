<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface HoverCardPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardPositionerProps extends Assign<HTMLProps<'div'>, HoverCardPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useHoverCardContext } from "./use-hover-card-context.ts";

  let { ref = $bindable(null), ...props }: HoverCardPositionerProps = $props()

  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(hoverCard().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
