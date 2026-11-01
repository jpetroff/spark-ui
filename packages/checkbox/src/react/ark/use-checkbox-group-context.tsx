'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseCheckboxGroupReturn } from "./use-checkbox-group.ts";

export interface UseCheckboxGroupContext extends UseCheckboxGroupReturn {}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] = createContext<
  UseCheckboxGroupContext | undefined
>({
  name: 'CheckboxGroupContext',
  hookName: 'useCheckboxGroupContext',
  providerName: '<CheckboxGroupProvider />',
  strict: false,
})
