import { isApple, isLinux } from '../../../../common/zag/dom-query/index.ts'
import type { Platform } from '../../../../common/zag/hotkeys/index.ts'

export type { Platform }

const detect = (): Platform => {
  if (isApple()) return 'mac'
  if (isLinux()) return 'linux'
  return 'windows'
}

export function usePlatform(): () => Platform {
  let platform = $state<Platform>('windows')

  $effect(() => {
    platform = detect()
  })

  return () => platform
}
