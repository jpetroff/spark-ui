import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { UseFieldReturn } from "./use-field.svelte.ts";

export type UseFieldApi = ReturnType<UseFieldReturn>
export type UseFieldContext = Accessor<UseFieldApi | undefined>

export const [FieldProvider, useFieldContext] = createContext<UseFieldContext | undefined>({
  name: 'FieldContext',
  strict: false,
})
