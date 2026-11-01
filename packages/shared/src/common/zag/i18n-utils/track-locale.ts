import { getWindow } from "../dom-query/index.ts";
import { getDefaultLocale } from "./locale.ts";
import { type Locale } from "./locale.ts";

export interface LocaleOptions {
  locale?: string | undefined
  getRootNode?: (() => ShadowRoot | Document | Node) | undefined
  onLocaleChange?: ((locale: Locale) => void) | undefined
}

export function trackLocale(options: LocaleOptions = {}) {
  const { getRootNode, onLocaleChange } = options

  onLocaleChange?.(getDefaultLocale())

  const handleLocaleChange = () => {
    onLocaleChange?.(getDefaultLocale())
  }

  const win = getRootNode ? getWindow(getRootNode()) : window

  win.addEventListener("languagechange", handleLocaleChange)

  return () => {
    win.removeEventListener("languagechange", handleLocaleChange)
  }
}
