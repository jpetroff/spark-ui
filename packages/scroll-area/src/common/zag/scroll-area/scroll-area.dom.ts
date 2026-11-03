import type { Scope } from "@spark/shared/common/zag/core/index.ts";
import { getByOwnerId } from "@spark/shared/common/zag/dom-query/shared.ts";
import { query } from "@spark/shared/common/zag/dom-query/index.ts";

export const getRootId = (ctx: Scope) => ctx.ids?.root ?? `scroll-area-${ctx.id}`
export const getViewportId = (ctx: Scope) => ctx.ids?.viewport ?? `scroll-area-${ctx.id}:viewport`
export const getContentId = (ctx: Scope) => ctx.ids?.content ?? `scroll-area-${ctx.id}:content`

export const getRootEl = (ctx: Scope) => ctx.getById(getRootId(ctx))
export const getViewportEl = (ctx: Scope) => ctx.getById(getViewportId(ctx))
export const getContentEl = (ctx: Scope) => ctx.getById(getContentId(ctx))

export const getScrollbarXEl = (ctx: Scope) =>
  query(getRootEl(ctx), `[data-part=scrollbar][data-orientation=horizontal]${getByOwnerId(getRootId(ctx))}`)
export const getScrollbarYEl = (ctx: Scope) =>
  query(getRootEl(ctx), `[data-part=scrollbar][data-orientation=vertical]${getByOwnerId(getRootId(ctx))}`)

export const getThumbXEl = (ctx: Scope) =>
  query(getScrollbarXEl(ctx), `[data-part=thumb][data-orientation=horizontal]${getByOwnerId(getRootId(ctx))}`)
export const getThumbYEl = (ctx: Scope) =>
  query(getScrollbarYEl(ctx), `[data-part=thumb][data-orientation=vertical]${getByOwnerId(getRootId(ctx))}`)

export const getCornerEl = (ctx: Scope) => query(getRootEl(ctx), `[data-part=corner]${getByOwnerId(getRootId(ctx))}`)
