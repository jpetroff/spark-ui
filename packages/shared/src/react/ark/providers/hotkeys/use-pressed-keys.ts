'use client'

import type { HotkeyStoreState } from '../../../../common/zag/hotkeys/index.ts'
import { type UseHotkeyStoreProps } from "./use-hotkey-store.ts";
import { useHotkeyStore } from "./use-hotkey-store.ts";
import { useStoreSnapshot } from "./use-store-snapshot.ts";

const getVersion = (state: HotkeyStoreState) => Array.from(state.pressedKeys).join('|')

const build = (state: HotkeyStoreState): string[] => Array.from(state.pressedKeys)

export const usePressedKeys = (props: UseHotkeyStoreProps = {}): string[] => {
  const store = useHotkeyStore(props)
  return useStoreSnapshot(store, getVersion, build)
}
