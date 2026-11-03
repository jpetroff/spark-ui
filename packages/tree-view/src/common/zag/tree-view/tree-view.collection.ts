import { type FilePathTreeNode } from "@spark/shared/common/zag/collection/types.ts";
import { TreeCollection } from "@spark/shared/common/zag/collection/tree-collection.ts";
import { type TreeCollectionOptions } from "@spark/shared/common/zag/collection/types.ts";
import { filePathToTree } from "@spark/shared/common/zag/collection/tree-collection.ts";

export const collection = <T>(options: TreeCollectionOptions<T>): TreeCollection<T> => {
  return new TreeCollection(options)
}

collection.empty = (): TreeCollection => {
  return new TreeCollection({ rootNode: { children: [] } })
}

export function filePathCollection(paths: string[]): TreeCollection<FilePathTreeNode> {
  return filePathToTree(paths)
}
