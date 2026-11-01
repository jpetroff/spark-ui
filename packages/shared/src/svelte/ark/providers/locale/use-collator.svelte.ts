import { createCollator } from '../../../../common/zag/i18n-utils/index.ts'
import { useLocaleContext } from "./use-locale-context.ts";
import type { Accessor } from "../../types.ts";

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string
}

export interface UseCollatorReturn extends Accessor<Intl.Collator> {}

export function useCollator(props: UseCollatorProps = {}): UseCollatorReturn {
  const env = useLocaleContext()
  const locale = $derived(props.locale ?? env().locale)

  const collator = $derived.by(() => {
    const { locale: _, ...options } = props
    return createCollator(locale, options)
  })

  return () => collator
}
