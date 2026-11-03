import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("radio-group").parts(
  "root",
  "label",
  "item",
  "itemText",
  "itemControl",
  "indicator",
)

export const parts = anatomy.build()
