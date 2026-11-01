import type { Accessor } from "../../types.ts";
import { type FilterOptions, type FilterReturn, createFilter } from '../../../../common/zag/i18n-utils/index.ts'
import { type MaybeFunction, runIfFn } from '../../../../common/zag/utils/index.ts'
import { useLocaleContext } from "./use-locale-context.ts";

export interface UseFilterProps extends FilterOptions {}

export function useFilter(inProps: MaybeFunction<UseFilterProps>): UseFilterReturn {
  const props = $derived(runIfFn(inProps))
  const env = useLocaleContext()

  const locale = $derived(props.locale ?? env().locale)
  const filter = $derived(createFilter({ ...props, locale }))

  return () => filter
}

export interface UseFilterReturn extends Accessor<FilterReturn> {}
