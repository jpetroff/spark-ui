import {
  type FilePathTreeNode,
  TreeCollection,
  type TreeCollectionOptions,
  type TreeNode,
  filePathToTree,
} from '@spark/shared/common/zag/collection/index.ts'

export type {
  TreeCollection,
  TreeNode,
  TreeCollectionOptions,
  FilePathTreeNode,
  FlatTreeNode,
} from '@spark/shared/common/zag/collection/index.ts'

export const createTreeCollection = <T extends TreeNode>(options: TreeCollectionOptions<T>): TreeCollection<T> =>
  new TreeCollection(options)

export const createFileTreeCollection = (paths: string[]): TreeCollection<FilePathTreeNode> => filePathToTree(paths)
