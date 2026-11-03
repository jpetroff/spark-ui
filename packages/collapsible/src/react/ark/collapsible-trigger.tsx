'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useCollapsibleContext } from "./use-collapsible-context.ts";

export interface CollapsibleTriggerBaseProps extends PolymorphicProps {}
export interface CollapsibleTriggerProps extends HTMLProps<'button'>, CollapsibleTriggerBaseProps {}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>((props, ref) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(collapsible.getTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

CollapsibleTrigger.displayName = 'CollapsibleTrigger'
