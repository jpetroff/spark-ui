<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseNumberInputProps } from "./use-number-input.svelte.ts";

  export interface NumberInputRootBaseProps extends UseNumberInputProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface NumberInputRootProps extends Assign<HTMLProps<'div'>, NumberInputRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { NumberInputProvider } from "./use-number-input-context.ts";
  import { splitNumberInputProps } from "./split-number-input-props.svelte.ts";
  import { useNumberInput } from "./use-number-input.svelte.ts";

  let { ref = $bindable(null), value = $bindable(), ...props }: NumberInputRootProps = $props()
  const providedId = $props.id()

  const [useNumberInputProps, localProps] = $derived(splitNumberInputProps(props))

  const resolvedProps = $derived<UseNumberInputProps>({
    ...useNumberInputProps,
    id: useNumberInputProps.id ?? providedId,
    value,
    onValueChange(details) {
      useNumberInputProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const numberInput = useNumberInput(() => resolvedProps)
  const mergedProps = $derived(mergeProps(numberInput().getRootProps(), localProps))

  NumberInputProvider(numberInput)
</script>

<Ark as="div" bind:ref {...mergedProps} />
