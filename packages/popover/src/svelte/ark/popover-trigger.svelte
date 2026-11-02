<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { TriggerProps } from '../../common/zag/popover/index.ts'

  export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface PopoverTriggerProps extends Assign<HTMLProps<'button'>, PopoverTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { usePopoverContext } from "./use-popover-context.ts";

  let { ref = $bindable(null), ...props }: PopoverTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = $derived.by(() => {
    const triggerPropsRaw = popover().getTriggerProps(triggerProps)
    return mergeProps({ class: 'spark-popover-trigger' },
      {
        ...triggerPropsRaw,
        'aria-controls': presence().unmounted ? undefined : triggerPropsRaw['aria-controls'],
      },
      localProps,
    )
  })
</script>

<Ark as="button" bind:ref {...mergedProps} />
