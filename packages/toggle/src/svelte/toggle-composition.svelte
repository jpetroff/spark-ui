<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { ToggleProps } from '../svelte.ts'
  import { Toggle as ComponentParts } from './ark/index.ts'

  let { children, parts = {} }: ToggleProps = $props()

</script>

<ComponentParts.Root {...parts.root}>{@render children()}</ComponentParts.Root>
