import type { Service } from "../../../../../shared/src/common/zag/core/index.ts";
import type { NormalizeProps } from "../../../../../shared/src/common/zag/types/index.ts";
import type { PropTypes } from "../../../../../shared/src/common/zag/types/index.ts";
import type { PresenceApi } from "./presence.types.ts";
import type { PresenceSchema } from "./presence.types.ts";

export function connect<T extends PropTypes>(
  service: Service<PresenceSchema>,
  _normalize: NormalizeProps<T>,
): PresenceApi {
  const { state, send, context } = service
  const present = state.matches("mounted", "unmountSuspended")
  return {
    skip: !context.get("initial"),
    present,
    setNode(node) {
      if (!node) return
      send({ type: "NODE.SET", node })
    },
    unmount() {
      send({ type: "UNMOUNT" })
    },
  }
}
