<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface CollapsibleTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface CollapsibleTriggerProps extends Assign<HTMLProps<'button'>, CollapsibleTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useCollapsibleContext } from "./use-collapsible-context.ts";

  let { ref = $bindable(null), ...props }: CollapsibleTriggerProps = $props()
  const collapsible = useCollapsibleContext()
  const mergedProps = $derived(mergeProps(collapsible().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
