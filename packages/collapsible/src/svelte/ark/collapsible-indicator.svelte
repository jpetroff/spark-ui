<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface CollapsibleIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface CollapsibleIndicatorProps extends Assign<HTMLProps<'div'>, CollapsibleIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useCollapsibleContext } from "./use-collapsible-context.ts";

  let { ref = $bindable(null), ...props }: CollapsibleIndicatorProps = $props()
  const collapsible = useCollapsibleContext()
  const mergedProps = $derived(mergeProps(collapsible().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
