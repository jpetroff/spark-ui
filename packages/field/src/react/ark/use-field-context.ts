'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { UseFieldReturn } from "./use-field.ts";

export interface UseFieldContext extends UseFieldReturn {}

export const [FieldProvider, useFieldContext] = createContext<UseFieldContext>({
  name: 'FieldContext',
  hookName: 'useFieldContext',
  providerName: '<FieldProvider />',
  strict: false,
})
