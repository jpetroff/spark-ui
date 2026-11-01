import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseFieldsetReturn } from "./use-fieldset.svelte.ts";

export interface UseFieldsetContext extends UseFieldsetReturn {}

export const [FieldsetProvider, useFieldsetContext] = createContext<UseFieldsetContext>({
  name: 'FieldsetContext',
  strict: false,
})
