import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { CollectionItem } from "@spark/collection/svelte/ark/list-collection.ts";
import type { UseSelectReturn } from "./use-select.svelte.ts";

export interface UseSelectContext<T extends CollectionItem = CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<UseSelectContext>({
  name: 'SelectContext',
})
