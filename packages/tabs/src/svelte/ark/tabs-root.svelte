<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseTabsProps } from "./use-tabs.svelte.ts";

  export interface TabsRootBaseProps extends UseTabsProps, RenderStrategyProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsRootProps extends Assign<HTMLProps<'div'>, TabsRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { RenderStrategyPropsProvider } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { type RenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { TabsProvider } from "./use-tabs-context.ts";
  import { useTabs } from "./use-tabs.svelte.ts";

  let { ref = $bindable(null), value = $bindable(), ...props }: TabsRootProps = $props()

  const [renderStrategyProps, tabsProps] = $derived(splitRenderStrategyProps(props))

  const id = $props.id()

  const [useTabsProps, localProps] = $derived.by(() => {
    const props = { ...tabsProps, value }
    return createSplitProps<UseTabsProps>()(props, [
      'value',
      'onValueChange',
      'onFocusChange',
      'orientation',
      'activationMode',
      'id',
      'ids',
      'loopFocus',
      'translations',
      'defaultValue',
      'composite',
      'deselectable',
      'navigate',
    ])
  })

  const machineProps = $derived.by<UseTabsProps>(() => ({
    ...useTabsProps,
    id: useTabsProps.id ?? id,
    value,
    onValueChange(details) {
      useTabsProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  }))

  const tabs = useTabs(() => machineProps)
  const mergedProps = $derived(mergeProps(tabs().getRootProps(), localProps))

  TabsProvider(tabs)
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
