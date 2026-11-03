'use client'

import type { TreeCollection } from '@spark/shared/common/zag/collection/index.ts'
import type { JsonNode } from '@spark/shared/common/zag/json-tree-utils/index.ts'

export function getBranchValues(tree: TreeCollection<JsonNode>, depth: number) {
  let values: string[] = []
  tree.visit({
    onEnter: (node, indexPath) => {
      if (indexPath.length === 0) return
      if (tree.isBranchNode(node) && indexPath.length <= depth) {
        values.push(tree.getNodeValue(node))
      }
    },
  })
  return values
}
