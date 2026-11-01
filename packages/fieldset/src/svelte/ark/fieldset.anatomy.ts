import { createAnatomy } from '../../../../shared/src/common/zag/anatomy/index.ts'

export const fieldsetAnatomy = createAnatomy('fieldset').parts('root', 'errorText', 'helperText', 'legend')
export const parts = fieldsetAnatomy.build()
