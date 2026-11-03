import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { NumberInputProps } from "./number-input.types.ts";

export const props = createProps<NumberInputProps>()([
  "allowMouseWheel",
  "allowOverflow",
  "clampValueOnBlur",
  "dir",
  "disabled",
  "focusInputOnChange",
  "form",
  "formatOptions",
  "getRootNode",
  "id",
  "ids",
  "inputMode",
  "invalid",
  "largeStep",
  "locale",
  "max",
  "min",
  "name",
  "onFocusChange",
  "onValueChange",
  "onValueCommit",
  "onValueInvalid",
  "pattern",
  "required",
  "readOnly",
  "smallStep",
  "spinOnPress",
  "step",
  "translations",
  "value",
  "defaultValue",
])
export const splitProps = createSplitProps<Partial<NumberInputProps>>(props)
