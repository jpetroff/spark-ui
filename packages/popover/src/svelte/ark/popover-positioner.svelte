<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface PopoverPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverPositionerProps extends Assign<HTMLProps<'div'>, PopoverPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "../../../../presence/src/svelte/ark/use-presence-context.ts";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverPositionerProps = $props()

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived(mergeProps(popover().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
