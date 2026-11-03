import type { Service } from "@spark/shared/common/zag/core/index.ts";
import { contains } from "@spark/shared/common/zag/dom-query/index.ts";
import type { NormalizeProps } from "@spark/shared/common/zag/types/index.ts";
import type { PropTypes } from "@spark/shared/common/zag/types/index.ts";
import { parts } from "./toast.anatomy.ts";
import * as dom from "./toast.dom.ts"
import type { ToastGroupApi } from "./toast.types.ts";
import type { ToastGroupSchema } from "./toast.types.ts";
import { getGroupPlacementStyle } from "./toast.utils.ts";

export function groupConnect<T extends PropTypes, O = any>(
  service: Service<ToastGroupSchema>,
  normalize: NormalizeProps<T>,
): ToastGroupApi<T, O> {
  //
  const { context, prop, send, refs, computed } = service

  return {
    getCount() {
      return context.get("toasts").length
    },
    getToasts() {
      return context.get("toasts")
    },
    getGroupProps(options = {}) {
      const { label = "Notifications" } = options
      const { hotkey } = prop("store").attrs
      const hotkeyLabel = hotkey.join("+").replace(/Key/g, "").replace(/Digit/g, "")
      const placement = computed("placement")
      const [side, align = "center"] = placement.split("-")

      return normalize.element({
        ...parts.group.attrs,
        dir: prop("dir"),
        tabIndex: -1,
        role: "region",
        "aria-label": `${label}, ${placement} (${hotkeyLabel})`,
        id: dom.getRegionId(placement),
        "data-placement": placement,
        "data-side": side,
        "data-align": align,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        style: getGroupPlacementStyle(service, placement),
        onMouseEnter() {
          if (refs.get("ignoreMouseTimer").isActive()) return
          send({ type: "REGION.POINTER_ENTER", placement })
        },
        onMouseMove() {
          if (refs.get("ignoreMouseTimer").isActive()) return
          send({ type: "REGION.POINTER_ENTER", placement })
        },
        onMouseLeave() {
          if (refs.get("ignoreMouseTimer").isActive()) return
          send({ type: "REGION.POINTER_LEAVE", placement })
        },
        onFocus(event) {
          send({ type: "REGION.FOCUS", target: event.relatedTarget })
        },
        onBlur(event) {
          if (refs.get("isFocusWithin") && !contains(event.currentTarget, event.relatedTarget)) {
            queueMicrotask(() => send({ type: "REGION.BLUR" }))
          }
        },
      })
    },

    subscribe(fn) {
      const store = prop("store")
      return store.subscribe(() => fn(context.get("toasts")))
    },
  }
}
