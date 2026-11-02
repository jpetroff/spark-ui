import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { TableProps } from '../../common/zag/date-picker/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseDatePickerTablePropsContext extends Accessor<TableProps> {}

export const [DatePickerTablePropsProvider, useDatePickerTablePropsContext] =
  createContext<UseDatePickerTablePropsContext>({
    name: 'DatePickerTablePropsContext',
    hookName: 'useDatePickerTablePropsContext',
    providerName: '<DatePickerTablePropsProvider />',
  })
