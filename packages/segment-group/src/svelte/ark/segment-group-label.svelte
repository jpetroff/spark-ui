<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SegmentGroupLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SegmentGroupLabelProps extends Assign<HTMLProps<'span'>, SegmentGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { parts } from "./segment-group.anatomy.ts";
  import { useSegmentGroupContext } from "./use-segment-group-context.ts";

  let { ref = $bindable(null), ...props }: SegmentGroupLabelProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = $derived(mergeProps(segmentGroup().getLabelProps(), parts.label.attrs, props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
