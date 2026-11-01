'use client'

import { createContext } from "../../../../shared/src/react/ark/utils/create-context.ts";
import type { UseCheckboxReturn } from "./use-checkbox.ts";

export interface UseCheckboxContext extends UseCheckboxReturn {}

export const [CheckboxProvider, useCheckboxContext] = createContext<UseCheckboxContext>({
  name: 'CheckboxContext',
  hookName: 'useCheckboxContext',
  providerName: '<CheckboxProvider />',
})
