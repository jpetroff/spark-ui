<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SwapIndicatorBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    type: 'on' | 'off'
  }
  export interface SwapIndicatorProps extends Assign<HTMLProps<'span'>, SwapIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSwapContext } from "./use-swap-context.ts";

  let { ref = $bindable(null), type, children, ...props }: SwapIndicatorProps = $props()

  const swap = useSwapContext()
  const presence = $derived(type === 'on' ? swap().onPresence() : swap().offPresence())
  const mergedProps = $derived(mergeProps(swap().getIndicatorProps({ type }), props))

  function setNode(node: Element | null) {
    presence.setNode(node)
  }
</script>

{#if !presence.unmounted}
  <Ark as="span" bind:ref {...mergedProps} {@attach setNode}>
    {@render children?.()}
  </Ark>
{/if}
