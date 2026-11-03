<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { ContentProps } from '../../common/zag/tabs/index.ts'

  export interface TabsContentBaseProps extends ContentProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface TabsContentProps extends Assign<HTMLProps<'div'>, TabsContentBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { useRenderStrategyPropsContext } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
import { type UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { useTabsContext } from "./use-tabs-context.ts";

  let { ref = $bindable(null), ...props }: TabsContentProps = $props()
  const [contentProps, localProps] = $derived(createSplitProps<ContentProps>()(props, ['value']))

  const tabs = useTabsContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const machineProps = $derived.by<UsePresenceProps>(() => ({
    ...renderStrategyProps(),
    present: tabs().value === contentProps.value,
    immediate: true,
  }))

  const presence = usePresence(() => machineProps)

  const mergedProps = $derived(
    mergeProps(tabs().getContentProps(contentProps), presence().getPresenceProps(), localProps),
  )

  PresenceProvider(presence)

  function setNode(node: Element | null) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} {@attach setNode} />
{/if}
