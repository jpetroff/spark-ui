'use client'

import type { JsonNodePreviewOptions } from '@spark/shared/common/zag/json-tree-utils/index.ts'
import { createContext } from "@spark/shared/react/ark/utils/create-context.ts";

export interface JsonTreeViewOptions extends Partial<JsonNodePreviewOptions> {
  /**
   * Whether to show quotes on the keys.
   */
  quotesOnKeys?: boolean
}

export const [JsonTreeViewPropsProvider, useJsonTreeViewPropsContext] = createContext<JsonTreeViewOptions>({
  name: 'JsonTreeViewPropsContext',
  hookName: 'useJsonTreeViewPropsContext',
  providerName: '<JsonTreeViewPropsProvider />',
})
