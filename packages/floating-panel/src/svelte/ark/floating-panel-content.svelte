<script lang="ts" module>
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";

  export interface FloatingPanelContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FloatingPanelContentProps extends Assign<HTMLProps<'div'>, FloatingPanelContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { usePresenceContext } from "@spark/presence/svelte/ark/use-presence-context.ts";
  import { useFloatingPanelContext } from "./use-floating-panel-context.ts";

  let { ref = $bindable(null), ...props }: FloatingPanelContentProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(floatingPanel().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {@attach setNode} {...mergedProps} />
{/if}
