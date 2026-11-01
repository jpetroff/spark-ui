<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseCheckboxGroupReturn } from "./use-checkbox-group.svelte.ts";

  export interface CheckboxGroupProviderBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    value: UseCheckboxGroupReturn
  }
  export interface CheckboxGroupProviderProps extends Assign<HTMLProps<'div'>, CheckboxGroupProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { CheckboxGroupContextProvider } from "./use-checkbox-group-context.ts";
  import { checkboxAnatomy } from "./checkbox.anatomy.ts";

  let { ref = $bindable(null), value, ...props }: CheckboxGroupProviderProps = $props()

  const mergedProps = $derived(mergeProps({ role: 'group', ...checkboxAnatomy.build().group.attrs }, props))

  CheckboxGroupContextProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} />
