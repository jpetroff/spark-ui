'use client'

import type { HotkeyCommand, HotkeyStoreState } from '../../../../common/zag/hotkeys/index.ts'
import { type UseHotkeyStoreProps } from "./use-hotkey-store.ts";
import { useHotkeyStore } from "./use-hotkey-store.ts";
import { useStoreSnapshot } from "./use-store-snapshot.ts";

const getVersion = (state: HotkeyStoreState) =>
  Array.from(state.commands.values(), (command) => `${command.id}:${command.hotkey}:${command.label ?? ''}`).join('|')

const build = (state: HotkeyStoreState): HotkeyCommand[] => Array.from(state.commands.values())

export const useHotkeyRegistrations = (props: UseHotkeyStoreProps = {}): HotkeyCommand[] => {
  const store = useHotkeyStore(props)
  return useStoreSnapshot(store, getVersion, build)
}
