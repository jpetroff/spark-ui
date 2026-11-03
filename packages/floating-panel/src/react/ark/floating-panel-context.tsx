'use client'

import type { ReactNode } from 'react'
import { type UseFloatingPanelContext } from "./use-floating-panel-context.ts";
import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

export interface FloatingPanelContextProps {
  children: (context: UseFloatingPanelContext) => ReactNode
}

export const FloatingPanelContext = (props: FloatingPanelContextProps) => props.children(useFloatingPanelContext())
