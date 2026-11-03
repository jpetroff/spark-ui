import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import { runIfFn } from "@spark/shared/svelte/ark/utils/run-if-fn.ts";
import { type HighlightChunk, type HighlightWordProps, highlightWord } from '@spark/shared/common/zag/highlight-word/index.ts'
import type { MaybeFunction } from '@spark/shared/common/zag/utils/index.ts'

export interface UseHighlightProps extends HighlightWordProps {}
export interface UseHighlightReturn extends Accessor<HighlightChunk[]> {}

export const useHighlight = (props: MaybeFunction<UseHighlightProps>): UseHighlightReturn => {
  const chunks = $derived.by(() => {
    const resolvedProps = runIfFn(props)
    return highlightWord(resolvedProps)
  })
  return () => chunks
}

export type { HighlightChunk }
