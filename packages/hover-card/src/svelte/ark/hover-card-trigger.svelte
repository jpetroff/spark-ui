<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { TriggerProps } from '../../common/zag/hover-card/index.ts'

  export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface HoverCardTriggerProps extends Assign<HTMLProps<'button'>, HoverCardTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useHoverCardContext } from "./use-hover-card-context.ts";

  let { ref = $bindable(null), ...props }: HoverCardTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const hoverCard = useHoverCardContext()
  const mergedProps = $derived(mergeProps(hoverCard().getTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
