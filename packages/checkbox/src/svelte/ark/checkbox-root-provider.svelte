<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseCheckboxReturn } from "./use-checkbox.svelte.ts";

  export interface CheckboxRootProviderBaseProps extends PolymorphicProps<'label'>, RefAttribute {
    value: UseCheckboxReturn
  }
  export interface CheckboxRootProviderProps extends Assign<HTMLProps<'label'>, CheckboxRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { CheckboxProvider } from "./use-checkbox-context.ts";

  let { ref = $bindable(null), value, ...props }: CheckboxRootProviderProps = $props()

  const mergedProps = $derived(mergeProps({ class: 'spark-checkbox-root' }, value().getRootProps(), props))

  CheckboxProvider(() => value())
</script>

<Ark as="label" bind:ref {...mergedProps} />
