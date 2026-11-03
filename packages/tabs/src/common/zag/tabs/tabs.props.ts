import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { ContentProps } from "./tabs.types.ts";
import type { TriggerProps } from "./tabs.types.ts";
import type { TabsProps } from "./tabs.types.ts";

export const props = createProps<TabsProps>()([
  "activationMode",
  "composite",
  "deselectable",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "loopFocus",
  "navigate",
  "onFocusChange",
  "onValueChange",
  "orientation",
  "translations",
  "value",
  "defaultValue",
])

export const splitProps = createSplitProps<Partial<TabsProps>>(props)

export const triggerProps = createProps<TriggerProps>()(["disabled", "value"])
export const splitTriggerProps = createSplitProps<TriggerProps>(triggerProps)

export const contentProps = createProps<ContentProps>()(["value"])
export const splitContentProps = createSplitProps<ContentProps>(contentProps)
