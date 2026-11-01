'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverArrowTipBaseProps extends PolymorphicProps {}
export interface PopoverArrowTipProps extends HTMLProps<'div'>, PopoverArrowTipBaseProps {}

export const PopoverArrowTip = forwardRef<HTMLDivElement, PopoverArrowTipProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrowTip.displayName = 'PopoverArrowTip'
