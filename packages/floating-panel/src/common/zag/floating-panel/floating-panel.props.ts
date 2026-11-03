import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { FloatingPanelProps } from "./floating-panel.types.ts";
import type { ResizeTriggerAxis } from "./floating-panel.types.ts";
import type { ResizeTriggerProps } from "./floating-panel.types.ts";

export const props = createProps<FloatingPanelProps>()([
  "allowOverflow",
  "closeOnEscape",
  "defaultOpen",
  "defaultPosition",
  "defaultSize",
  "dir",
  "disabled",
  "draggable",
  "finalFocusEl",
  "getAnchorPosition",
  "getBoundaryEl",
  "getRootNode",
  "gridSize",
  "id",
  "initialFocusEl",
  "ids",
  "lockAspectRatio",
  "maxSize",
  "minSize",
  "onOpenChange",
  "onPositionChange",
  "onPositionChangeEnd",
  "onSizeChange",
  "onSizeChangeEnd",
  "onStageChange",
  "open",
  "persistRect",
  "position",
  "resizable",
  "restoreFocus",
  "size",
  "strategy",
  "translations",
])
export const splitProps = createSplitProps<Partial<FloatingPanelProps>>(props)

export const resizeTriggerProps = createProps<ResizeTriggerProps>()(["axis"])
export const splitResizeTriggerProps = createSplitProps<Partial<ResizeTriggerProps>>(resizeTriggerProps)

export const resizeTriggerAxes: ResizeTriggerAxis[] = ["n", "e", "s", "w", "ne", "nw", "se", "sw"]
