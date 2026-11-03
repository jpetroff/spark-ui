import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { ItemState } from '../../common/zag/radio-group/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseRadioGroupItemContext extends Accessor<ItemState> {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] = createContext<UseRadioGroupItemContext>({
  name: 'RadioGroupItemContext',
  hookName: 'useRadioGroupItemContext',
  providerName: '<RadioGroupItemProvider />',
})
