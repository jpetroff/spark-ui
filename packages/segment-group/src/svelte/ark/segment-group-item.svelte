<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ItemProps } from '@spark/radio-group/common/zag/radio-group/index.ts'

  export interface SegmentGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'>, RefAttribute {}
  export interface SegmentGroupItemProps extends Assign<HTMLProps<'label'>, SegmentGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { parts } from "./segment-group.anatomy.ts";
  import { useSegmentGroupContext } from "./use-segment-group-context.ts";
  import { SegmentGroupItemProvider } from "./use-segment-group-item-context.ts";
  import { SegmentGroupItemPropsProvider } from "./use-segment-group-item-props-context.ts";
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";

  let { ref = $bindable(null), ...props }: SegmentGroupItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'disabled', 'invalid']))

  const segmentGroup = useSegmentGroupContext()

  const itemState = $derived(segmentGroup().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(segmentGroup().getItemProps(itemProps), parts.item.attrs, localProps))

  SegmentGroupItemProvider(() => itemState)
  SegmentGroupItemPropsProvider(() => itemProps)
</script>

<Ark as="label" bind:ref {...mergedProps} />
