'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import type { PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import type { UsePresenceProps } from "../../../../presence/src/react/ark/use-presence.ts";
import { PresenceProvider } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePresence } from "../../../../presence/src/react/ark/use-presence.ts";
import { splitPresenceProps } from "../../../../presence/src/react/ark/split-presence-props.ts";
import type { UseDialogReturn } from "./use-dialog.ts";
import { DialogProvider } from "./use-dialog-context.ts";

interface RootProviderProps {
  value: UseDialogReturn
}

export interface DialogRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface DialogRootProviderProps extends DialogRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const DialogRootProvider = (props: DialogRootProviderProps) => {
  const [presenceProps, { value: dialog, children }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const presence = usePresence(mergeProps({ present: dialog.open }, presenceProps))

  return (
    <DialogProvider value={dialog}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </DialogProvider>
  )
}
