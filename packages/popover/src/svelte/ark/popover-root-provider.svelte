<script module lang="ts">
  import type { UsePresenceProps } from "../../../../presence/src/svelte/ark/use-presence.svelte.ts";
  import type { UsePopoverReturn } from "./use-popover.svelte.ts";

  interface RootProviderProps {
    value: UsePopoverReturn
  }

  export interface PopoverRootProviderBaseProps extends RootProviderProps, UsePresenceProps {
    children?: Snippet
  }
  export interface PopoverRootProviderProps extends PopoverRootProviderBaseProps {}
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import { PresenceProvider } from "../../../../presence/src/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "../../../../presence/src/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "../../../../presence/src/svelte/ark/use-presence.svelte.ts";
  import { PopoverProvider } from "./use-popover-context.ts";

  const { value, ...props }: PopoverRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))

  PopoverProvider(() => value())
  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
