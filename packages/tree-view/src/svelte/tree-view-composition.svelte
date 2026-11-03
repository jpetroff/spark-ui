<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { TreeViewProps } from '../svelte.ts'
  import { TreeView as ComponentParts } from './ark/index.ts'

  let props: TreeViewProps = $props()
</script>

<ComponentParts.Root {...props} />
