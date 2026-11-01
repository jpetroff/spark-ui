import type { Accessor } from "../../types.ts";
import { isFocusVisible, trackFocusVisible } from '../../../../common/zag/focus-visible/index.ts'
import { useEnvironmentContext } from "../environment/use-environment-context.ts";

export interface UseFocusVisibleProps {
  isTextInput?: boolean
  autoFocus?: boolean
}

export function useFocusVisible(props: UseFocusVisibleProps = {}): Accessor<boolean> {
  const { isTextInput, autoFocus } = props
  const env = useEnvironmentContext()

  let focusVisible = $state(autoFocus || isFocusVisible())

  $effect(() => {
    return trackFocusVisible({
      root: env().getRootNode(),
      isTextInput,
      autoFocus,
      onChange(details) {
        focusVisible = details.isFocusVisible
      },
    })
  })

  return () => focusVisible
}
