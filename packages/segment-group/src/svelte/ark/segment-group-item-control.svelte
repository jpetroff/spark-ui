<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SegmentGroupItemControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SegmentGroupItemControlProps extends Assign<HTMLProps<'div'>, SegmentGroupItemControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { parts } from "./segment-group.anatomy.ts";
  import { useSegmentGroupContext } from "./use-segment-group-context.ts";
  import { useSegmentGroupItemPropsContext } from "./use-segment-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: SegmentGroupItemControlProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(
    mergeProps(segmentGroup().getItemControlProps(itemProps()), parts.itemControl.attrs, props),
  )
</script>

<Ark as="div" bind:ref {...mergedProps} />
