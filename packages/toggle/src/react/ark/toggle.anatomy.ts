'use client'

import { createAnatomy } from '@spark/shared/common/zag/anatomy/index.ts'

export const toggleAnatomy = createAnatomy('toggle', ['root', 'indicator'])

export const parts = toggleAnatomy.build()
