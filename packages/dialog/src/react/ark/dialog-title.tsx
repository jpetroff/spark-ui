'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useDialogContext } from "./use-dialog-context.ts";

export interface DialogTitleBaseProps extends PolymorphicProps {}
export interface DialogTitleProps extends HTMLProps<'h2'>, DialogTitleBaseProps {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

DialogTitle.displayName = 'DialogTitle'
