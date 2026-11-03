import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";
import type { ItemProps } from '../../common/zag/radio-group/index.ts'

export interface UseRadioGroupItemPropsContext extends Accessor<ItemProps> {}

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<UseRadioGroupItemPropsContext>({
    name: 'RadioGroupItemPropsContext',
    hookName: 'useRadioGroupItemPropsContext',
    providerName: '<RadioGroupItemPropsProvider />',
  })
