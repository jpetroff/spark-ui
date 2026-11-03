import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("tabs").parts("root", "list", "trigger", "content", "indicator")
export const parts = anatomy.build()
