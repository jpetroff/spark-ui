import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("hoverCard").parts("arrow", "arrowTip", "trigger", "positioner", "content")
export const parts = anatomy.build()
