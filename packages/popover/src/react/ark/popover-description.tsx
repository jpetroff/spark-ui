'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverDescriptionBaseProps extends PolymorphicProps {}
export interface PopoverDescriptionProps extends HTMLProps<'div'>, PopoverDescriptionBaseProps {}

export const PopoverDescription = forwardRef<HTMLDivElement, PopoverDescriptionProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getDescriptionProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverDescription.displayName = 'PopoverDescription'
