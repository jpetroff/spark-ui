'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseMenuReturn } from "./use-menu.ts";

export type UseMenuMachineContext = UseMenuReturn['service'] | undefined

export const [MenuMachineProvider, useMenuMachineContext] = createContext<UseMenuMachineContext>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
