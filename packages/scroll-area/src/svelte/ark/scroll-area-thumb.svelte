<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface ScrollAreaThumbBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaThumbProps extends Assign<HTMLProps<'div'>, ScrollAreaThumbBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useScrollAreaContext } from "./use-scroll-area-context.ts";
  import { useScrollAreaScrollbarContext } from "./use-scroll-area-scrollbar-context.ts";

  let { ref = $bindable(null), ...props }: ScrollAreaThumbProps = $props()

  const scrollAreaApi = useScrollAreaContext()
  const scrollbarProps = useScrollAreaScrollbarContext()

  const mergedProps = $derived(mergeProps(scrollAreaApi().getThumbProps(scrollbarProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
