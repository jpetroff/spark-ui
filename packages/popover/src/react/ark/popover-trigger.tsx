'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import type { TriggerProps } from '../../common/zag/popover/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "../../../../shared/src/react/ark/types.ts";
import { createSplitProps } from "../../../../shared/src/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { usePresenceContext } from "../../../../presence/src/react/ark/use-presence-context.ts";
import { usePopoverContext } from "./use-popover-context.ts";

export interface PopoverTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface PopoverTriggerProps extends Assign<HTMLProps<'button'>, PopoverTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const triggerPropsRaw = popover.getTriggerProps(triggerProps)
  const mergedProps = mergeProps(
    {
      ...triggerPropsRaw,
      'aria-controls': presence.unmounted ? undefined : triggerPropsRaw['aria-controls'],
    },
    localProps,
  )

  return <ark.button {...mergedProps} ref={ref} />
})

PopoverTrigger.displayName = 'PopoverTrigger'
