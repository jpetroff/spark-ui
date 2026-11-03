'use client'

import { formatBytes } from '@spark/shared/common/zag/i18n-utils/index.ts'
import { useMemo } from 'react'
import { useLocaleContext } from "@spark/shared/react/ark/providers/locale/use-locale-context.ts";

export interface FormatByteProps {
  /**
   * The unit granularity to display
   */
  unit?: 'bit' | 'byte' | undefined
  /**
   * The unit display
   */
  unitDisplay?: 'long' | 'short' | 'narrow' | undefined
  /**
   * The unit system to use for formatting
   */
  unitSystem?: 'decimal' | 'binary' | undefined
  /**
   * The byte size to format
   */
  value: number
}

export const FormatByte = (props: FormatByteProps) => {
  const { locale } = useLocaleContext()

  const text = useMemo(() => {
    const { value, ...intlOptions } = props
    return formatBytes(value, locale, intlOptions)
  }, [props, locale])

  return <>{text}</>
}

FormatByte.displayName = 'FormatByte'
