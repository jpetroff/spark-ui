'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverArrowBaseProps extends PolymorphicProps {}
export interface PopoverArrowProps extends HTMLProps<'div'>, PopoverArrowBaseProps {}

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps({ className: 'spark-popover-arrow' }, popover.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrow.displayName = 'PopoverArrow'
