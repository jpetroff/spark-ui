<script lang="ts" module>
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FloatingPanelTitleBaseProps extends PolymorphicProps<'h2'>, RefAttribute {}
  export interface FloatingPanelTitleProps extends Assign<HTMLProps<'h2'>, FloatingPanelTitleBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

  let { ref = $bindable(null), ...props }: FloatingPanelTitleProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getTitleProps(), props))
</script>

<Ark as="h2" bind:ref {...mergedProps} />
