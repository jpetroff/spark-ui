'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ReactNode } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import type { UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
import { type UseFloatingPanelProps } from "./use-floating-panel.ts";
import { useFloatingPanel } from "./use-floating-panel.ts";
import { FloatingPanelProvider } from "./use-floating-panel-context.ts";

export interface FloatingPanelRootBaseProps extends UseFloatingPanelProps, UsePresenceProps {}
export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {
  children?: ReactNode | undefined
}

const splitRootProps = createSplitProps<UseFloatingPanelProps>()

export const FloatingPanelRoot = (props: FloatingPanelRootProps) => {
  const [presenceProps, otherProps] = splitPresenceProps(props)
  const [useFloatingPanelProps, localProps] = splitRootProps(otherProps, [
    'allowOverflow',
    'closeOnEscape',
    'defaultOpen',
    'defaultPosition',
    'defaultSize',
    'dir',
    'disabled',
    'draggable',
    'getAnchorPosition',
    'getBoundaryEl',
    'gridSize',
    'finalFocusEl',
    'id',
    'ids',
    'initialFocusEl',
    'lockAspectRatio',
    'maxSize',
    'minSize',
    'onOpenChange',
    'onPositionChange',
    'onPositionChangeEnd',
    'onSizeChange',
    'onSizeChangeEnd',
    'onStageChange',
    'open',
    'persistRect',
    'position',
    'resizable',
    'restoreFocus',
    'size',
    'strategy',
    'translations',
  ])

  const floatingPanel = useFloatingPanel(useFloatingPanelProps)

  const usePresenceProps = mergeProps({ present: floatingPanel.open }, presenceProps)
  const presence = usePresence(usePresenceProps)

  return (
    <FloatingPanelProvider value={floatingPanel}>
      <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
    </FloatingPanelProvider>
  )
}
