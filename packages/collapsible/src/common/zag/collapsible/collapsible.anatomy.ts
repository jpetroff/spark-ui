import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("collapsible").parts("root", "trigger", "content", "indicator")

export const parts = anatomy.build()
