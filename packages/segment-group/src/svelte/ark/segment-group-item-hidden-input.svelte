<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface SegmentGroupItemHiddenInputProps extends Assign<
    HTMLProps<'input'>,
    SegmentGroupItemHiddenInputBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSegmentGroupContext } from "./use-segment-group-context.ts";
  import { useSegmentGroupItemPropsContext } from "./use-segment-group-item-props-context.ts";

  let { ref = $bindable(null), ...props }: SegmentGroupItemHiddenInputProps = $props()
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(segmentGroup().getItemHiddenInputProps(itemProps()), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
