<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseSwapProps } from "./use-swap.svelte.ts";

  export interface SwapRootBaseProps extends UseSwapProps, PolymorphicProps<'span'>, RefAttribute {}
  export interface SwapRootProps extends Assign<HTMLProps<'span'>, SwapRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useSwap } from "./use-swap.svelte.ts";
  import { SwapProvider } from "./use-swap-context.ts";

  let { ref = $bindable(null), children, swap: swapProp, lazyMount, unmountOnExit, ...props }: SwapRootProps = $props()

  const swap = useSwap(() => ({ swap: swapProp, lazyMount, unmountOnExit }))
  const mergedProps = $derived(mergeProps(swap().getRootProps(), props))

  SwapProvider(swap)
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {@render children?.()}
</Ark>
