<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { SwitchProps } from '../svelte.ts'
  import { Switch as ComponentParts } from './ark/index.ts'

  let { label, parts = {} }: SwitchProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Control {...parts.control}><ComponentParts.Thumb {...parts.thumb} /></ComponentParts.Control>
  <ComponentParts.Label {...parts.label}>{@render label()}</ComponentParts.Label>
  <ComponentParts.HiddenInput {...parts.hiddenInput} />
</ComponentParts.Root>
