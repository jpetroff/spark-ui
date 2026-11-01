import { type HotkeyFormatOptions, formatHotkey } from '../../../../common/zag/hotkeys/index.ts'
import { usePlatform } from "./use-platform.svelte.ts";

export type UseFormatHotkeyReturn = (hotkey: string, options?: HotkeyFormatOptions) => string

export function useFormatHotkey(): UseFormatHotkeyReturn {
  const platform = usePlatform()

  return (hotkey: string, options: HotkeyFormatOptions = {}) =>
    formatHotkey(hotkey, { platform: platform(), ...options })
}
