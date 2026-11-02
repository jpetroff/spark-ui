import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import type * as datePicker from '../../common/zag/date-picker/index.ts'
import type { PropTypes } from '@spark/shared/svelte/zag/index.ts'
import { createContext } from "@spark/shared/svelte/ark/utils/create-context.ts";

export interface UseDatePickerContext extends Accessor<datePicker.Api<PropTypes>> {}

export const [DatePickerProvider, useDatePickerContext] = createContext<UseDatePickerContext>({
  name: 'DatePickerContext',
  hookName: 'useDatePickerContext',
  providerName: '<DatePickerProvider />',
})
