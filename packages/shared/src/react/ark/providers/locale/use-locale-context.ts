'use client'

import type { Locale } from '../../../../common/zag/i18n-utils/index.ts'
import { createContext } from "../../utils/create-context.ts";

export interface UseLocaleContext extends Locale {}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  name: 'LocaleContext',
  hookName: 'useLocaleContext',
  providerName: '<LocaleProvider />',
  strict: false,
  defaultValue: { dir: 'ltr', locale: 'en-US' },
})
