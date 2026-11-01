import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { PopoverProps } from "./popover.types.ts";

export const props = createProps<PopoverProps>()([
  "autoFocus",
  "closeOnEscape",
  "closeOnInteractOutside",
  "defaultOpen",
  "defaultTriggerValue",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "finalFocusEl",
  "initialFocusEl",
  "modal",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onTriggerValueChange",
  "onRequestDismiss",
  "open",
  "persistentElements",
  "portalled",
  "restoreFocus",
  "positioning",
  "translations",
  "triggerValue",
])

export const splitProps = createSplitProps<Partial<PopoverProps>>(props)
