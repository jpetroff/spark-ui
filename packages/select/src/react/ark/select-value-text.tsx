'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no value is selected.
   */
  placeholder?: string | undefined
}
export interface SelectValueTextProps extends HTMLProps<'span'>, SelectValueTextBaseProps {}

export const SelectValueText = forwardRef<HTMLSpanElement, SelectValueTextProps>((props, ref) => {
  const { children, placeholder, ...localprops } = props
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getValueTextProps(), localprops)

  return (
    <ark.span {...mergedProps} ref={ref}>
      {children || select.valueAsString || placeholder}
    </ark.span>
  )
})

SelectValueText.displayName = 'SelectValueText'
