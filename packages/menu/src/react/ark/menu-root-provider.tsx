'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { type ReactNode, useCallback } from 'react'
import { useEffectOnce } from "@spark/shared/react/ark/utils/use-effect-once.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { type UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import type { UseMenuReturn } from "./use-menu.ts";
import { MenuProvider } from "./use-menu-context.ts";
import { useMenuContext } from "./use-menu-context.ts";
import { MenuMachineProvider } from "./use-menu-machine-context.ts";
import { useMenuMachineContext } from "./use-menu-machine-context.ts";
import { MenuTriggerItemProvider } from "./use-menu-trigger-item-context.ts";

interface RootProviderProps {
  value: UseMenuReturn
}

export interface MenuRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface MenuRootProviderProps extends MenuRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const MenuRootProvider = (props: MenuRootProviderProps) => {
  const parentApi = useMenuContext()
  const parentMachine = useMenuMachineContext()
  const [presenceProps, { value: menu, children }] = splitPresenceProps(props)
  const { api, service } = menu
  const presence = usePresence(mergeProps({ present: api.open }, presenceProps))

  useEffectOnce(() => {
    if (!parentMachine) return
    if (!parentApi) return

    parentApi.setChild(service)
    api.setParent(parentMachine)
  })

  const triggerItemContext = useCallback(() => parentApi?.getTriggerItemProps(api), [api, parentApi])

  return (
    <MenuTriggerItemProvider value={triggerItemContext}>
      <MenuMachineProvider value={service}>
        <MenuProvider value={api}>
          <PresenceProvider value={presence}>{children}</PresenceProvider>
        </MenuProvider>
      </MenuMachineProvider>
    </MenuTriggerItemProvider>
  )
}
