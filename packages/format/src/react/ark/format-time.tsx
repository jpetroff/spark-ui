'use client'

import { formatTime, type FormatTimeOptions } from '@spark/shared/common/zag/i18n-utils/index.ts'
import { useMemo } from 'react'
import { useLocaleContext } from "@spark/shared/react/ark/providers/locale/use-locale-context.ts";

export interface FormatTimeProps extends FormatTimeOptions {
  /**
   * The time to format
   */
  value: string | Date
}

export const FormatTime = (props: FormatTimeProps) => {
  const { locale } = useLocaleContext()
  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatTime(value, locale, intlOptions)
  }, [props, locale])
  return <>{text}</>
}

FormatTime.displayName = 'FormatTime'
