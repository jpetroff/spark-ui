<script lang="ts" module>
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseFloatingPanelReturn } from "./use-floating-panel.svelte.ts";

  interface RootProviderProps {
    value: UseFloatingPanelReturn
  }

  export interface FloatingPanelRootProviderBaseProps extends RootProviderProps, UsePresenceProps {
    children?: Snippet
  }
  export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import type { Snippet } from 'svelte'
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { FloatingPanelProvider } from "./use-floating-panel-context.ts";

  let { value, children, ...presenceProps }: FloatingPanelRootProviderProps = $props()
  const presence = usePresence(() => mergeProps({ present: value().open }, presenceProps))

  FloatingPanelProvider(() => value())
  PresenceProvider(presence)
</script>

{@render children?.()}
