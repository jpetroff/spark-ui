import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { InputProps } from "./date-picker.types.ts";
import type { PresetTriggerProps } from "./date-picker.types.ts";
import type { TableCellProps } from "./date-picker.types.ts";
import type { TableProps } from "./date-picker.types.ts";
import type { DatePickerProps } from "./date-picker.types.ts";
import type { ViewProps } from "./date-picker.types.ts";

export const props = createProps<DatePickerProps>()([
  "closeOnSelect",
  "createCalendar",
  "dir",
  "disabled",
  "fixedWeeks",
  "focusedValue",
  "format",
  "parse",
  "placeholder",
  "getRootNode",
  "id",
  "ids",
  "inline",
  "invalid",
  "isDateUnavailable",
  "locale",
  "max",
  "maxSelectedDates",
  "min",
  "name",
  "numOfMonths",
  "onFocusChange",
  "onOpenChange",
  "onValueChange",
  "onViewChange",
  "onVisibleRangeChange",
  "open",
  "openOnClick",
  "defaultOpen",
  "positioning",
  "readOnly",
  "required",
  "selectionMode",
  "showWeekNumbers",
  "startOfWeek",
  "timeZone",
  "translations",
  "value",
  "defaultView",
  "defaultValue",
  "view",
  "defaultFocusedValue",
  "outsideDaySelectable",
  "minView",
  "maxView",
])
export const splitProps = createSplitProps<Partial<DatePickerProps>>(props)

export const inputProps = createProps<InputProps>()(["index", "fixOnBlur"])
export const splitInputProps = createSplitProps<InputProps>(inputProps)

export const presetTriggerProps = createProps<PresetTriggerProps>()(["value"])
export const splitPresetTriggerProps = createSplitProps<PresetTriggerProps>(presetTriggerProps)

export const tableProps = createProps<TableProps>()(["columns", "id", "view"])
export const splitTableProps = createSplitProps<TableProps>(tableProps)

export const tableCellProps = createProps<TableCellProps>()(["disabled", "value", "columns"])
export const splitTableCellProps = createSplitProps<TableCellProps>(tableCellProps)

export const viewProps = createProps<ViewProps>()(["view"])
export const splitViewProps = createSplitProps<ViewProps>(viewProps)
