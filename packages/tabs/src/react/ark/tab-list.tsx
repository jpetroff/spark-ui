'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useTabsContext } from "./use-tabs-context.ts";

export interface TabListBaseProps extends PolymorphicProps {}
export interface TabListProps extends HTMLProps<'div'>, TabListBaseProps {}

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'
