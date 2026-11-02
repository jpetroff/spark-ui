'use client'

import { autoresizeTextarea } from '@spark/shared/common/zag/auto-resize/index.ts'
import { mergeProps } from '@spark/shared/react/zag/index.ts'
import { forwardRef, useEffect, useRef } from 'react'
import { useComposedRefs } from "@spark/shared/react/ark/utils/compose-refs.ts";
import { type HTMLProps } from "@spark/shared/react/ark/components/factory.ts";
import { type PolymorphicProps } from "@spark/shared/react/ark/components/factory.ts";
import { ark } from "@spark/shared/react/ark/components/factory.ts";
import { useFieldContext } from "./use-field-context.ts";

export interface FieldTextareaBaseProps extends PolymorphicProps {
  /**
   * Whether the textarea should autoresize
   * @default false
   */
  autoresize?: boolean | undefined
}
export interface FieldTextareaProps extends HTMLProps<'textarea'>, FieldTextareaBaseProps {}

export const FieldTextarea = forwardRef<HTMLTextAreaElement, FieldTextareaProps>((props, ref) => {
  const { autoresize, ...textareaProps } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const field = useFieldContext()
  const mergedProps = mergeProps<HTMLProps<'textarea'>>({ className: 'spark-field-textarea' },
    field?.getTextareaProps(),
    { style: { resize: autoresize ? 'none' : undefined } },
    textareaProps,
  )
  const composedRefs = useComposedRefs(ref, textareaRef)

  useEffect(() => {
    if (!autoresize) return
    return autoresizeTextarea(textareaRef.current)
  }, [autoresize])

  return <ark.textarea {...mergedProps} ref={composedRefs} />
})

FieldTextarea.displayName = 'FieldTextarea'
