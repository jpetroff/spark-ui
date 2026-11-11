'use client'

import './styles.css'

import type { ComponentProps, ReactNode } from 'react'
import { Button as ButtonPrimitive } from './react/button.tsx'
export type { ButtonProps as ButtonRootProps } from './react/button.tsx'

/**
 * Editable assembled Button component. Customize its markup and props for your application.
 * Button.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, target the stable .spark-* selectors or install the Spark theme.
 */
export interface ButtonProps {
  /** Button label or icon; supply aria-label for an icon-only button. */
  children?: ReactNode
  /** Props for the nested primitives. Add or remove entries with the markup. */
  parts?: {
    /** Native button events, ref, disabled, type, variant and size. */
    button?: Omit<ComponentProps<typeof ButtonPrimitive>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/button
 * @example
 * <Button parts={{ button: { variant: "outline", disabled: false } }}>Save</Button>
 */
export const Button = Object.assign(
  function Button({ children, parts = {} }: ButtonProps) {
    return <ButtonPrimitive {...parts.button}>{children}</ButtonPrimitive>
  },
  { Root: ButtonPrimitive },
)
