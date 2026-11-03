<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface ScrollAreaContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaContentProps extends Assign<HTMLProps<'div'>, ScrollAreaContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useScrollAreaContext } from "./use-scroll-area-context.ts";

  let { ref = $bindable(null), ...props }: ScrollAreaContentProps = $props()

  const scrollArea = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollArea().getContentProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
