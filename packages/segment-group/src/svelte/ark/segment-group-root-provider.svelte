<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseSegmentGroupReturn } from "./use-segment-group.svelte.ts";

  interface RootProviderProps {
    value: UseSegmentGroupReturn
  }

  export interface SegmentGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SegmentGroupRootProviderProps extends Assign<HTMLProps<'div'>, SegmentGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { parts } from "./segment-group.anatomy.ts";
  import { SegmentGroupProvider } from "./use-segment-group-context.ts";

  let { ref = $bindable(null), value, ...props }: SegmentGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), parts.root.attrs, props))

  SegmentGroupProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
