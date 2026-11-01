import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseCheckboxGroupReturn } from "./use-checkbox-group.svelte.ts";

export interface UseCheckboxGroupContext extends UseCheckboxGroupReturn {}

export const [CheckboxGroupContextProvider, useCheckboxGroupContext] = createContext<UseCheckboxGroupContext>({
  name: 'CheckboxGroupContext',
  strict: false,
})
