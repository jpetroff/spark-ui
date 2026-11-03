<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface TabsIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsIndicatorProps extends Assign<HTMLProps<'div'>, TabsIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useTabsContext } from "./use-tabs-context.ts";

  let { ref = $bindable(null), ...props }: TabsIndicatorProps = $props()
  const tabs = useTabsContext()
  const mergedProps = $derived(mergeProps(tabs().getIndicatorProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
