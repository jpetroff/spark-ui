'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverCloseTriggerBaseProps extends PolymorphicProps {}
export interface PopoverCloseTriggerProps extends HTMLProps<'button'>, PopoverCloseTriggerBaseProps {}

export const PopoverCloseTrigger = forwardRef<HTMLButtonElement, PopoverCloseTriggerProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverCloseTrigger.displayName = 'PopoverCloseTrigger'
