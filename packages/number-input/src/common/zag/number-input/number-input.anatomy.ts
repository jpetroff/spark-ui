import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("numberInput").parts(
  "root",
  "label",
  "input",
  "control",
  "valueText",
  "incrementTrigger",
  "decrementTrigger",
  "scrubber",
)

export const parts = anatomy.build()
