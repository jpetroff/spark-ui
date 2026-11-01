'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverArrowTipBaseProps extends PolymorphicProps {}
export interface PopoverArrowTipProps extends HTMLProps<'div'>, PopoverArrowTipBaseProps {}

export const PopoverArrowTip = forwardRef<HTMLDivElement, PopoverArrowTipProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverArrowTip.displayName = 'PopoverArrowTip'
