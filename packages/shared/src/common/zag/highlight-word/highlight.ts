import { highlightFirst } from "./highlight-first.ts";
import { highlightMultiple } from "./highlight-multiple.ts";
import type { HighlightChunk } from "./types.ts";
import type { HighlightWordProps } from "./types.ts";

export const highlightWord = (props: HighlightWordProps): HighlightChunk[] => {
  if (props.matchAll == null) {
    props.matchAll = Array.isArray(props.query)
  }

  if (!props.matchAll && Array.isArray(props.query)) {
    throw new Error("matchAll must be true when using multiple queries")
  }

  return props.matchAll ? highlightMultiple(props) : highlightFirst(props)
}
