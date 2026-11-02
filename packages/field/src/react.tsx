'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { Field as FieldParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/**
 * Editable assembled Field component. Customize its markup and props for your application.
 * Field.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, uncomment recipe.css and edit its stable .spark-* selectors.
 */
export interface FieldProps {
  /** Associated input label. */
  label: ReactNode
  /** Optional hint connected to the input. */
  helperText?: ReactNode
  /** Optional error, shown when parts.root.invalid is true. */
  errorText?: ReactNode
  /** Props for the nested primitives. Add or remove entries with the markup. */
  parts?: {
    /** required, invalid, disabled, readOnly and layout classes. */
    root?: Omit<ComponentProps<typeof FieldParts.Root>, 'children'>
    /** Associated label classes and events. */
    label?: Omit<ComponentProps<typeof FieldParts.Label>, 'children'>
    /** Required marker; only shown when required. */
    requiredIndicator?: Omit<ComponentProps<typeof FieldParts.RequiredIndicator>, 'children'>
    /** Input type, name, value/defaultValue, placeholder, ref and events. */
    input?: Omit<ComponentProps<typeof FieldParts.Input>, 'children'>
    /** Hint classes and DOM props. */
    helperText?: Omit<ComponentProps<typeof FieldParts.HelperText>, 'children'>
    /** Error classes and DOM props. */
    errorText?: Omit<ComponentProps<typeof FieldParts.ErrorText>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/field
 * This version renders an input; replace Input with Textarea/Select and update parts.input when needed.
 * @example
 * <Field label="Email" helperText="Use your work email." parts={{ root: { required: true }, input: { type: "email", name: "email" } }} />
 */
export const Field = Object.assign(function Field({
  label,
  helperText,
  errorText,
  parts = {},
}: FieldProps) {
  return (
    <FieldParts.Root {...parts.root}>
      <FieldParts.Label {...parts.label}>
        {label}
        <FieldParts.RequiredIndicator {...parts.requiredIndicator} />
      </FieldParts.Label>
      <FieldParts.Input {...parts.input} />
      {helperText != null && (
        <FieldParts.HelperText {...parts.helperText}>{helperText}</FieldParts.HelperText>
      )}
      {errorText != null && (
        <FieldParts.ErrorText {...parts.errorText}>{errorText}</FieldParts.ErrorText>
      )}
    </FieldParts.Root>
  )
}, FieldParts)
