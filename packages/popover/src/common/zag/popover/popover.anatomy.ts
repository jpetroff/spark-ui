import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("popover").parts(
  "arrow",
  "arrowTip",
  "anchor",
  "trigger",
  "indicator",
  "positioner",
  "content",
  "title",
  "description",
  "closeTrigger",
)

export const parts = anatomy.build()
