<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface PopoverPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverPositionerProps extends Assign<HTMLProps<'div'>, PopoverPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverPositionerProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-popover-positioner' }, popover().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
