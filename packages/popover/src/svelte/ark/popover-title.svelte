<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface PopoverTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface PopoverTitleProps extends Assign<HTMLProps<'h2'>, PopoverTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverTitleProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
