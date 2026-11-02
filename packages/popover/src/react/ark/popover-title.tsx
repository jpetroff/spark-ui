'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverTitleBaseProps extends PolymorphicProps {}
export interface PopoverTitleProps extends HTMLProps<'h2'>, PopoverTitleBaseProps {}

export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps({ className: 'spark-popover-title' }, popover.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
