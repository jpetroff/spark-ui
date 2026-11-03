<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { Orientation } from '@spark/shared/common/zag/types/index.ts'

  interface ScrollbarProps {
    orientation?: Orientation
  }

  export interface ScrollAreaScrollbarBaseProps extends ScrollbarProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaScrollbarProps extends Assign<HTMLProps<'div'>, ScrollAreaScrollbarBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useScrollAreaContext } from "./use-scroll-area-context.ts";
  import { ScrollAreaScrollbarProvider } from "./use-scroll-area-scrollbar-context.ts";

  let { ref = $bindable(null), ...props }: ScrollAreaScrollbarProps = $props()

  const [scrollbarProps, localProps] = $derived(createSplitProps<ScrollbarProps>()(props, ['orientation']))

  const scrollAreaApi = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollAreaApi().getScrollbarProps(scrollbarProps), localProps))

  ScrollAreaScrollbarProvider(() => scrollbarProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
