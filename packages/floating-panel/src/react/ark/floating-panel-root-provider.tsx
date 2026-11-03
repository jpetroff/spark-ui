'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ReactNode } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import type { UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import type { UseFloatingPanelReturn } from "./use-floating-panel.ts";
import { FloatingPanelProvider } from "./use-floating-panel-context.ts";

interface RootProviderProps {
  value: UseFloatingPanelReturn
}

export interface FloatingPanelRootProviderBaseProps extends RootProviderProps, Omit<UsePresenceProps, 'present'> {}
export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {
  children?: ReactNode | undefined
}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const FloatingPanelRootProvider = (props: FloatingPanelRootProviderProps) => {
  const [presenceProps, baseProps] = splitPresenceProps(props)

  const [{ value: floatingPanel }, localProps] = splitRootProviderProps(baseProps, ['value'])
  const presence = usePresence(mergeProps({ present: floatingPanel.open }, presenceProps))

  return (
    <FloatingPanelProvider value={floatingPanel}>
      <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
    </FloatingPanelProvider>
  )
}
