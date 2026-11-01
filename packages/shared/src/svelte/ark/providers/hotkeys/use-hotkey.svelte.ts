import { type MaybeFunction, runIfFn } from '../../../../common/zag/utils/index.ts'
import { type UseHotkeysCommand } from "./use-hotkeys.svelte.ts";
import { type UseHotkeysProps } from "./use-hotkeys.svelte.ts";
import { useHotkeys } from "./use-hotkeys.svelte.ts";

export interface UseHotkeyProps extends UseHotkeysCommand, Pick<UseHotkeysProps, 'store'> {}

export function useHotkey(props: MaybeFunction<UseHotkeyProps>) {
  useHotkeys(() => {
    const { store, ...command } = runIfFn(props)
    return { commands: [command], store }
  })
}
