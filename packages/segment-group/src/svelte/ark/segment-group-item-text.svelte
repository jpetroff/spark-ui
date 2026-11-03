<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SegmentGroupItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SegmentGroupItemTextProps extends Assign<HTMLProps<'span'>, SegmentGroupItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { parts } from "./segment-group.anatomy.ts";
  import { useSegmentGroupContext } from "./use-segment-group-context.ts";
  import { useSegmentGroupItemPropsContext } from "./use-segment-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: SegmentGroupItemTextProps = $props()
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(segmentGroup().getItemTextProps(itemProps()), parts.itemText.attrs, props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
