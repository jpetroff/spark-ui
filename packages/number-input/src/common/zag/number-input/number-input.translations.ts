import type { Required } from "@spark/shared/common/zag/types/index.ts";
import type { IntlTranslations } from "./number-input.types.ts";

export const defaultTranslations: Required<Pick<IntlTranslations, "incrementLabel" | "decrementLabel">> = {
  incrementLabel: "increment value",
  decrementLabel: "decrease value",
}
