import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { ItemGroupLabelProps } from "./menu.types.ts";
import type { ItemGroupProps } from "./menu.types.ts";
import type { ItemProps } from "./menu.types.ts";
import type { OptionItemProps } from "./menu.types.ts";
import type { MenuProps } from "./menu.types.ts";

export const props = createProps<MenuProps>()([
  "anchorPoint",
  "aria-label",
  "closeOnSelect",
  "composite",
  "defaultHighlightedValue",
  "defaultOpen",
  "defaultTriggerValue",
  "dir",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "loopFocus",
  "navigate",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onHighlightChange",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onRequestDismiss",
  "onSelect",
  "onTriggerValueChange",
  "open",
  "positioning",
  "triggerValue",
  "typeahead",
])

export const splitProps = createSplitProps<Partial<MenuProps>>(props)

export const itemProps = createProps<ItemProps>()(["closeOnSelect", "disabled", "value", "valueText"])
export const splitItemProps = createSplitProps<ItemProps>(itemProps)

export const itemGroupLabelProps = createProps<ItemGroupLabelProps>()(["htmlFor"])
export const splitItemGroupLabelProps = createSplitProps<ItemGroupLabelProps>(itemGroupLabelProps)

export const itemGroupProps = createProps<ItemGroupProps>()(["id"])
export const splitItemGroupProps = createSplitProps<ItemGroupProps>(itemGroupProps)

export const optionItemProps = createProps<OptionItemProps>()([
  "checked",
  "closeOnSelect",
  "disabled",
  "onCheckedChange",
  "type",
  "value",
  "valueText",
])

export const splitOptionItemProps = createSplitProps<OptionItemProps>(optionItemProps)
