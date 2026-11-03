'use client'

import type { ItemState } from '../../common/zag/radio-group/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseRadioGroupItemContext extends ItemState {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] = createContext<UseRadioGroupItemContext>({
  name: 'RadioGroupItemContext',
  hookName: 'useRadioGroupItemContext',
  providerName: '<RadioGroupItemProvider />',
})
