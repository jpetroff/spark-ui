'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useToastContext } from "./use-toast-context.ts";

export interface ToastTitleBaseProps extends PolymorphicProps {}
export interface ToastTitleProps extends HTMLProps<'div'>, ToastTitleBaseProps {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getTitleProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastTitle.displayName = 'ToastTitle'
