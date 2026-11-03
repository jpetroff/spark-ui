import { createAnatomy } from "@spark/shared/common/zag/anatomy/create-anatomy.ts";

export const anatomy = createAnatomy("scroll-area").parts("root", "viewport", "content", "scrollbar", "thumb", "corner")

export const parts = anatomy.build()
