<script lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useToastContext } from "./use-toast-context.ts";

  export interface ToastDescriptionBaseProps extends PolymorphicProps<'div'>, RefAttribute {}

  export interface ToastDescriptionProps extends Assign<HTMLProps<'div'>, ToastDescriptionBaseProps> {}

  let { ref = $bindable(null), ...props }: ToastDescriptionProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getDescriptionProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
