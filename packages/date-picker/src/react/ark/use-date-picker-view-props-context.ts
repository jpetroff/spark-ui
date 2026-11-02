'use client'

import type { ViewProps } from '../../common/zag/date-picker/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseDatePickerViewContext extends Required<ViewProps> {}

export const [DatePickerViewPropsProvider, useDatePickerViewPropsContext] = createContext<UseDatePickerViewContext>({
  name: 'DatePickerViewContext',
  hookName: 'useDatePickerViewContext',
  providerName: '<DatePickerViewProvider />',
  strict: false,
  defaultValue: { view: 'day' },
})
