'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "../../../../shared/src/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { PresenceGate } from "../../../../presence/src/react/ark/presence-gate.tsx";
import { usePresenceContext } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogContentBaseProps extends PolymorphicProps {}
export interface DialogContentProps extends HTMLProps<'div'>, DialogContentBaseProps {}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const dialog = useDialogContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(dialog.getContentProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

DialogContent.displayName = 'DialogContent'
