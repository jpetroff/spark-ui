'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useSwitchContext } from "./use-switch-context.ts";

export interface SwitchThumbBaseProps extends PolymorphicProps {}
export interface SwitchThumbProps extends HTMLProps<'span'>, SwitchThumbBaseProps {}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const switchContext = useSwitchContext()
  const mergedProps = mergeProps(switchContext.getThumbProps(), props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchThumb.displayName = 'SwitchThumb'
