<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface HoverCardArrowTipBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface HoverCardArrowTipProps extends Assign<HTMLProps<'div'>, HoverCardArrowTipBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useHoverCardContext } from "./use-hover-card-context.ts";

  let { ref = $bindable(null), ...props }: HoverCardArrowTipProps = $props()

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getArrowTipProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
