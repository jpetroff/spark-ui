import { i18nCache } from "./cache.ts";

const getListFormatter = i18nCache(Intl.ListFormat)

export function formatList(list: string[], locale: string, options: Intl.ListFormatOptions = {}) {
  const formatter = getListFormatter(locale, options)
  return formatter.format(list)
}
