'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useCollapsibleContext } from "./use-collapsible-context.ts";

export interface CollapsibleIndicatorBaseProps extends PolymorphicProps {}
export interface CollapsibleIndicatorProps extends HTMLProps<'div'>, CollapsibleIndicatorBaseProps {}

export const CollapsibleIndicator = forwardRef<HTMLDivElement, CollapsibleIndicatorProps>((props, ref) => {
  const collapsible = useCollapsibleContext()
  const mergedProps = mergeProps(collapsible.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

CollapsibleIndicator.displayName = 'CollapsibleIndicator'
