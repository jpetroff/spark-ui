<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface PopoverTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface PopoverTitleProps extends Assign<HTMLProps<'h2'>, PopoverTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverTitleProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps({ class: 'spark-popover-title' }, popover().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
