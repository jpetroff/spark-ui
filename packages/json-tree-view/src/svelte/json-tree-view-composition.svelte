<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { JsonTreeViewProps } from '../svelte.ts'
  import { JsonTreeView as ComponentParts } from './ark/index.ts'

  let props: JsonTreeViewProps = $props()
</script>

<ComponentParts.Root {...props} />
