import './styles.css'

import type { ComponentProps, Snippet } from 'svelte'
import { Field as FieldParts } from './svelte/ark/index.ts'
import FieldComponent from './svelte/field-composition.svelte'
export * from './svelte/ark/index.ts'

/**
 * Compound usage (all primitive props and snippets remain available):
 * <Field.Root required>
 *   <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
 *   <Field.Input type="email" name="email" />
 *   <Field.HelperText>Use your work email.</Field.HelperText>
 *   <Field.ErrorText>Enter a valid address.</Field.ErrorText>
 * </Field.Root>
 *
 * Editable assembled Field component. Customize its markup and props for your application.
 * Field.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, target the stable .spark-* selectors or install the Spark theme.
 */
export interface FieldProps {
  /** Associated input label. */
  label: Snippet
  /** Optional hint connected to the input. */
  helperText?: Snippet
  /** Optional error, shown when parts.root.invalid is true. */
  errorText?: Snippet
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
 * <Field>
 *   {#snippet label()}Email{/snippet}
 * </Field>
 * `parts` forwards controlled values and change callbacks. For bind:ref or
 * bind:value/checked/open on individual primitives, use the compound API directly.
 */
export const Field = Object.assign(FieldComponent, FieldParts)
