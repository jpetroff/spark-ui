'use client'

import type { ReactNode } from 'react'
import { type UseScrollAreaContext } from "./use-scroll-area-context.ts";
import { useScrollAreaContext } from "./use-scroll-area-context.ts";

export interface ScrollAreaContextProps {
  children: (context: UseScrollAreaContext) => ReactNode
}

export const ScrollAreaContext = (props: ScrollAreaContextProps) => props.children(useScrollAreaContext())
