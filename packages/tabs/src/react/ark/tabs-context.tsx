'use client'

import type { ReactNode } from 'react'
import { type UseTabsContext } from "./use-tabs-context.ts";
import { useTabsContext } from "./use-tabs-context.ts";

export interface TabsContextProps {
  children: (context: UseTabsContext) => ReactNode
}

export const TabsContext = (props: TabsContextProps) => props.children(useTabsContext())
