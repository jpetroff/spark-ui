'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverTitleBaseProps extends PolymorphicProps {}
export interface PopoverTitleProps extends HTMLProps<'h2'>, PopoverTitleBaseProps {}

export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getTitleProps(), props)

  return <ark.h2 {...mergedProps} ref={ref} />
})

PopoverTitle.displayName = 'PopoverTitle'
