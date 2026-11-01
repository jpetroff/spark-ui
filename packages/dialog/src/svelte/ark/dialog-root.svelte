<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseDialogProps } from "./use-dialog.svelte.ts";

  export interface DialogRootBaseProps extends UseDialogProps, UsePresenceProps {}
  export interface DialogRootProps extends DialogRootBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
  import { RenderStrategyPropsProvider } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/svelte/ark/utils/render-strategy.ts";
  import { DialogProvider } from "./use-dialog-context.ts";
  import { useDialog } from "./use-dialog.svelte.ts";

  let { open = $bindable(), triggerValue = $bindable<string | null>(), children, ...props }: DialogRootProps = $props()

  const providedId = $props.id()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const machineProps = $derived.by<UseDialogProps>(() => {
    return {
      ...localProps,
      id: localProps.id ?? providedId,
      open,
      triggerValue,
      onOpenChange(details) {
        localProps.onOpenChange?.(details)
        if (open !== undefined) open = details.open
      },
      onTriggerValueChange(details) {
        localProps.onTriggerValueChange?.(details)
        if (triggerValue !== undefined) triggerValue = details.value
      },
    }
  })

  const dialog = useDialog(() => machineProps)

  const presenceMachineProps = $derived.by<UsePresenceProps>(() => ({
    ...presenceProps,
    present: dialog().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DialogProvider(dialog)
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
