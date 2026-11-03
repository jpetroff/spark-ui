'use client'

import type { ItemProps } from '../../common/zag/radio-group/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";
import { RadioGroupItemProvider } from "./use-radio-group-item-context.ts";
import { RadioGroupItemPropsProvider } from "./use-radio-group-item-props-context.ts";

export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps {}
export interface RadioGroupItemProps extends HTMLProps<'label'>, RadioGroupItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const RadioGroupItem = forwardRef<HTMLLabelElement, RadioGroupItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['value', 'disabled', 'invalid'])
  const radioGroup = useRadioGroupContext()
  const mergedProps = mergeProps(radioGroup.getItemProps(itemProps), localProps)
  const itemState = radioGroup.getItemState(itemProps)

  return (
    <RadioGroupItemProvider value={itemState}>
      <RadioGroupItemPropsProvider value={itemProps}>
        <ark.label {...mergedProps} ref={ref} />
      </RadioGroupItemPropsProvider>
    </RadioGroupItemProvider>
  )
})

RadioGroupItem.displayName = 'RadioGroupItem'
