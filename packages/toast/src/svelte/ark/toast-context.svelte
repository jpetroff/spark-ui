<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseToastContext } from "./use-toast-context.ts";
  import { useToastContext } from "./use-toast-context.ts";

  export interface ToastContextProps {
    render: Snippet<[UseToastContext]>
  }

  let { render }: ToastContextProps = $props()

  const context = useToastContext()
</script>

{@render render(context)}
