<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseScrollAreaContext } from "./use-scroll-area-context.ts";

  export interface ScrollAreaRootProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseScrollAreaContext
  }
  export interface ScrollAreaRootProviderProps extends Assign<HTMLProps<'div'>, ScrollAreaRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { ScrollAreaProvider } from "./use-scroll-area-context.ts";

  let { value, ref = $bindable(null), ...props }: ScrollAreaRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ScrollAreaProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
