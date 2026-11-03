'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import type { HTMLArkProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useToggleContext } from "./use-toggle-context.ts";

export interface ToggleIndicatorBaseProps {
  /**
   * The fallback content to render when the toggle is not pressed.
   */
  fallback?: React.ReactNode | undefined
}

export interface ToggleIndicatorProps extends HTMLArkProps<'span'>, ToggleIndicatorBaseProps {}

export const ToggleIndicator = forwardRef<HTMLSpanElement, ToggleIndicatorProps>((props, ref) => {
  const { children, fallback, ...restProps } = props
  const toggle = useToggleContext()
  const mergedProps = mergeProps(toggle.getIndicatorProps(), restProps)
  return (
    <ark.span {...mergedProps} ref={ref}>
      {toggle.pressed ? children : fallback}
    </ark.span>
  )
})

ToggleIndicator.displayName = 'ToggleIndicator'
