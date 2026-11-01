import type { Scope } from "../../../../../shared/src/common/zag/core/index.ts";
import { getByOwnerId } from "../../../../../shared/src/common/zag/dom-query/shared.ts";
import { getFocusables } from "../../../../../shared/src/common/zag/dom-query/index.ts";
import { queryAll } from "../../../../../shared/src/common/zag/dom-query/index.ts";
import { isFunction } from "../../../../../shared/src/common/zag/utils/index.ts";

export const getAnchorId = (scope: Scope) => scope.ids?.anchor ?? `popover:${scope.id}:anchor`

export const getTriggerId = (scope: Scope, value?: string) => {
  const customId = scope.ids?.trigger
  if (customId != null) return isFunction(customId) ? customId(value) : customId
  return value ? `popover:${scope.id}:trigger:${value}` : `popover:${scope.id}:trigger`
}
export const getContentId = (scope: Scope) => scope.ids?.content ?? `popover:${scope.id}:content`
export const getPositionerId = (scope: Scope) => scope.ids?.positioner ?? `popover:${scope.id}:popper`
export const getArrowId = (scope: Scope) => scope.ids?.arrow ?? `popover:${scope.id}:arrow`
export const getTitleId = (scope: Scope) => scope.ids?.title ?? `popover:${scope.id}:title`
export const getDescriptionId = (scope: Scope) => scope.ids?.description ?? `popover:${scope.id}:desc`
export const getCloseTriggerId = (scope: Scope) => scope.ids?.closeTrigger ?? `popover:${scope.id}:close`

export const getAnchorEl = (scope: Scope) => scope.getById(getAnchorId(scope))

export const getTriggerEl = (scope: Scope) => scope.getById(getTriggerId(scope))

export const getTriggerEls = (scope: Scope): HTMLElement[] =>
  queryAll<HTMLElement>(scope.getRootNode(), `[data-scope="popover"][data-part="trigger"]${getByOwnerId(scope.id)}`)

export const getActiveTriggerEl = (scope: Scope, value: string | null): HTMLElement | null => {
  if (value == null) {
    return getTriggerEl(scope) ?? getTriggerEls(scope)[0]
  }
  return scope.getById(getTriggerId(scope, value))
}
export const getContentEl = (scope: Scope) => scope.getById(getContentId(scope))
export const getPositionerEl = (scope: Scope) => scope.getById(getPositionerId(scope))
export const getTitleEl = (scope: Scope) => scope.getById(getTitleId(scope))
export const getDescriptionEl = (scope: Scope) => scope.getById(getDescriptionId(scope))

export const getFocusableEls = (scope: Scope) => getFocusables(getContentEl(scope))
export const getFirstFocusableEl = (scope: Scope) => getFocusableEls(scope)[0]
