import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("switch").parts("root", "label", "control", "thumb")
export const parts = anatomy.build()
