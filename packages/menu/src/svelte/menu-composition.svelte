<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { MenuProps } from '../svelte.ts'
  import { Menu as ComponentParts } from './ark/index.ts'

  let props: MenuProps = $props()
</script>

<ComponentParts.Root {...props} />
