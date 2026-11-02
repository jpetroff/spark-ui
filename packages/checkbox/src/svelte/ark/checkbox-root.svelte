<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseCheckboxProps } from "./use-checkbox.svelte.ts";

  export interface CheckboxRootBaseProps extends UseCheckboxProps, PolymorphicProps<'label'>, RefAttribute {}
  export interface CheckboxRootProps extends Assign<HTMLProps<'label'>, CheckboxRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { CheckboxProvider } from "./use-checkbox-context.ts";
  import { splitCheckboxProps } from "./split-checkbox-props.svelte.ts";
  import { useCheckbox } from "./use-checkbox.svelte.ts";

  let { ref = $bindable(null), checked = $bindable(), ...props }: CheckboxRootProps = $props()
  const providedId = $props.id()

  const [useCheckboxProps, localProps] = $derived(splitCheckboxProps(props))

  const resolvedProps = $derived<UseCheckboxProps>({
    ...useCheckboxProps,
    id: useCheckboxProps.id ?? providedId,
    checked,
    onCheckedChange(details) {
      useCheckboxProps.onCheckedChange?.(details)
      if (checked !== undefined) checked = details.checked
    },
  })

  const checkbox = useCheckbox(() => resolvedProps)
  const mergedProps = $derived(mergeProps({ class: 'spark-checkbox-root' }, checkbox().getRootProps(), localProps))

  CheckboxProvider(checkbox)
</script>

<Ark as="label" bind:ref {...mergedProps} />
