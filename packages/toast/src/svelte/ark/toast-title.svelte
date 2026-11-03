<script lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useToastContext } from "./use-toast-context.ts";

  export interface ToastTitleBaseProps extends PolymorphicProps<'div'>, RefAttribute {}

  export interface ToastTitleProps extends Assign<HTMLProps<'div'>, ToastTitleBaseProps> {}

  let { ref = $bindable(null), ...props }: ToastTitleProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getTitleProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
