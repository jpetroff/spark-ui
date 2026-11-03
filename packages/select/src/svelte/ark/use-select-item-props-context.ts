import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { CollectionItem } from "@spark/collection/svelte/ark/list-collection.ts";

export interface UseSelectItemPropsContext<T extends CollectionItem = CollectionItem> extends Accessor<{
  item: T
  disabled?: boolean
}> {}

export const [SelectItemPropsProvider, useSelectItemPropsContext] = createContext<UseSelectItemPropsContext>({
  name: 'SelectItemPropsContext',
})
