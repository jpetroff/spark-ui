'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useTabsContext } from "./use-tabs-context.ts";

export interface TabIndicatorBaseProps extends PolymorphicProps {}
export interface TabIndicatorProps extends HTMLProps<'div'>, TabIndicatorBaseProps {}

export const TabIndicator = forwardRef<HTMLDivElement, TabIndicatorProps>((props, ref) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getIndicatorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabIndicator.displayName = 'TabIndicator'
