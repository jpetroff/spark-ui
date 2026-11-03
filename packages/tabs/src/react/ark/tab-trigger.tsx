'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import type { TriggerProps } from '../../common/zag/tabs/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useTabsContext } from "./use-tabs-context.ts";

export interface TabTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface TabTriggerProps extends Assign<HTMLProps<'button'>, TabTriggerBaseProps> {}

const splitTriggerProps = createSplitProps<TriggerProps>()

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>((props, ref) => {
  const [tabProps, localProps] = splitTriggerProps(props, ['disabled', 'value'])
  const tabs = useTabsContext()
  const mergedProps = mergeProps(tabs.getTriggerProps(tabProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

TabTrigger.displayName = 'TabTrigger'
