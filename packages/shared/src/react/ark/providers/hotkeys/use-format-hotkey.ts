'use client'

import { type HotkeyFormatOptions, formatHotkey } from '../../../../common/zag/hotkeys/index.ts'
import { useCallback } from 'react'
import { usePlatform } from "./use-platform.ts";

export type UseFormatHotkeyReturn = (hotkey: string, options?: HotkeyFormatOptions) => string

export const useFormatHotkey = (): UseFormatHotkeyReturn => {
  const platform = usePlatform()

  return useCallback(
    (hotkey: string, options: HotkeyFormatOptions = {}) => formatHotkey(hotkey, { platform, ...options }),
    [platform],
  )
}
