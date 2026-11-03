<script lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useToastContext } from "./use-toast-context.ts";

  export interface ToastActionTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}

  export interface ToastActionTriggerProps extends Assign<HTMLProps<'button'>, ToastActionTriggerBaseProps> {}

  let { ref = $bindable(null), ...props }: ToastActionTriggerProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getActionTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
