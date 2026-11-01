<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";

  export interface PopoverArrowTipBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface PopoverArrowTipProps extends Assign<HTMLProps<'div'>, PopoverArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverArrowTipProps = $props()

  const popover = usePopoverContext()
  const mergedProps = $derived(mergeProps(popover().getArrowTipProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
