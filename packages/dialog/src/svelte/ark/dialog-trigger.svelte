<script module lang="ts">
  import type { Assign } from "../../../../shared/src/svelte/ark/types.ts";
import type { HTMLProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { PolymorphicProps } from "../../../../shared/src/svelte/ark/types.ts";
import type { RefAttribute } from "../../../../shared/src/svelte/ark/types.ts";
  import type { TriggerProps } from '../../common/zag/dialog/index.ts'

  export interface DialogTriggerBaseProps extends TriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface DialogTriggerProps extends Assign<HTMLProps<'button'>, DialogTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '../../../../shared/src/svelte/zag/index.ts'
  import { createSplitProps } from "../../../../shared/src/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "../../../../shared/src/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "../../../../presence/src/svelte/ark/use-presence-context.ts";
  import { useDialogContext } from "./use-dialog-context.ts";

  let { ref = $bindable(null), ...props }: DialogTriggerProps = $props()
  const [triggerProps, localProps] = $derived(createSplitProps<TriggerProps>()(props, ['value']))

  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = $derived.by(() => {
    const triggerPropsRaw = dialog().getTriggerProps(triggerProps)
    return mergeProps(
      {
        ...triggerPropsRaw,
        'aria-controls': presence().unmounted ? undefined : triggerPropsRaw['aria-controls'],
      },
      localProps,
    )
  })
</script>

<Ark as="button" bind:ref {...mergedProps} />
