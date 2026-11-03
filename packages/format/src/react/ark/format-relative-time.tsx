'use client'

import { formatRelativeTime } from '@spark/shared/common/zag/i18n-utils/index.ts'
import { useMemo } from 'react'
import { useLocaleContext } from "@spark/shared/react/ark/providers/locale/use-locale-context.ts";

export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
  /**
   * The date to format
   */
  value: Date
}

export const FormatRelativeTime = (props: FormatRelativeTimeProps) => {
  const { locale } = useLocaleContext()
  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatRelativeTime(value, locale, intlOptions)
  }, [props, locale])
  return <>{text}</>
}

FormatRelativeTime.displayName = 'FormatRelativeTime'
