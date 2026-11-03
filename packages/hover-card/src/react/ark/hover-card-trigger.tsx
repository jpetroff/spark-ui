'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { TriggerProps } from '../../common/zag/hover-card/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useHoverCardContext } from "./use-hover-card-context.ts";

export interface HoverCardTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface HoverCardTriggerProps extends Assign<HTMLProps<'button'>, HoverCardTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const HoverCardTrigger = forwardRef<HTMLButtonElement, HoverCardTriggerProps>((props, ref) => {
  const [triggerProps, localProps] = splitTriggerProps(props, ['value'])
  const hoverCard = useHoverCardContext()
  const mergedProps = mergeProps(hoverCard.getTriggerProps(triggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

HoverCardTrigger.displayName = 'HoverCardTrigger'
