'use client'

import type { ReactNode } from 'react'
import { type UseRadioGroupContext } from "./use-radio-group-context.ts";
import { useRadioGroupContext } from "./use-radio-group-context.ts";

export interface RadioGroupContextProps {
  children: (context: UseRadioGroupContext) => ReactNode
}

export const RadioGroupContext = (props: RadioGroupContextProps) => props.children(useRadioGroupContext())
