import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { NodeProps } from "./tree-view.types.ts";
import type { TreeViewProps } from "./tree-view.types.ts";

export const props = createProps<TreeViewProps>()([
  "ids",
  "collection",
  "dir",
  "expandedValue",
  "expandOnClick",
  "defaultFocusedValue",
  "focusedValue",
  "getRootNode",
  "id",
  "onExpandedChange",
  "onFocusChange",
  "onSelectionChange",
  "checkedValue",
  "selectedValue",
  "selectionMode",
  "typeahead",
  "defaultExpandedValue",
  "defaultSelectedValue",
  "defaultCheckedValue",
  "onCheckedChange",
  "onLoadChildrenComplete",
  "onLoadChildrenError",
  "loadChildren",
  "canRename",
  "onRenameStart",
  "onBeforeRename",
  "onRenameComplete",
  "scrollToIndexFn",
  "translations",
])

export const splitProps = createSplitProps<Partial<TreeViewProps>>(props)

export const itemProps = createProps<NodeProps>()(["node", "indexPath"])

export const splitItemProps = createSplitProps<NodeProps>(itemProps)
