'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import type { UseCheckboxReturn } from "./use-checkbox.ts";
import { CheckboxProvider } from "./use-checkbox-context.ts";

interface RootProviderProps {
  value: UseCheckboxReturn
}

export interface CheckboxRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface CheckboxRootProviderProps extends HTMLProps<'label'>, CheckboxRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const CheckboxRootProvider = forwardRef<HTMLLabelElement, CheckboxRootProviderProps>((props, ref) => {
  const [{ value: checkbox }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps(checkbox.getRootProps(), localProps)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} ref={ref} />
    </CheckboxProvider>
  )
})

CheckboxRootProvider.displayName = 'CheckboxRootProvider'
