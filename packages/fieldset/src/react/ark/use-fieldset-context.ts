'use client'

import { createContext } from "../../../../shared/src/react/ark/utils/create-context.ts";
import type { UseFieldsetReturn } from "./use-fieldset.ts";

export interface UseFieldsetContext extends UseFieldsetReturn {}

export const [FieldsetProvider, useFieldsetContext] = createContext<UseFieldsetContext>({
  name: 'FieldsetContext',
  hookName: 'useFieldsetContext',
  providerName: '<FieldsetProvider />',
  strict: false,
})
