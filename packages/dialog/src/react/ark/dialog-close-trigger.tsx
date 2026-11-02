'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogCloseTriggerBaseProps extends PolymorphicProps {}
export interface DialogCloseTriggerProps extends HTMLProps<'button'>, DialogCloseTriggerBaseProps {}

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps({ className: 'spark-dialog-close-trigger' }, dialog.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DialogCloseTrigger.displayName = 'DialogCloseTrigger'
