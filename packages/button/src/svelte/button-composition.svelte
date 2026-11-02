<!-- Editable composition. See the public component index for its documented prop API and usage. -->
<script lang="ts">
  import type { ButtonProps } from '../svelte.ts'
  import Button from './button.svelte'

  let { children, parts = {} }: ButtonProps = $props()
</script>

<Button {...parts.button}>{@render children?.()}</Button>
