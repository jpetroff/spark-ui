'use client'

import { getInteractionModality, trackInteractionModality, type Modality } from '../../../../common/zag/focus-visible/index.ts'
import { useCallback, useSyncExternalStore } from 'react'
import { useEnvironmentContext } from "../environment/use-environment-context.ts";

export type { Modality }

export function useInteractionModality(): Modality | null {
  const { getRootNode } = useEnvironmentContext()
  return useSyncExternalStore(
    useCallback((onChange) => trackInteractionModality({ root: getRootNode(), onChange }), [getRootNode]),
    getInteractionModality,
    () => null,
  )
}
