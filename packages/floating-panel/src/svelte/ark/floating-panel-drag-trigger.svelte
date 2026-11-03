<script lang="ts" module>
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FloatingPanelDragTriggerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FloatingPanelDragTriggerProps extends Assign<HTMLProps<'div'>, FloatingPanelDragTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

  let { ref = $bindable(null), ...props }: FloatingPanelDragTriggerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getDragTriggerProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
