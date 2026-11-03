'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import type { HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import type { PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseToggleProps } from "./use-toggle.ts";
import { useToggle } from "./use-toggle.ts";
import { ToggleProvider } from "./use-toggle-context.ts";

export interface ToggleRootBaseProps extends UseToggleProps, PolymorphicProps {}

export interface ToggleRootProps extends HTMLProps<'button'>, ToggleRootBaseProps {}

const splitRootProps = createSplitProps<UseToggleProps>()

export const ToggleRoot = forwardRef<HTMLButtonElement, ToggleRootProps>((props, ref) => {
  const [useToggleProps, localProps] = splitRootProps(props, [
    'pressed',
    'defaultPressed',
    'disabled',
    'onPressedChange',
  ])

  const toggle = useToggle(useToggleProps)
  const mergedProps = mergeProps(toggle.getRootProps(), localProps)

  return (
    <ToggleProvider value={toggle}>
      <ark.button {...mergedProps} ref={ref} />
    </ToggleProvider>
  )
})

ToggleRoot.displayName = 'ToggleRoot'
