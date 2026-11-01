'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "../../../../shared/src/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
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
