import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { HoverCardProps } from "./hover-card.types.ts";

export const props = createProps<HoverCardProps>()([
  "closeDelay",
  "defaultOpen",
  "defaultTriggerValue",
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onTriggerValueChange",
  "open",
  "openDelay",
  "positioning",
  "triggerValue",
])

export const splitProps = createSplitProps<Partial<HoverCardProps>>(props)
