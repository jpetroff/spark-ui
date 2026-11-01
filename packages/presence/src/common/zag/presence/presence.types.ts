import type { EventObject } from "../../../../../shared/src/common/zag/core/index.ts";
import type { Machine } from "../../../../../shared/src/common/zag/core/index.ts";
import type { Service } from "../../../../../shared/src/common/zag/core/index.ts";

/* -----------------------------------------------------------------------------
 * Machine context
 * -----------------------------------------------------------------------------*/

export interface PresenceProps {
  /**
   * Whether the node is present (controlled by the user)
   */
  present?: boolean | undefined
  /**
   * Function called when the animation ends in the closed state
   */
  onExitComplete?: VoidFunction | undefined
  /**
   * Function called when the animation ends in the open state
   */
  onEnterComplete?: VoidFunction | undefined
  /**
   * Whether to synchronize the present change immediately or defer it to the next frame
   */
  immediate?: boolean | undefined
}

export interface PresenceSchema {
  refs: {
    node: HTMLElement | null
    styles: CSSStyleDeclaration | null
  }
  props: PresenceProps
  context: {
    initial: boolean
    unmountAnimationName: string | null
    prevAnimationName: string | null
  }
  state: "unmounted" | "unmountSuspended" | "mounted"
  action: string
  effect: string
  event: EventObject
}

export type PresenceService = Service<PresenceSchema>

export type PresenceMachine = Machine<PresenceSchema>

/* -----------------------------------------------------------------------------
 * Component API
 * -----------------------------------------------------------------------------*/

export interface PresenceApi {
  /**
   * Whether the animation should be skipped.
   */
  skip: boolean
  /**
   * Whether the node is present in the DOM.
   */
  present: boolean
  /**
   * Function to set the node (as early as possible)
   */
  setNode: (node: HTMLElement | null) => void
  /**
   * Function to programmatically unmount the node
   */
  unmount: VoidFunction
}
