import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { ItemProps } from "./radio-group.types.ts";
import type { RadioGroupProps } from "./radio-group.types.ts";

export const props = createProps<RadioGroupProps>()([
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "name",
  "onValueChange",
  "orientation",
  "readOnly",
  "required",
  "value",
  "defaultValue",
])
export const splitProps = createSplitProps<Partial<RadioGroupProps>>(props)

export const itemProps = createProps<ItemProps>()(["value", "disabled", "invalid"])
export const splitItemProps = createSplitProps<ItemProps>(itemProps)
