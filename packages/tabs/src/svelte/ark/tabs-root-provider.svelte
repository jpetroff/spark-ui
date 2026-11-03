<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseTabsReturn } from "./use-tabs.svelte.ts";

  interface RootProviderProps {
    value: UseTabsReturn
  }

  export interface TabsRootProviderBaseProps
    extends RootProviderProps, PolymorphicProps<'div'>, RenderStrategyProps, RefAttribute {}
  export interface TabsRootProviderProps extends Assign<HTMLProps<'div'>, TabsRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { TabsProvider } from "./use-tabs-context.ts";
  import { RenderStrategyPropsProvider } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { type RenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";

  let { ref = $bindable(null), ...props }: TabsRootProviderProps = $props()

  const [renderStrategyProps, tabsProps] = $derived(splitRenderStrategyProps(props))
  const [rootProviderProps, localProps] = $derived(createSplitProps<RootProviderProps>()(tabsProps, ['value']))

  const mergedProps = $derived(mergeProps(rootProviderProps.value().getRootProps(), localProps))

  TabsProvider(() => rootProviderProps.value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
