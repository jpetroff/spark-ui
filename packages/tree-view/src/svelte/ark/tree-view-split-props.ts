import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
import type { TreeNode } from "@spark/collection/svelte/ark/tree-collection.ts";
import type { UseTreeViewProps } from "./use-tree-view.svelte.ts";

const splitFn = createSplitProps<UseTreeViewProps<TreeNode>>()

export function splitTreeViewProps<T extends UseTreeViewProps<TreeNode>>(props: T) {
  return splitFn(props, [
    'canRename',
    'checkedValue',
    'collection',
    'defaultCheckedValue',
    'defaultExpandedValue',
    'defaultFocusedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'loadChildren',
    'onBeforeRename',
    'onCheckedChange',
    'onExpandedChange',
    'onFocusChange',
    'onLoadChildrenComplete',
    'onLoadChildrenError',
    'onRenameComplete',
    'onRenameStart',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'translations',
    'typeahead',
    'scrollToIndexFn',
  ])
}
