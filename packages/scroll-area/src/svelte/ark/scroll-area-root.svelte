<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseScrollAreaProps } from "./use-scroll-area.svelte.ts";

  export interface ScrollAreaRootBaseProps extends UseScrollAreaProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaRootProps extends Assign<HTMLProps<'div'>, ScrollAreaRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { ScrollAreaProvider } from "./use-scroll-area-context.ts";
  import { useScrollArea } from "./use-scroll-area.svelte.ts";

  let { ref = $bindable(null), ...props }: ScrollAreaRootProps = $props()
  const providedId = $props.id()

  const [scrollAreaProps, localProps] = $derived(createSplitProps<UseScrollAreaProps>()(props, ['id', 'ids']))

  const resolvedProps = $derived<UseScrollAreaProps>({
    ...scrollAreaProps,
    id: scrollAreaProps.id ?? providedId,
  })

  const scrollArea = useScrollArea(() => resolvedProps)
  const mergedProps = $derived(mergeProps(scrollArea().getRootProps(), localProps))

  ScrollAreaProvider(scrollArea)
</script>

<Ark as="div" bind:ref {...mergedProps} />
