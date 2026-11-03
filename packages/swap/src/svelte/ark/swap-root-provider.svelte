<script module lang="ts">
  import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseSwapReturn } from "./use-swap.svelte.ts";

  export interface SwapRootProviderBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    value: Accessor<UseSwapReturn>
  }
  export interface SwapRootProviderProps extends Assign<HTMLProps<'span'>, SwapRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { SwapProvider } from "./use-swap-context.ts";

  let { ref = $bindable(null), value, children, ...props }: SwapRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SwapProvider(() => value())
</script>

<Ark as="span" bind:ref {...mergedProps}>
  {@render children?.()}
</Ark>
