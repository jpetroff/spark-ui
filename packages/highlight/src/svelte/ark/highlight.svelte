<script lang="ts">
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { Assign } from "@spark/shared/svelte/ark/types.ts";
  import { useHighlight } from "./use-highlight.svelte.ts";
import { type UseHighlightProps } from "./use-highlight.svelte.ts";

  export interface HighlightBaseProps extends UseHighlightProps {}
  export interface HighlightProps extends Assign<HTMLProps<'mark'>, HighlightBaseProps> {}

  const props: HighlightProps = $props()

  const [highlightProps, localProps] = $derived(
    createSplitProps<HighlightBaseProps>()(props, ['query', 'text', 'ignoreCase', 'matchAll', 'exactMatch']),
  )

  if (typeof props.text !== 'string') {
    throw new Error('[ark-ui/highlight] text must be a string')
  }

  const chunks = useHighlight(() => highlightProps)
</script>

{#each chunks() as { text, match }, i}
  {#if match}
    <mark {...localProps}>{text}</mark>
  {:else}
    {text}
  {/if}
{/each}
