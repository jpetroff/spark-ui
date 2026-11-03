import { compact } from "@spark/shared/common/zag/utils/index.ts";
import type { ScrollToDetails } from "../scroll-area.types.ts";
import { smoothScroll } from "./smooth-scroll.ts";

export function scrollTo(node: HTMLElement | null | undefined, options: ScrollToDetails = {}): void {
  if (!node) return
  const { top, left, behavior = "smooth", easing, duration } = options
  if (behavior === "smooth") {
    smoothScroll(node, { top, left, easing, duration })
  } else {
    const scrollOptions = compact({ behavior, top, left })
    node.scrollTo(scrollOptions as ScrollToOptions)
  }
}
