<script module lang="ts">
  import { getDocument, getWindow } from '../../../../common/zag/dom-query/index.ts'
  import type { MaybeFunction } from '../../../../common/zag/utils/index.ts'
  import type { Snippet } from 'svelte'
  import type { RootNode } from "./use-environment-context.ts";
import type { UseEnvironmentContext } from "./use-environment-context.ts";

  export interface EnvironmentProviderProps {
    /**
     * The root node to use for the environment.
     */
    value?: MaybeFunction<RootNode>
    /**
     * The children to render.
     */
    children?: Snippet
  }
</script>

<script lang="ts">
  import { runIfFn } from "../../utils/run-if-fn.ts";
  import { EnvironmentContextProvider } from "./use-environment-context.ts";

  const { value, children }: EnvironmentProviderProps = $props()
  let spanRef: HTMLSpanElement | null = $state(null)

  const getRootNode = () => runIfFn(value) ?? spanRef?.ownerDocument ?? document

  const environment = $derived<ReturnType<UseEnvironmentContext>>({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  })

  EnvironmentContextProvider(() => environment)
</script>

{@render children?.()}
{#if !value}
  <span bind:this={spanRef} hidden></span>
{/if}
