import { createAnatomy } from "../../../../../shared/src/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("checkbox").parts("root", "label", "control", "indicator")
export const parts = anatomy.build()
