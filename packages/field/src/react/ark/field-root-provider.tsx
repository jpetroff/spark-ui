'use client'

import { mergeProps } from '../../../../shared/src/react/zag/index.ts'
import { forwardRef } from 'react'
import { createSplitProps } from "../../../../shared/src/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { type PolymorphicProps } from "../../../../shared/src/react/ark/components/factory.ts";
import { ark } from "../../../../shared/src/react/ark/components/factory.ts";
import type { UseFieldReturn } from "./use-field.ts";
import { FieldProvider } from "./use-field-context.ts";

interface RootProviderProps {
  value: UseFieldReturn
}

export interface FieldRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface FieldRootProviderProps extends HTMLProps<'div'>, FieldRootProviderBaseProps {}

const splitRootProviderProps = createSplitProps<RootProviderProps>()

export const FieldRootProvider = forwardRef<HTMLDivElement, FieldRootProviderProps>((props, ref) => {
  const [{ value: field }, localProps] = splitRootProviderProps(props, ['value'])
  const mergedProps = mergeProps<HTMLProps<'div'>>(field.getRootProps(), localProps)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} ref={ref} />
    </FieldProvider>
  )
})

FieldRootProvider.displayName = 'FieldRootProvider'
