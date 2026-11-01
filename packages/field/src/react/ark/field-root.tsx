'use client'

import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { createSplitProps } from "@spark/shared/react/ark/utils/create-split-props.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { type UseFieldProps } from "./use-field.ts";
import { useField } from "./use-field.ts";
import { FieldProvider } from "./use-field-context.ts";

export interface FieldRootBaseProps extends UseFieldProps, PolymorphicProps {}
export interface FieldRootProps extends HTMLProps<'div'>, FieldRootBaseProps {}

const splitRootProps = createSplitProps<UseFieldProps>()

export const FieldRoot = forwardRef<HTMLDivElement, FieldRootProps>((props, ref) => {
  const [useFieldProps, localProps] = splitRootProps(props, [
    'id',
    'ids',
    'disabled',
    'invalid',
    'readOnly',
    'required',
    'target',
  ])

  const field = useField(useFieldProps)
  const mergedProps = mergeProps<HTMLProps<'div'>>(field.getRootProps(), localProps)
  const composedRefs = useComposedRefs(ref, field.refs.rootRef)

  return (
    <FieldProvider value={field}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </FieldProvider>
  )
})

FieldRoot.displayName = 'FieldRoot'
