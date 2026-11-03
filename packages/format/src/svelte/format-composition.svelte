<!-- Editable default formatter; use the compound API for bytes and times. -->
<script lang="ts">
  import type { FormatProps } from '../svelte.ts'
  import { Format as ComponentParts } from './ark/index.ts'
  let props: FormatProps = $props()
</script>

<ComponentParts.Number {...props} />
