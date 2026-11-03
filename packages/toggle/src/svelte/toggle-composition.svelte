<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { ToggleProps } from '../svelte.ts'
  import { Toggle as ComponentParts } from './ark/index.ts'

  let props: ToggleProps = $props()
</script>

<ComponentParts.Root {...props} />
