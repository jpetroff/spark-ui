<script lang="ts" module>
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FloatingPanelCloseTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface FloatingPanelCloseTriggerProps extends Assign<
    HTMLProps<'button'>,
    FloatingPanelCloseTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

  let { ref = $bindable(null), ...props }: FloatingPanelCloseTriggerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getCloseTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
