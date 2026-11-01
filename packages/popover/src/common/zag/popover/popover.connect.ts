import { ariaAttr } from "@spark/shared/common/zag/dom-query/shared.ts";
import { dataAttr } from "@spark/shared/common/zag/dom-query/shared.ts";
import { isLeftClick } from "@spark/shared/common/zag/dom-query/index.ts";
import { isSafari } from "@spark/shared/common/zag/dom-query/index.ts";
import { getPlacementSide } from "@spark/shared/common/zag/popper/placement.ts";
import { getPlacementStyles } from "@spark/shared/common/zag/popper/get-styles.ts";
import type { NormalizeProps } from "@spark/shared/common/zag/types/index.ts";
import type { PropTypes } from "@spark/shared/common/zag/types/index.ts";
import type { Required } from "@spark/shared/common/zag/types/index.ts";
import { mergeWithDefault } from "@spark/shared/common/zag/utils/index.ts";
import { parts } from "./popover.anatomy.ts";
import * as dom from "./popover.dom.ts"
import type { IntlTranslations } from "./popover.types.ts";
import type { PopoverApi } from "./popover.types.ts";
import type { PopoverService } from "./popover.types.ts";
import type { TriggerProps } from "./popover.types.ts";

const defaultTranslations: Required<IntlTranslations> = {
  closeTriggerLabel: "close",
}

export function connect<T extends PropTypes>(service: PopoverService, normalize: NormalizeProps<T>): PopoverApi<T> {
  const { state, context, send, computed, prop, scope } = service
  const translations = mergeWithDefault(defaultTranslations, prop("translations"))
  const open = state.matches("open")

  const currentPlacement = context.get("currentPlacement")
  const currentPlacementSide = currentPlacement ? getPlacementSide(currentPlacement) : undefined
  const portalled = computed("currentPortalled")
  const rendered = context.get("renderedElements")
  const triggerValue = context.get("triggerValue")

  const popperStyles = getPlacementStyles({
    ...prop("positioning"),
    placement: currentPlacement,
  })

  return {
    portalled,
    open: open,
    setOpen(nextOpen) {
      send({ type: nextOpen ? "OPEN" : "CLOSE", replaces: "open" })
    },
    triggerValue,
    setTriggerValue(value) {
      send({ type: "TRIGGER_VALUE.SET", value })
    },
    reposition(options = {}) {
      send({ type: "POSITIONING.SET", options })
    },

    getArrowProps() {
      return normalize.element({
        id: dom.getArrowId(scope),
        ...parts.arrow.attrs,
        dir: prop("dir"),
        style: popperStyles.arrow,
      })
    },

    getArrowTipProps() {
      return normalize.element({
        ...parts.arrowTip.attrs,
        dir: prop("dir"),
        style: popperStyles.arrowTip,
      })
    },

    getAnchorProps() {
      return normalize.element({
        ...parts.anchor.attrs,
        dir: prop("dir"),
        id: dom.getAnchorId(scope),
      })
    },

    getTriggerProps(props: TriggerProps = {}) {
      const { value } = props
      const current = value == null ? false : triggerValue === value

      return normalize.button({
        ...parts.trigger.attrs,
        dir: prop("dir"),
        type: "button",
        "data-placement": currentPlacement,
        "data-side": currentPlacementSide,
        id: dom.getTriggerId(scope, value),
        "data-ownedby": scope.id,
        "data-value": value,
        "data-current": dataAttr(current),
        "aria-haspopup": "dialog",
        "aria-expanded": value == null ? open : open && current,
        "data-state": open ? "open" : "closed",
        "aria-controls": dom.getContentId(scope),
        onPointerDown(event) {
          if (!isLeftClick(event)) return
          if (isSafari()) {
            event.currentTarget.focus()
          }
        },
        onClick(event) {
          if (event.defaultPrevented) return
          const shouldSwitch = open && value != null && !current
          send({ type: shouldSwitch ? "TRIGGER_VALUE.SET" : "TOGGLE", value })
        },
        onBlur(event) {
          send({ type: "TRIGGER_BLUR", target: event.relatedTarget })
        },
      })
    },

    getIndicatorProps() {
      return normalize.element({
        ...parts.indicator.attrs,
        dir: prop("dir"),
        "data-state": open ? "open" : "closed",
      })
    },

    getPositionerProps() {
      return normalize.element({
        id: dom.getPositionerId(scope),
        ...parts.positioner.attrs,
        dir: prop("dir"),
        style: popperStyles.floating,
      })
    },

    getContentProps() {
      return normalize.element({
        ...parts.content.attrs,
        dir: prop("dir"),
        id: dom.getContentId(scope),
        tabIndex: -1,
        role: "dialog",
        "aria-modal": ariaAttr(prop("modal")),
        hidden: !open,
        "data-state": open ? "open" : "closed",
        "data-expanded": dataAttr(open),
        "aria-labelledby": rendered.title ? dom.getTitleId(scope) : undefined,
        "aria-describedby": rendered.description ? dom.getDescriptionId(scope) : undefined,
        "data-placement": currentPlacement,
        "data-side": currentPlacementSide,
      })
    },

    getTitleProps() {
      return normalize.element({
        ...parts.title.attrs,
        id: dom.getTitleId(scope),
        dir: prop("dir"),
      })
    },

    getDescriptionProps() {
      return normalize.element({
        ...parts.description.attrs,
        id: dom.getDescriptionId(scope),
        dir: prop("dir"),
      })
    },

    getCloseTriggerProps() {
      return normalize.button({
        ...parts.closeTrigger.attrs,
        dir: prop("dir"),
        id: dom.getCloseTriggerId(scope),
        type: "button",
        "aria-label": translations.closeTriggerLabel,
        onClick(event) {
          if (event.defaultPrevented) return
          event.stopPropagation()
          send({ type: "CLOSE" })
        },
      })
    },
  }
}
