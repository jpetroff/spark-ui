import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { ScrollAreaProps } from "./scroll-area.types.ts";

export const props = createProps<ScrollAreaProps>()(["dir", "getRootNode", "ids", "id"])
export const splitProps = createSplitProps<Partial<ScrollAreaProps>>(props)
