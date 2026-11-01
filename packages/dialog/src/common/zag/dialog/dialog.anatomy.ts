import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("dialog").parts(
  "trigger",
  "backdrop",
  "positioner",
  "content",
  "title",
  "description",
  "closeTrigger",
)

export const parts = anatomy.build()
