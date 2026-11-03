'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type RenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { RenderStrategyPropsProvider } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { splitRenderStrategyProps } from "@spark/shared/react/ark/utils/render-strategy.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseTabsProps } from "./use-tabs.ts";
import { useTabs } from "./use-tabs.ts";
import { TabsProvider } from "./use-tabs-context.ts";

export interface TabsRootBaseProps extends UseTabsProps, RenderStrategyProps, PolymorphicProps {}
export interface TabsRootProps extends Assign<HTMLProps<'div'>, TabsRootBaseProps> {}

const splitRootProps = createSplitProps<UseTabsProps>()

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>((props, ref) => {
  const [renderStrategyProps, tabsProps] = splitRenderStrategyProps(props)
  const [useTabsProps, localProps] = splitRootProps(tabsProps, [
    'activationMode',
    'composite',
    'defaultValue',
    'deselectable',
    'id',
    'ids',
    'loopFocus',
    'navigate',
    'onFocusChange',
    'onValueChange',
    'orientation',
    'translations',
    'value',
  ])
  const tabs = useTabs(useTabsProps)
  const mergedProps = mergeProps(tabs.getRootProps(), localProps)

  return (
    <TabsProvider value={tabs}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} ref={ref} />
      </RenderStrategyPropsProvider>
    </TabsProvider>
  )
})

TabsRoot.displayName = 'TabsRoot'
