import { createAnatomy } from '@spark/shared/common/zag/anatomy/index.ts'

export const swapAnatomy = createAnatomy('swap', ['root', 'indicator'])

export const parts = swapAnatomy.build()
