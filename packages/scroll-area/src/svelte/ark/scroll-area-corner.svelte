<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface ScrollAreaCornerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ScrollAreaCornerProps extends Assign<HTMLProps<'div'>, ScrollAreaCornerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useScrollAreaContext } from "./use-scroll-area-context.ts";

  let { ref = $bindable(null), ...props }: ScrollAreaCornerProps = $props()

  const scrollArea = useScrollAreaContext()
  const mergedProps = $derived(mergeProps(scrollArea().getCornerProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
