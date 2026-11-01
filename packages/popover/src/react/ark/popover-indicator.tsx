'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverIndicatorBaseProps extends PolymorphicProps {}
export interface PopoverIndicatorProps extends HTMLProps<'div'>, PopoverIndicatorBaseProps {}

export const PopoverIndicator = forwardRef<HTMLDivElement, PopoverIndicatorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverIndicator.displayName = 'PopoverIndicator'
