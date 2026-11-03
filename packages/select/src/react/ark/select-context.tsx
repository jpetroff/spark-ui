'use client'

import type { ReactNode } from 'react'
import type { CollectionItem } from "@spark/collection/react/ark/list-collection.ts";
import { type UseSelectContext } from "./use-select-context.ts";
import { useSelectContext } from "./use-select-context.ts";

export interface SelectContextProps<T extends CollectionItem> {
  children: (context: UseSelectContext<T>) => ReactNode
}

export const SelectContext = <T extends CollectionItem>(props: SelectContextProps<T>) =>
  props.children(useSelectContext())
