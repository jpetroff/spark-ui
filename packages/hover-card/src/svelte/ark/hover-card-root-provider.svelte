<script module lang="ts">
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseHoverCardReturn } from "./use-hover-card.svelte.ts";

  interface RootProviderProps {
    value: UseHoverCardReturn
  }

  export interface HoverCardRootProviderBaseProps extends RootProviderProps, UsePresenceProps {
    children?: Snippet
  }
  export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {}
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { HoverCardProvider } from "./use-hover-card-context.ts";

  const { value, ...props }: HoverCardRootProviderProps = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))
  const presence = usePresence(() => ({ present: value().open, ...presenceProps }))

  HoverCardProvider(() => value())
  PresenceProvider(presence)
</script>

{@render localProps.children?.()}
