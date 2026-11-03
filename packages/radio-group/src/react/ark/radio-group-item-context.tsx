'use client'

import type { ReactNode } from 'react'
import { type UseRadioGroupItemContext } from "./use-radio-group-item-context.ts";
import { useRadioGroupItemContext } from "./use-radio-group-item-context.ts";

export interface RadioGroupItemContextProps {
  children: (context: UseRadioGroupItemContext) => ReactNode
}

export const RadioGroupItemContext = (props: RadioGroupItemContextProps) => props.children(useRadioGroupItemContext())
