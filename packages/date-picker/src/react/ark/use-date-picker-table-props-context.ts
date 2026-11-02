'use client'

import type { TableProps } from '../../common/zag/date-picker/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface UseDatePickerTablePropsContext extends TableProps {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<UseDatePickerTablePropsContext>({
    name: 'DatePickerTableContext',
    hookName: 'useDatePickerTableContext',
    providerName: '<DatePickerTableProvider />',
  })
