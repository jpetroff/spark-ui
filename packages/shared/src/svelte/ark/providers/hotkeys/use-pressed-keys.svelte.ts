import type { HotkeyStoreState } from '../../../../common/zag/hotkeys/index.ts'
import { useSyncExternalStore } from '../../../zag/index.ts'
import { type UseHotkeyStoreProps } from "./use-hotkey-store.svelte.ts";
import { useHotkeyStore } from "./use-hotkey-store.svelte.ts";

const getVersion = (state: HotkeyStoreState) => Array.from(state.pressedKeys).join('|')

export function usePressedKeys(props: UseHotkeyStoreProps = {}): () => string[] {
  const store = useHotkeyStore(props)

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().pressedKeys),
  )
}
