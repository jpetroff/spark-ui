'use client'

import type { ReactNode } from 'react'
import { type UseHoverCardContext } from "./use-hover-card-context.ts";
import { useHoverCardContext } from "./use-hover-card-context.ts";

export interface HoverCardContextProps {
  children: (context: UseHoverCardContext) => ReactNode
}

export const HoverCardContext = (props: HoverCardContextProps) => props.children(useHoverCardContext())
