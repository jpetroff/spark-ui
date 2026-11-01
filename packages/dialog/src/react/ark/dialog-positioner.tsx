'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogPositionerBaseProps extends PolymorphicProps {}
export interface DialogPositionerProps extends HTMLProps<'div'>, DialogPositionerBaseProps {}

export const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

DialogPositioner.displayName = 'DialogPositioner'
