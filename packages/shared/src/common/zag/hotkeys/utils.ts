import { contains } from "../dom-query/index.ts";
import { getEventTarget as getNearestEventTarget } from "../dom-query/index.ts";
import { getWindow } from "../dom-query/index.ts";
import { isApple } from "../dom-query/index.ts";
import { isHTMLElement } from "../dom-query/index.ts";
import { isLinux } from "../dom-query/index.ts";
import type { FormTagName } from "./types.ts";
import type { HotkeyCommandTarget } from "./types.ts";
import type { HotkeyTarget } from "./types.ts";
import type { Platform } from "./types.ts";

export const getWin = (root: HotkeyTarget) => getWindow(root)

const FORM_TAGS = new Set(["input", "textarea", "select"])
export const isFormTag = (tagName: string): tagName is FormTagName => FORM_TAGS.has(tagName)

// Hotkey parsing constants
export const MODIFIER_SEPARATOR = "+"
export const SEQUENCE_SEPARATOR = ">"

export const getEventTarget = (event: KeyboardEvent): Element | null => {
  const target = getNearestEventTarget<Element>(event)
  return isHTMLElement(target) ? target : null
}

export const isContentEditableElement = (target: Element | null): boolean => {
  return isHTMLElement(target) && target.isContentEditable
}

export const getPlatform = (): Platform => {
  if (typeof navigator === "undefined") return "windows"
  if (isApple()) return "mac"
  if (isLinux()) return "linux"
  return "windows"
}

export const toArray = <T>(value: T | T[]): T[] => {
  if (Array.isArray(value)) {
    return value.filter((item) => item !== undefined)
  }
  return value !== undefined ? [value] : []
}

export const resolveCommandTarget = (target: HotkeyCommandTarget): HotkeyTarget | null => {
  return typeof target === "function" ? target() : target
}

export const isEventWithinTarget = (event: KeyboardEvent, el: HotkeyTarget): boolean => {
  const path = event.composedPath?.()
  if (path) return path.includes(el)
  const target = getEventTarget(event)
  return target !== null && (el === target || contains(el, target))
}

// Symbol/punctuation keys are layout-dependent: different keyboard layouts
// place them on different physical keys, often requiring Shift or AltGr.
// Any single Unicode letter or digit uses code-based matching like ASCII.
// Named keys (Enter, F1, ArrowLeft, …) are length !== 1 and are not symbols here.
const UNICODE_LETTER = /^\p{L}$/u
const UNICODE_NUMBER = /^\p{N}$/u

export const isSymbolKey = (key: string): boolean => {
  if (key.length !== 1) return false
  if (UNICODE_LETTER.test(key) || UNICODE_NUMBER.test(key)) return false
  return true
}
