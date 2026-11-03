'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "@spark/field/react/ark/use-field-context.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectHiddenSelectBaseProps extends PolymorphicProps {}
export interface SelectHiddenSelectProps extends HTMLProps<'select'>, SelectHiddenSelectBaseProps {}

export const SelectHiddenSelect = forwardRef<HTMLSelectElement, SelectHiddenSelectProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getHiddenSelectProps(), props)
  const isValueEmpty = select.value.length === 0
  const field = useFieldContext()

  return (
    <ark.select aria-describedby={field?.ariaDescribedby} {...mergedProps} ref={ref}>
      {isValueEmpty && <option value="" />}
      {select.collection.items.map((item, index) => (
        <option
          key={index}
          value={select.collection.getItemValue(item) ?? ''}
          disabled={select.collection.getItemDisabled(item)}
        >
          {select.collection.stringifyItem(item)}
        </option>
      ))}
    </ark.select>
  )
})
SelectHiddenSelect.displayName = 'SelectHiddenSelect'
