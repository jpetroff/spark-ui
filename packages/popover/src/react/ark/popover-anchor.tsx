'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverAnchorBaseProps extends PolymorphicProps {}
export interface PopoverAnchorProps extends HTMLProps<'div'>, PopoverAnchorBaseProps {}

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getAnchorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverAnchor.displayName = 'PopoverAnchor'
