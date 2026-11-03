<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface SwitchHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface SwitchHiddenInputProps extends Assign<HTMLProps<'input'>, SwitchHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useFieldContext } from "@spark/field/svelte/ark/use-field-context.ts";
  import { useSwitchContext } from "./use-switch-context.ts";

  let { ref = $bindable(null), ...props }: SwitchHiddenInputProps = $props()

  const switchMachine = useSwitchContext()
  const field = useFieldContext()
  const mergedProps = $derived(mergeProps(switchMachine().getHiddenInputProps(), props))
</script>

<Ark as="input" bind:ref aria-describedby={field?.()?.ariaDescribedby} {...mergedProps} />
