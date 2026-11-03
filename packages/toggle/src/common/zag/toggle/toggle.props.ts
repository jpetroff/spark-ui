import { createProps } from "@spark/shared/common/zag/types/index.ts";
import { createSplitProps } from "@spark/shared/common/zag/utils/index.ts";
import type { ToggleProps } from "./toggle.types.ts";

export const props = createProps<ToggleProps>()(["defaultPressed", "pressed", "onPressedChange", "disabled"])
export const splitProps = createSplitProps<Partial<ToggleProps>>(props)
