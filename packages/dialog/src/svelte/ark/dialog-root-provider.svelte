<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UsePresenceProps } from "../../../../presence/src/svelte/ark/use-presence.svelte.ts";
  import type { UseDialogReturn } from "./use-dialog.svelte.ts";

  interface RootProviderProps {
    value: UseDialogReturn
  }

  export interface DialogRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
  export interface DialogRootProviderProps extends DialogRootProviderBaseProps {
    children?: Snippet
  }
</script>

<script lang="ts">
  import { RenderStrategyPropsProvider } from "../../../../shared/src/svelte/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "../../../../shared/src/svelte/ark/utils/render-strategy.ts";
  import { PresenceProvider } from "../../../../presence/src/svelte/ark/use-presence-context.ts";
import { usePresence } from "../../../../presence/src/svelte/ark/use-presence.svelte.ts";
  import { splitPresenceProps } from "../../../../presence/src/svelte/ark/split-presence-props.svelte.ts";
  import { DialogProvider } from "./use-dialog-context.ts";

  let { value, children, ...props }: DialogRootProviderProps = $props()

  const [presenceProps] = $derived(splitPresenceProps(props))
  const [renderStrategyProps] = $derived(splitRenderStrategyProps(presenceProps))

  const presenceMachineProps = $derived.by(() => ({
    ...presenceProps,
    present: value().open,
  }))

  const presence = usePresence(() => presenceMachineProps)

  DialogProvider(() => value())
  RenderStrategyPropsProvider(() => renderStrategyProps)
  PresenceProvider(presence)
</script>

{@render children?.()}
