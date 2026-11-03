'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseSwitchReturn } from "./use-switch.ts";
import { SwitchProvider } from "./use-switch-context.ts";

interface RootProviderProps {
  value: UseSwitchReturn
}

export interface SwitchRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface SwitchRootProviderProps extends HTMLProps<'label'>, SwitchRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const SwitchRootProvider = forwardRef<HTMLLabelElement, SwitchRootProviderProps>((props, ref) => {
  const [{ value: api }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(api.getRootProps(), localProps)

  return (
    <SwitchProvider value={api}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
})

SwitchRootProvider.displayName = 'SwitchRootProvider'
