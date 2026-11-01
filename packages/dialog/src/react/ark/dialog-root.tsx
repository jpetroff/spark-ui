'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import type { UsePresenceProps } from "../../../../presence/src/react/ark/use-presence.ts";
import { PresenceProvider } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePresence } from "../../../../presence/src/react/ark/use-presence.ts";
import { splitPresenceProps } from "../../../../presence/src/react/ark/split-presence-props.ts";
import { type UseDialogProps } from "./use-dialog.ts";
import { useDialog } from "./use-dialog.ts";
import { DialogProvider } from "./use-dialog-context.ts";

export interface DialogRootBaseProps extends UseDialogProps, UsePresenceProps {}
export interface DialogRootProps extends DialogRootBaseProps {
  children?: ReactNode | undefined
}

export const DialogRoot = (props: DialogRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const dialog = useDialog(localProps)
  const presence = usePresence(mergeProps({ present: dialog.open }, presenceProps))

  return (
    <DialogProvider value={dialog}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </DialogProvider>
  )
}
