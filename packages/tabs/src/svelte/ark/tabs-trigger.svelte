<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { TriggerProps } from '../../common/zag/tabs/index.ts'

  export interface TabsTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface TabsTriggerProps extends Assign<HTMLProps<'button'>, TabsTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useTabsContext } from "./use-tabs-context.ts";

  let { ref = $bindable(null), ...props }: TabsTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value', 'disabled']))
  const tabs = useTabsContext()
  const mergedProps = $derived(mergeProps(tabs().getTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
