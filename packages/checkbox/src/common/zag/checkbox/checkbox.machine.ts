import { createGuards } from "../../../../../shared/src/common/zag/core/index.ts";
import { createMachine } from "../../../../../shared/src/common/zag/core/index.ts";
import { dispatchInputCheckedEvent } from "../../../../../shared/src/common/zag/dom-query/index.ts";
import { setElementChecked } from "../../../../../shared/src/common/zag/dom-query/index.ts";
import { trackFormControl } from "../../../../../shared/src/common/zag/dom-query/index.ts";
import { trackPress } from "../../../../../shared/src/common/zag/dom-query/index.ts";
import { trackFocusVisible } from "../../../../../shared/src/common/zag/focus-visible/index.ts";
import * as dom from "./checkbox.dom.ts"
import type { CheckboxSchema } from "./checkbox.types.ts";
import type { CheckedState } from "./checkbox.types.ts";

const { not } = createGuards<CheckboxSchema>()

export const machine = createMachine<CheckboxSchema>({
  props({ props }) {
    return {
      value: "on",
      ...props,
      defaultChecked: props.defaultChecked ?? false,
    }
  },

  initialState() {
    return "ready"
  },

  context({ prop, bindable }) {
    return {
      checked: bindable(() => ({
        defaultValue: prop("defaultChecked"),
        value: prop("checked"),
        onChange(checked) {
          prop("onCheckedChange")?.({ checked })
        },
      })),
      fieldsetDisabled: bindable(() => ({ defaultValue: false })),
      focusVisible: bindable(() => ({ defaultValue: false })),
      active: bindable(() => ({ defaultValue: false })),
      focused: bindable(() => ({ defaultValue: false })),
      hovered: bindable(() => ({ defaultValue: false })),
    }
  },

  entry: ["syncInputElement"],

  watch({ track, context, prop, action }) {
    track([() => prop("disabled")], () => {
      action(["removeFocusIfNeeded"])
    })
    track([() => context.get("checked")], () => {
      action(["syncInputElement"])
    })
  },

  effects: ["trackFormControlState", "trackPressEvent", "trackFocusVisible"],

  on: {
    "CHECKED.TOGGLE": [
      {
        guard: not("isTrusted"),
        actions: ["toggleChecked", "dispatchChangeEvent"],
      },
      {
        actions: ["toggleChecked"],
      },
    ],
    "CHECKED.SET": [
      {
        guard: not("isTrusted"),
        actions: ["setChecked", "dispatchChangeEvent"],
      },
      {
        actions: ["setChecked"],
      },
    ],
    "CONTEXT.SET": {
      actions: ["setContext"],
    },
  },

  computed: {
    indeterminate: ({ context }) => isIndeterminate(context.get("checked")),
    checked: ({ context }) => isChecked(context.get("checked")),
    disabled: ({ context, prop }) => !!prop("disabled") || context.get("fieldsetDisabled"),
  },

  states: {
    ready: {},
  },

  implementations: {
    guards: {
      isTrusted: ({ event }) => !!event.isTrusted,
    },

    effects: {
      trackPressEvent({ context, computed, scope }) {
        if (computed("disabled")) return
        return trackPress({
          pointerNode: dom.getRootEl(scope),
          keyboardNode: dom.getHiddenInputEl(scope),
          isValidKey: (event) => event.key === " ",
          onPress: () => context.set("active", false),
          onPressStart: () => context.set("active", true),
          onPressEnd: () => context.set("active", false),
        })
      },

      trackFocusVisible({ computed, scope }) {
        if (computed("disabled")) return
        return trackFocusVisible({ root: scope.getRootNode?.() })
      },

      trackFormControlState({ context, scope }) {
        return trackFormControl(dom.getHiddenInputEl(scope), {
          onFieldsetDisabledChange(disabled) {
            context.set("fieldsetDisabled", disabled)
          },
          onFormReset() {
            context.set("checked", context.initial("checked"))
          },
        })
      },
    },

    actions: {
      setContext({ context, event }) {
        for (const key in event.context) {
          context.set(key as any, event.context[key])
        }
      },
      syncInputElement({ context, computed, scope }) {
        const inputEl = dom.getHiddenInputEl(scope)
        if (!inputEl) return
        setElementChecked(inputEl, computed("checked"))
        inputEl.indeterminate = isIndeterminate(context.get("checked"))
      },
      removeFocusIfNeeded({ context, prop }) {
        if (prop("disabled") && context.get("focused")) {
          context.set("focused", false)
          context.set("focusVisible", false)
        }
      },
      setChecked({ context, event }) {
        context.set("checked", event.checked)
      },
      toggleChecked({ context, computed }) {
        const checked = isIndeterminate(computed("checked")) ? true : !computed("checked")
        context.set("checked", checked)
      },
      dispatchChangeEvent({ computed, scope }) {
        queueMicrotask(() => {
          const inputEl = dom.getHiddenInputEl(scope)
          dispatchInputCheckedEvent(inputEl, { checked: computed("checked") })
        })
      },
    },
  },
})

function isIndeterminate(checked?: CheckedState): checked is "indeterminate" {
  return checked === "indeterminate"
}

function isChecked(checked?: CheckedState): checked is boolean {
  return isIndeterminate(checked) ? false : !!checked
}
