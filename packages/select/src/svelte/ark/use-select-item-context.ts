import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { ItemState } from '../../common/zag/select/index.ts'

export interface UseSelectItemContext extends Accessor<ItemState> {}

export const [SelectItemProvider, useSelectItemContext] = createContext<UseSelectItemContext>({
  name: 'SelectItemContext',
})
