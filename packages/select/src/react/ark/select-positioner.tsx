'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { usePresenceContext } from "@spark/presence/react/ark/use-presence-context.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectPositionerBaseProps extends PolymorphicProps {}
export interface SelectPositionerProps extends HTMLProps<'div'>, SelectPositionerBaseProps {}

export const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getPositionerProps(), props)
  const presence = usePresenceContext()

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={ref} />
})

SelectPositioner.displayName = 'SelectPositioner'
