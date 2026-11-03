'use client'

import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";
import type { CollectionItem } from "@spark/collection/react/ark/list-collection.ts";
import type { UseSelectReturn } from "./use-select.ts";

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<CollectionItem>>({
  name: 'SelectContext',
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})
