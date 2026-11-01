'use client'

import { forwardRef } from 'react'
import type { Assign } from "../../../../shared/src/react/ark/types.ts";
import { createSplitProps } from "../../../../shared/src/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
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
      <ark.div ref={ref} role="group" {...restProps} {...checkboxAnatomy.build().group.attrs} />
    </CheckboxGroupContextProvider>
  )
})

CheckboxGroupProvider.displayName = 'CheckboxGroupProvider'
