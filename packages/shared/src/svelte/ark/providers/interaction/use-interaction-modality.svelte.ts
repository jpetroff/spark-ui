import type { Accessor } from "../../types.ts";
import { getInteractionModality, trackInteractionModality, type Modality } from '../../../../common/zag/focus-visible/index.ts'
import { useEnvironmentContext } from "../environment/use-environment-context.ts";

export type { Modality }

export function useInteractionModality(): Accessor<Modality | null> {
  const env = useEnvironmentContext()

  let modality = $state<Modality | null>(getInteractionModality())

  $effect(() => {
    return trackInteractionModality({
      root: env().getRootNode(),
      onChange(details) {
        modality = details.modality
      },
    })
  })

  return () => modality
}
