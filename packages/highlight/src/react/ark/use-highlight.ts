'use client'

import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@spark/shared/common/zag/highlight-word/index.ts'
import { useMemo } from 'react'

export interface UseHighlightProps extends HighlightWordProps {}

export const useHighlight = (props: UseHighlightProps): HighlightChunk[] => {
  return useMemo(() => highlightWord(props), [props])
}

export type { HighlightChunk }
