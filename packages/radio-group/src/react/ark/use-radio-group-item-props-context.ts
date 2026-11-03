'use client'

import type { ItemProps } from '../../common/zag/radio-group/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] = createContext<ItemProps>({
  name: 'RadioGroupItemPropsContext',
  hookName: 'useRadioGroupItemPropsContext',
  providerName: '<RadioGroupItemPropsProvider />',
})
