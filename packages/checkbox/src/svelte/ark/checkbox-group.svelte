<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseCheckboxGroupProps } from "./use-checkbox-group.svelte.ts";

  export interface CheckboxGroupBaseProps extends UseCheckboxGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface CheckboxGroupProps extends Assign<HTMLProps<'div'>, CheckboxGroupBaseProps> {}
</script>

<script lang="ts">
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { checkboxAnatomy } from "./checkbox.anatomy.ts";
  import { CheckboxGroupContextProvider } from "./use-checkbox-group-context.ts";
  import { splitCheckboxGroupProps } from "./split-checkbox-group-props.svelte.ts";
  import { useCheckboxGroup } from "./use-checkbox-group.svelte.ts";

  let { ref = $bindable(null), value = $bindable(), ...props }: CheckboxGroupProps = $props()

  const [checkboxGroupProps, localProps] = $derived(splitCheckboxGroupProps(props))

  const resolvedProps = $derived<UseCheckboxGroupProps>({
    ...checkboxGroupProps,
    value,
    onValueChange(newValue) {
      checkboxGroupProps.onValueChange?.(newValue)
      value = newValue
    },
  })

  const checkboxGroup = useCheckboxGroup(() => resolvedProps)

  CheckboxGroupContextProvider(checkboxGroup)
</script>

<Ark as="div" bind:ref role="group" {...checkboxAnatomy.build().group.attrs} {...localProps} />
