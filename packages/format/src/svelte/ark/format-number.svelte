<script module lang="ts">
  export interface FormatNumberProps extends Intl.NumberFormatOptions {
    /**
     * The number to format
     */
    value: number
  }
</script>

<script lang="ts">
  import { formatNumber } from '@spark/shared/common/zag/i18n-utils/index.ts'
  import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";

  const { value, ...props }: FormatNumberProps = $props()
  const locale = useLocaleContext()
  const text = $derived(formatNumber(value, locale().locale, props))
</script>

{text}
