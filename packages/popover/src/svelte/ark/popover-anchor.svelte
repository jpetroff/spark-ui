<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface PopoverAnchorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverAnchorProps extends Assign<HTMLProps<'div'>, PopoverAnchorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverAnchorProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-popover-anchor' }, popover().getAnchorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
