<script module lang="ts">
  import type { Assign } from "@spark/shared/svelte/ark/types.ts";
import type { HTMLProps } from "@spark/shared/svelte/ark/types.ts";
import type { PolymorphicProps } from "@spark/shared/svelte/ark/types.ts";
import type { RefAttribute } from "@spark/shared/svelte/ark/types.ts";
  import type { UseDatePickerProps } from "./use-date-picker.svelte.ts";
  import type { UsePresenceProps } from "@spark/presence/svelte/ark/use-presence.svelte.ts";

  export interface DatePickerRootBaseProps
    extends UseDatePickerProps, UsePresenceProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerRootProps extends Assign<HTMLProps<'div'>, DatePickerRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@spark/shared/svelte/zag/index.ts'
  import { createSplitProps } from "@spark/shared/svelte/ark/utils/create-split-props.ts";
  import { default as Ark } from "@spark/shared/svelte/ark/components/factory/factory.svelte";
  import { PresenceProvider } from "@spark/presence/svelte/ark/use-presence-context.ts";
import { splitPresenceProps } from "@spark/presence/svelte/ark/split-presence-props.svelte.ts";
import { usePresence } from "@spark/presence/svelte/ark/use-presence.svelte.ts";
  import { useDatePicker } from "./use-date-picker.svelte.ts";
  import { DatePickerProvider } from "./use-date-picker-context.ts";

  let {
    ref = $bindable(null),
    value = $bindable(),
    focusedValue = $bindable(),
    open = $bindable(),
    view = $bindable(),
    ...props
  }: DatePickerRootProps = $props()
  const providedId = $props.id()

  const [presenceProps, datePickerProps] = $derived(splitPresenceProps(props))
  const [useDatePickerProps, localProps] = $derived(
    createSplitProps<UseDatePickerProps>()(datePickerProps, [
      'closeOnSelect',
      'createCalendar',
      'defaultFocusedValue',
      'defaultOpen',
      'defaultValue',
      'defaultView',
      'disabled',
      'fixedWeeks',
      'focusedValue',
      'format',
      'id',
      'ids',
      'inline',
      'invalid',
      'isDateUnavailable',
      'locale',
      'max',
      'maxSelectedDates',
      'maxView',
      'min',
      'minView',
      'name',
      'numOfMonths',
      'onFocusChange',
      'onOpenChange',
      'onValueChange',
      'onViewChange',
      'onVisibleRangeChange',
      'open',
      'openOnClick',
      'outsideDaySelectable',
      'parse',
      'placeholder',
      'positioning',
      'readOnly',
      'required',
      'selectionMode',
      'showWeekNumbers',
      'startOfWeek',
      'timeZone',
      'translations',
      'value',
      'view',
    ]),
  )

  const resolvedProps = $derived<UseDatePickerProps>({
    ...useDatePickerProps,
    id: useDatePickerProps.id ?? providedId,
    value,
    onValueChange(details) {
      useDatePickerProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
    focusedValue,
    onFocusChange(details) {
      useDatePickerProps.onFocusChange?.(details)
      if (focusedValue !== undefined) focusedValue = details.focusedValue
    },
    open,
    onOpenChange(details) {
      useDatePickerProps.onOpenChange?.(details)
      if (open !== undefined) open = details.open
    },
    view,
    onViewChange(details) {
      useDatePickerProps.onViewChange?.(details)
      if (view !== undefined) view = details.view
    },
  })

  const datePicker = useDatePicker(() => resolvedProps)
  const presence = usePresence(() => ({ present: datePicker().open, ...presenceProps }))
  const mergedProps = $derived(mergeProps({ class: 'spark-date-picker-root' }, datePicker().getRootProps(), localProps))

  DatePickerProvider(datePicker)
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
