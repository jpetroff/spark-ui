'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseMenuReturn } from "./use-menu.ts";

export type UseMenuContext = UseMenuReturn['api']

export const [MenuProvider, useMenuContext] = createContext<UseMenuContext>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})
