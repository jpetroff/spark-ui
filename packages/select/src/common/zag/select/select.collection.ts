import { ListCollection } from "@spark/shared/common/zag/collection/list-collection.ts";
import { type CollectionItem } from "@spark/shared/common/zag/collection/types.ts";
import { type CollectionOptions } from "@spark/shared/common/zag/collection/types.ts";

export const collection = <T extends CollectionItem>(options: CollectionOptions<T>): ListCollection<T> => {
  return new ListCollection<T>(options)
}

collection.empty = (): ListCollection<CollectionItem> => {
  return new ListCollection<CollectionItem>({ items: [] })
}
