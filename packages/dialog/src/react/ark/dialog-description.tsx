'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogDescriptionBaseProps extends PolymorphicProps {}
export interface DialogDescriptionProps extends HTMLProps<'div'>, DialogDescriptionBaseProps {}

export const DialogDescription = forwardRef<HTMLDivElement, DialogDescriptionProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getDescriptionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

DialogDescription.displayName = 'DialogDescription'
