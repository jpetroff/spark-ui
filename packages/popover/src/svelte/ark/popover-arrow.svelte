<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface PopoverArrowBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverArrowProps extends Assign<HTMLProps<'div'>, PopoverArrowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverArrowProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getArrowProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
