'use client'

import { isApple, isLinux } from '../../../../common/zag/dom-query/index.ts'
import type { Platform } from '../../../../common/zag/hotkeys/index.ts'
import { useCallback, useSyncExternalStore } from 'react'

export type { Platform }

const subscribe = () => () => {}

const detect = (): Platform => {
  if (isApple()) return 'mac'
  if (isLinux()) return 'linux'
  return 'windows'
}

export const usePlatform = (): Platform => {
  const getSnapshot = useCallback(detect, [])
  const getServerSnapshot = useCallback((): Platform => 'windows', [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
