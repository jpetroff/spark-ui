'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import type { Assign } from "../../../../shared/src/react/ark/types.ts";
import { createSplitProps } from "../../../../shared/src/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import { type UseCheckboxProps } from "./use-checkbox.ts";
import { useCheckbox } from "./use-checkbox.ts";
import { CheckboxProvider } from "./use-checkbox-context.ts";

export interface CheckboxRootBaseProps extends UseCheckboxProps, PolymorphicProps {}
export interface CheckboxRootProps extends Assign<HTMLProps<'label'>, CheckboxRootBaseProps> {}

const splitRootProps = createSplitProps<UseCheckboxProps>()

export const CheckboxRoot = forwardRef<HTMLLabelElement, CheckboxRootProps>((props, ref) => {
  const [useCheckboxProps, localProps] = splitRootProps(props, [
    'checked',
    'defaultChecked',
    'disabled',
    'form',
    'id',
    'ids',
    'invalid',
    'name',
    'onCheckedChange',
    'readOnly',
    'required',
    'value',
  ])
  const checkbox = useCheckbox(useCheckboxProps)
  const mergedProps = mergeProps(checkbox.getRootProps(), localProps)

  return (
    <CheckboxProvider value={checkbox}>
      <ark.label {...mergedProps} ref={ref} />
    </CheckboxProvider>
  )
})

CheckboxRoot.displayName = 'CheckboxRoot'
