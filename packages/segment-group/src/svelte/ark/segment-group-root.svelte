<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ValueChangeDetails } from '@spark/radio-group/common/zag/radio-group/index.ts'
  import type { UseSegmentGroupProps } from "./use-segment-group.svelte.ts";

  export interface SegmentGroupRootEmits {
    valueChange: ValueChangeDetails
  }

  export interface SegmentGroupRootBaseProps extends UseSegmentGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SegmentGroupRootProps extends Assign<HTMLProps<'div'>, SegmentGroupRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { parts } from "./segment-group.anatomy.ts";
  import { splitSegmentGroupProps } from "./split-segment-group-props.svelte.ts";
  import { useSegmentGroup } from "./use-segment-group.svelte.ts";
  import { SegmentGroupProvider } from "./use-segment-group-context.ts";

  let { ref = $bindable(null), value = $bindable(), ...props }: SegmentGroupRootProps = $props()
  const providedId = $props.id()

  const [segmentGroupProps, localProps] = $derived(splitSegmentGroupProps(props))

  const resolvedProps = $derived<UseSegmentGroupProps>({
    ...segmentGroupProps,
    id: segmentGroupProps.id ?? providedId,
    value,
    onValueChange(details) {
      segmentGroupProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const segmentGroup = useSegmentGroup(() => resolvedProps)
  const mergedProps = $derived(mergeProps(segmentGroup().getRootProps(), parts.root.attrs, localProps))

  SegmentGroupProvider(segmentGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />
