'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useToastContext } from "./use-toast-context.ts";

export interface ToastDescriptionBaseProps extends PolymorphicProps {}
export interface ToastDescriptionProps extends HTMLProps<'div'>, ToastDescriptionBaseProps {}

export const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>((props, ref) => {
  const toast = useToastContext()
  const mergedProps = mergeProps(toast.getDescriptionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

ToastDescription.displayName = 'ToastDescription'
