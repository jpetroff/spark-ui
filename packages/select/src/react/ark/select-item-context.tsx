'use client'

import type { ReactNode } from 'react'
import { type UseSelectItemContext } from "./use-select-item-context.ts";
import { useSelectItemContext } from "./use-select-item-context.ts";

export interface SelectItemContextProps {
  children: (context: UseSelectItemContext) => ReactNode
}

export const SelectItemContext = (props: SelectItemContextProps) => props.children(useSelectItemContext())
