import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("toggle", ["root", "indicator"])

export const parts = anatomy.build()
