import { createProps } from "../../../../../shared/src/common/zag/types/index.ts";
import { createSplitProps } from "../../../../../shared/src/common/zag/utils/index.ts";
import type { CheckboxProps } from "./checkbox.types.ts";

export const props = createProps<CheckboxProps>()([
  "defaultChecked",
  "checked",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "name",
  "onCheckedChange",
  "readOnly",
  "required",
  "value",
])
export const splitProps = createSplitProps<Partial<CheckboxProps>>(props)
