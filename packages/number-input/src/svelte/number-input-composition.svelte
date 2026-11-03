<!-- Editable composition; the public index documents every prop and part. -->
<script lang="ts">
  import type { NumberInputProps } from '../svelte.ts'
  import { NumberInput as ComponentParts } from './ark/index.ts'

  let { label, parts = {} }: NumberInputProps = $props()

</script>

<ComponentParts.Root {...parts.root}>
  <ComponentParts.Label {...parts.label}>{@render label()}</ComponentParts.Label>
  <ComponentParts.Control {...parts.control}>
    <ComponentParts.DecrementTrigger aria-label="Decrease value" {...parts.decrementTrigger}>−</ComponentParts.DecrementTrigger>
    <ComponentParts.Input {...parts.input} />
    <ComponentParts.IncrementTrigger aria-label="Increase value" {...parts.incrementTrigger}>+</ComponentParts.IncrementTrigger>
  </ComponentParts.Control>
</ComponentParts.Root>
