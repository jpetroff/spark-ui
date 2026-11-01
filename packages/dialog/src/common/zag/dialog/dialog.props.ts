import { createProps } from "../../../../../shared/src/common/zag/types/index.ts";
import { createSplitProps } from "../../../../../shared/src/common/zag/utils/index.ts";
import type { DialogProps } from "./dialog.types.ts";

export const props = createProps<DialogProps>()([
  "triggerValue",
  "aria-label",
  "closeOnEscape",
  "closeOnInteractOutside",
  "defaultTriggerValue",
  "defaultOpen",
  "dir",
  "finalFocusEl",
  "getRootNode",
  "id",
  "ids",
  "initialFocusEl",
  "modal",
  "onTriggerValueChange",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onRequestDismiss",
  "open",
  "persistentElements",
  "preventScroll",
  "restoreFocus",
  "role",
  "trapFocus",
])

export const splitProps = createSplitProps<Partial<DialogProps>>(props)
