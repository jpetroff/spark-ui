'use client'

import { isFocusVisible, trackFocusVisible } from '../../../../common/zag/focus-visible/index.ts'
import { useCallback, useSyncExternalStore } from 'react'
import { useEnvironmentContext } from "../environment/use-environment-context.ts";

export interface UseFocusVisibleProps {
  isTextInput?: boolean
  autoFocus?: boolean
}

export function useFocusVisible(props: UseFocusVisibleProps = {}): boolean {
  const { isTextInput, autoFocus } = props
  const { getRootNode } = useEnvironmentContext()

  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      trackFocusVisible({
        root: getRootNode(),
        isTextInput,
        autoFocus,
        onChange: onStoreChange,
      }),
    [getRootNode, isTextInput, autoFocus],
  )

  const getSnapshot = useCallback(() => autoFocus || isFocusVisible(), [autoFocus])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
