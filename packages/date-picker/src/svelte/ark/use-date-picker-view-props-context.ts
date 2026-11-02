import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type { ViewProps } from '../../common/zag/date-picker/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseDatePickerViewPropsContext extends Accessor<ViewProps> {}

export const [DatePickerViewPropsProvider, useDatePickerViewPropsContext] =
  createContext<UseDatePickerViewPropsContext>({
    name: 'DatePickerViewPropsContext',
    hookName: 'useDatePickerViewPropsContext',
    providerName: '<DatePickerViewPropsProvider />',
  })
