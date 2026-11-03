<script lang="ts" module>
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FloatingPanelTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface FloatingPanelTriggerProps extends Assign<HTMLProps<'button'>, FloatingPanelTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

  let { ref = $bindable(null), ...props }: FloatingPanelTriggerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const triggerProps = $derived(floatingPanel().getTriggerProps())
  const mergedProps = $derived(
    mergeProps(
      {
        ...triggerProps,
        'aria-controls': presence().unmounted ? undefined : triggerProps['aria-controls'],
      },
      props,
    ),
  )
</script>

<Ark as="button" bind:ref {...mergedProps} />
