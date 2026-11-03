import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { ItemGroupLabelProps } from "./select.types.ts";
import type { ItemGroupProps } from "./select.types.ts";
import type { ItemProps } from "./select.types.ts";
import type { SelectProps } from "./select.types.ts";

export const props = createProps<SelectProps>()([
  "autoComplete",
  "closeOnSelect",
  "collection",
  "composite",
  "defaultHighlightedValue",
  "defaultOpen",
  "defaultValue",
  "deselectable",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "invalid",
  "loopFocus",
  "multiple",
  "name",
  "onFocusOutside",
  "onHighlightChange",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onSelect",
  "onValueChange",
  "open",
  "positioning",
  "readOnly",
  "required",
  "scrollToIndexFn",
  "translations",
  "value",
])
export const splitProps = createSplitProps<Partial<SelectProps>>(props)

export const itemProps = createProps<ItemProps>()(["item", "persistFocus"])
export const splitItemProps = createSplitProps<ItemProps>(itemProps)

export const itemGroupProps = createProps<ItemGroupProps>()(["id"])
export const splitItemGroupProps = createSplitProps<ItemGroupProps>(itemGroupProps)

export const itemGroupLabelProps = createProps<ItemGroupLabelProps>()(["htmlFor"])
export const splitItemGroupLabelProps = createSplitProps<ItemGroupLabelProps>(itemGroupLabelProps)
