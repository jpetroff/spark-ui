<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { JsonTreeViewProps } from '../svelte.ts'
  import { JsonTreeView as ComponentParts } from './ark/index.ts'

  let { data, label, parts = {} }: JsonTreeViewProps = $props()

</script>

<ComponentParts.Root {...parts.root} {data}>
  <ComponentParts.Tree {...parts.tree} aria-label={label} />
</ComponentParts.Root>
