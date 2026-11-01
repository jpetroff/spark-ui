'use client'

import type { ComponentProps } from 'react'
import { cn } from '@spark/utils/spark-utils.ts'
import {
  baseClass,
  variants,
  sizes,
  type ButtonVariant,
  type ButtonSize,
} from '../common/variants.ts'

export type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      data-slot="button"
      className={cn(baseClass, variants[variant], sizes[size], className)}
    />
  )
}
