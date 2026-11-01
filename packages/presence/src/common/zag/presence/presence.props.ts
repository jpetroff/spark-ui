import { createProps } from "@spark/shared/common/zag/types/index.ts";
import type { PresenceProps } from "./presence.types.ts";

export const props = createProps<PresenceProps>()(["onExitComplete", "onEnterComplete", "present", "immediate"])
