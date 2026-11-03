import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseRadioGroupReturn } from "./use-radio-group.svelte.ts";

export interface UseRadioGroupContext extends UseRadioGroupReturn {}

export const [RadioGroupProvider, useRadioGroupContext] = createContext<UseRadioGroupContext>({
  name: 'RadioGroupContext',
  hookName: 'useRadioGroupContext',
  providerName: '<RadioGroupProvider />',
})
