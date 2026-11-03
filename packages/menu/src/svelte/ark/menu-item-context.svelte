<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useMenuItemContext } from "./use-menu-item-context.ts";
import { type UseMenuItemContext } from "./use-menu-item-context.ts";

  export interface MenuItemContextProps {
    render: Snippet<[UseMenuItemContext]>
  }

  const props: MenuItemContextProps = $props()

  const context = useMenuItemContext()
</script>

{@render props.render(context)}
