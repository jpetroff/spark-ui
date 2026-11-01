'use client'

import { type Locale, isRTL } from '../../../../common/zag/i18n-utils/index.ts'
import type { PropsWithChildren } from 'react'
import { LocaleContextProvider } from "./use-locale-context.ts";

export interface LocaleProviderProps extends PropsWithChildren {
  /**
   * The locale to use for the application.
   * @default 'en-US'
   */
  locale: string
}

export const LocaleProvider = (props: LocaleProviderProps) => {
  const { children, locale } = props

  const context: Locale = {
    locale,
    dir: isRTL(locale) ? 'rtl' : 'ltr',
  }

  return <LocaleContextProvider value={context}>{children}</LocaleContextProvider>
}
