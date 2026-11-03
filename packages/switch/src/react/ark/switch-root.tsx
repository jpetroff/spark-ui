'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseSwitchProps } from "./use-switch.ts";
import { useSwitch } from "./use-switch.ts";
import { SwitchProvider } from "./use-switch-context.ts";

export interface SwitchRootBaseProps extends UseSwitchProps, PolymorphicProps {}
export interface SwitchRootProps extends HTMLProps<'label'>, SwitchRootBaseProps {}

const splitRootProps = createSplitProps<UseSwitchProps>()

export const SwitchRoot = forwardRef<HTMLLabelElement, SwitchRootProps>((props, ref) => {
  const [useSwitchProps, localProps] = splitRootProps(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'label',
    'name',
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])

  const switchContext = useSwitch(useSwitchProps)
  const mergedProps = mergeProps(switchContext.getRootProps(), localProps)

  return (
    <SwitchProvider value={switchContext}>
      <ark.label {...mergedProps} ref={ref} />
    </SwitchProvider>
  )
})

SwitchRoot.displayName = 'SwitchRoot'
