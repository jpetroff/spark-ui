<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { FormatProps } from '../svelte.ts'
  import { Format as ComponentParts } from './ark/index.ts'

  let props: FormatProps = $props()
</script>

<ComponentParts.Root {...props} />
