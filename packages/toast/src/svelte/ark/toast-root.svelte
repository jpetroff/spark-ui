<script lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { useToastContext } from "./use-toast-context.ts";

  export interface ToastRootBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ToastRootProps extends Assign<HTMLProps<'div'>, ToastRootBaseProps> {}

  let { ref = $bindable(null), ...props }: ToastRootProps = $props()

  const toast = useToastContext()
  const mergedProps = $derived(mergeProps(toast().getRootProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps}>
  <div {...toast().getGhostBeforeProps()}></div>
  {@render props.children?.()}
  <div {...toast().getGhostAfterProps()}></div>
</Ark>
