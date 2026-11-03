<script lang="ts" module>
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ResizeTriggerProps } from '../../common/zag/floating-panel/index.ts'

  export interface FloatingPanelResizeTriggerBaseProps
    extends ResizeTriggerProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface FloatingPanelResizeTriggerProps extends Assign<
    HTMLProps<'div'>,
    FloatingPanelResizeTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

  let { ref = $bindable(null), ...props }: FloatingPanelResizeTriggerProps = $props()
  const [resizeProps, localProps] = $derived(createSplitProps<ResizeTriggerProps>()(props, ['axis']))

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getResizeTriggerProps(resizeProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
