'use client'

import { mergeProps } from '@spark/shared/common/zag/core/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldRequiredIndicatorBaseProps extends PolymorphicProps {
  fallback?: React.ReactNode | undefined
}
export interface FieldRequiredIndicatorProps extends HTMLProps<'span'>, FieldRequiredIndicatorBaseProps {}

export const FieldRequiredIndicator = forwardRef<HTMLSpanElement, FieldRequiredIndicatorProps>(
  ({ fallback, ...props }, ref) => {
    const field = useFieldContext()

    if (!field.required) {
      return fallback
    }

    const mergedProps = mergeProps(field.getRequiredIndicatorProps(), props)
    return (
      <ark.span {...mergedProps} ref={ref}>
        {props.children ?? '*'}
      </ark.span>
    )
  },
)

FieldRequiredIndicator.displayName = 'FieldRequiredIndicator'
