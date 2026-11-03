'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectListBaseProps extends PolymorphicProps {}
export interface SelectListProps extends HTMLProps<'div'>, SelectListBaseProps {}

export const SelectList = forwardRef<HTMLDivElement, SelectListProps>((props, ref) => {
  const select = useSelectContext()
  const mergedProps = mergeProps(select.getListProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

SelectList.displayName = 'SelectList'
