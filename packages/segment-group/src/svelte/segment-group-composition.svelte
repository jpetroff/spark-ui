<!-- Editable assembly. Add subcomponents and their props here as needed. -->
<script lang="ts">
  import type { SegmentGroupProps } from '../svelte.ts'
  import { SegmentGroup as ComponentParts } from './ark/index.ts'

  let props: SegmentGroupProps = $props()
</script>

<ComponentParts.Root {...props} />
