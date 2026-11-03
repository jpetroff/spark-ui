import { type CollectionItem, type CollectionOptions, ListCollection } from '@spark/shared/common/zag/collection/index.ts'

export const createListCollection = <T extends CollectionItem>(options: CollectionOptions<T>): ListCollection<T> =>
  new ListCollection(options)

export type { ListCollection, CollectionOptions, CollectionItem }
