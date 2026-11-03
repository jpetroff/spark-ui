<script module lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseMenuReturn } from "./use-menu.svelte.ts";

  interface RootProviderProps {
    value: UseMenuReturn
  }

  export interface MenuRootProviderBaseProps extends RootProviderProps, UsePresenceProps {
    children?: Snippet
  }
  export interface MenuRootProviderProps extends MenuRootProviderBaseProps {}
</script>

<script lang="ts">
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { MenuProvider } from "./use-menu-context.ts";
import { useMenuContext } from "./use-menu-context.ts";
  import { MenuMachineProvider } from "./use-menu-machine-context.ts";
import { useMenuMachineContext } from "./use-menu-machine-context.ts";
  import { MenuTriggerItemProvider } from "./use-menu-trigger-item-context.ts";

  const { value, ...props }: MenuRootProviderProps = $props()

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()

  const [presenceProps, restProps] = $derived(splitPresenceProps(props))

  const api = $derived(value().api)
  const service = $derived(value().service)

  const presence = usePresence(() => ({
    present: api.open,
    ...presenceProps,
  }))

  // Connect parent-child relationship for nested menus
  onMount(() => {
    const _parentService = parentMachine?.()
    const _parentApi = parentApi?.()

    if (!_parentService || !_parentApi) return

    _parentApi.setChild(service)
    api.setParent(_parentService)
  })

  const triggerItemContext = $derived(parentApi?.().getTriggerItemProps(api))

  MenuTriggerItemProvider(() => triggerItemContext)
  MenuMachineProvider(() => service)
  MenuProvider(() => api)
  PresenceProvider(presence)
</script>

{@render restProps.children?.()}
