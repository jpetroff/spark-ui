import type { Accessor } from "../../types.ts";
import { createContext } from "../../utils/create-context.ts";
import type { Locale } from '../../../../common/zag/i18n-utils/index.ts'

export interface UseLocaleContext extends Accessor<Locale> {}

export const [LocaleContextProvider, useLocaleContext] = createContext<UseLocaleContext>({
  name: 'LocaleContext',
  strict: false,
  defaultValue: () => ({
    dir: 'ltr',
    locale: 'en-US',
  }),
})
