import { createAnatomy } from '@spark/shared/common/zag/anatomy/index.ts'

export const fieldAnatomy = createAnatomy('field').parts(
  'root',
  'errorText',
  'helperText',
  'input',
  'label',
  'select',
  'textarea',
  'requiredIndicator',
)
export const parts = fieldAnatomy.build()
