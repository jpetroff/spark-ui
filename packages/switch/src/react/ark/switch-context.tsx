'use client'

import type { ReactNode } from 'react'
import { type UseSwitchContext } from "./use-switch-context.ts";
import { useSwitchContext } from "./use-switch-context.ts";

export interface SwitchContextProps {
  children: (context: UseSwitchContext) => ReactNode
}

export const SwitchContext = (props: SwitchContextProps) => props.children(useSwitchContext())
