'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogDescriptionBaseProps extends PolymorphicProps {}
export interface DialogDescriptionProps extends HTMLProps<'div'>, DialogDescriptionBaseProps {}

export const DialogDescription = forwardRef<HTMLDivElement, DialogDescriptionProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps({ className: 'spark-dialog-description' }, dialog.getDescriptionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DialogDescription.displayName = 'DialogDescription'
