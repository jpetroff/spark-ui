<script module lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import type { UseMenuProps } from "./use-menu.svelte.ts";

  export interface MenuRootBaseProps extends UseMenuProps, UsePresenceProps {
    children?: Snippet
  }
  export interface MenuRootProps extends MenuRootBaseProps {}
</script>

<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { MenuProvider } from "./use-menu-context.ts";
import { useMenuContext } from "./use-menu-context.ts";
  import { MenuMachineProvider } from "./use-menu-machine-context.ts";
import { useMenuMachineContext } from "./use-menu-machine-context.ts";
  import { MenuTriggerItemProvider } from "./use-menu-trigger-item-context.ts";
  import { useMenu } from "./use-menu.svelte.ts";

  let {
    open = $bindable<boolean>(),
    highlightedValue = $bindable<string | null>(),
    triggerValue = $bindable<string | null>(),
    ...props
  }: MenuRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, menuProps] = $derived(splitPresenceProps(props))
  const [useMenuProps, localProps] = $derived(
    createSplitProps<UseMenuProps>()(menuProps, [
      'anchorPoint',
      'aria-label',
      'closeOnSelect',
      'composite',
      'defaultHighlightedValue',
      'defaultOpen',
      'defaultTriggerValue',
      'highlightedValue',
      'id',
      'ids',
      'loopFocus',
      'navigate',
      'onEscapeKeyDown',
      'onFocusOutside',
      'onHighlightChange',
      'onInteractOutside',
      'onOpenChange',
      'onPointerDownOutside',
      'onRequestDismiss',
      'onSelect',
      'onTriggerValueChange',
      'open',
      'positioning',
      'triggerValue',
      'typeahead',
    ]),
  )

  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()

  const resolvedProps = $derived<UseMenuProps>({
    ...useMenuProps,
    id: useMenuProps.id ?? providedId,
    open,
    highlightedValue,
    triggerValue,
    onOpenChange(details) {
      useMenuProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    onHighlightChange(details) {
      useMenuProps.onHighlightChange?.(details)
      if (highlightedValue !== undefined) highlightedValue = details.highlightedValue
    },
    onTriggerValueChange(details) {
      useMenuProps.onTriggerValueChange?.(details)
      if (triggerValue !== undefined) triggerValue = details.value
    },
  })

  const menu = useMenu(() => resolvedProps)
  const api = $derived(menu().api)
  const service = $derived(menu().service)

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

{@render localProps.children?.()}
