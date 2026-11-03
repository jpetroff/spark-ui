import type { Accessor } from "@spark/shared/svelte/ark/types.ts";
import * as asyncList from '@spark/async-list/common/zag/async-list/index.ts'
import { useMachine } from '@spark/shared/svelte/zag/index.ts'
import { type MaybeFunction, runIfFn } from '@spark/shared/common/zag/utils/index.ts'

export interface UseAsyncListProps<T, C = string> extends asyncList.Props<T, C> {}
export interface UseAsyncListReturn<T, C = string> extends Accessor<asyncList.Api<T, C>> {}

export const useAsyncList = <T, C = string>(
  props?: MaybeFunction<UseAsyncListProps<T, C>>,
): UseAsyncListReturn<T, C> => {
  const machineProps = $derived.by(() => runIfFn(props))

  const service = useMachine(asyncList.machine as asyncList.Machine<T, C>, () => machineProps)
  const api = $derived(asyncList.connect(service))

  return () => api
}
