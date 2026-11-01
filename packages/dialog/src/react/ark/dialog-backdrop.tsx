'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "../../../../shared/src/react/ark/utils/compose-refs.ts";
import { useRenderStrategyPropsContext } from "../../../../shared/src/react/ark/utils/render-strategy.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { PresenceGate } from "../../../../presence/src/react/ark/presence-gate.tsx";
import { usePresence } from "../../../../presence/src/react/ark/use-presence.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogBackdropBaseProps extends PolymorphicProps {}
export interface DialogBackdropProps extends HTMLProps<'div'>, DialogBackdropBaseProps {}

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>((props, ref) => {
  const dialog = useDialogContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: dialog.open })
  const mergedProps = mergeProps(dialog.getBackdropProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

DialogBackdrop.displayName = 'DialogBackdrop'
