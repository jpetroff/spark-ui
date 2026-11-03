<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { SelectProps } from '../svelte.ts'
  import { Select as ComponentParts } from './ark/index.ts'

  let props: SelectProps = $props()
</script>

<ComponentParts.Root {...props} />
