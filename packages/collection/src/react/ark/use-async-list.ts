'use client'

import * as asyncList from '@spark/async-list/common/zag/async-list/index.ts'
import { useMachine } from '@spark/shared/react/zag/index.ts'

export interface UseAsyncListProps<T, C = string> extends asyncList.Props<T, C> {}
export interface UseAsyncListReturn<T, C = string> extends asyncList.Api<T, C> {}

export function useAsyncList<T, C = string>(props: UseAsyncListProps<T, C>): UseAsyncListReturn<T, C> {
  const service = useMachine(asyncList.machine as asyncList.Machine<T, C>, props)
  return asyncList.connect(service)
}
