import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { CollapsibleProps } from "./collapsible.types.ts";

export const props = createProps<CollapsibleProps>()([
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "collapsedHeight",
  "collapsedWidth",
  "onExitComplete",
  "onOpenChange",
  "defaultOpen",
  "open",
])
export const splitProps = createSplitProps<Partial<CollapsibleProps>>(props)
