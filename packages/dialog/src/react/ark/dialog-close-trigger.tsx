'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogCloseTriggerBaseProps extends PolymorphicProps {}
export interface DialogCloseTriggerProps extends HTMLProps<'button'>, DialogCloseTriggerBaseProps {}

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DialogCloseTrigger.displayName = 'DialogCloseTrigger'
