'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import type { UsePresenceProps } from "@spark/presence/react/ark/use-presence.ts";
import { PresenceProvider } from "@spark/presence/react/ark/use-presence-context.ts";
import { usePresence } from "@spark/presence/react/ark/use-presence.ts";
import { splitPresenceProps } from "@spark/presence/react/ark/split-presence-props.ts";
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
