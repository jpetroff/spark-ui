<script module lang="ts">
  export interface FormatByteProps {
    /**
     * The unit granularity to display
     */
    unit?: 'bit' | 'byte'
    /**
     * The unit display
     */
    unitDisplay?: 'long' | 'short' | 'narrow'
    /**
     * The unit system to use for formatting
     */
    unitSystem?: 'decimal' | 'binary'
    /**
     * The byte size to format
     */
    value: number
  }
</script>

<script lang="ts">
  import { formatBytes } from '@spark/shared/common/zag/i18n-utils/index.ts'
  import { useLocaleContext } from "@spark/shared/svelte/ark/providers/index.ts";

  const props: FormatByteProps = $props()

  const locale = useLocaleContext()

  const text = $derived(() => {
    const { value, ...intlProps } = props
    return formatBytes(value, locale().locale, intlProps)
  })
</script>

{text()}
