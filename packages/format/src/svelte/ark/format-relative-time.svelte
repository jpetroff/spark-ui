<script module lang="ts">
  export interface FormatRelativeTimeProps extends Intl.RelativeTimeFormatOptions {
    /**
     * The date to format
     */
    value: Date
  }
</script>

<script lang="ts">
  import { formatRelativeTime } from '@spark/shared/common/zag/i18n-utils/index.ts'
  import { useLocaleContext } from "@spark/shared/svelte/ark/providers/locale/use-locale-context.ts";

  let { value, ...props }: FormatRelativeTimeProps = $props()

  const locale = useLocaleContext()
  const text = $derived(formatRelativeTime(value, locale().locale, props))
</script>

{text}
