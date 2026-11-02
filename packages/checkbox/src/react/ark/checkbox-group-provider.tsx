'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'

import { forwardRef } from 'react'
import type { Assign } from "@spark/shared/react/ark/types.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { checkboxAnatomy } from "./checkbox.anatomy.ts";
import { CheckboxGroupContextProvider } from "./use-checkbox-group-context.tsx";
import { type UseCheckboxGroupContext } from "./use-checkbox-group-context.tsx";

interface ProviderProps {
  value: UseCheckboxGroupContext
}

export interface CheckboxGroupProviderBaseProps extends ProviderProps, PolymorphicProps {}
export interface CheckboxGroupProviderProps extends Assign<HTMLProps<'div'>, CheckboxGroupProviderBaseProps> {}

const splitProviderProps = createSplitProps<ProviderProps>()

export const CheckboxGroupProvider = forwardRef<HTMLDivElement, CheckboxGroupProviderProps>((props, ref) => {
  const [localProps, restProps] = splitProviderProps(props, ['value'])

  return (
    <CheckboxGroupContextProvider value={localProps.value}>
      <ark.div ref={ref} role="group" {...mergeProps({ className: 'spark-checkbox-group' }, restProps)} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
})

CheckboxGroupProvider.displayName = 'CheckboxGroupProvider'
