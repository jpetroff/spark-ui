import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, Snippet } from 'svelte'
import { DatePicker as DatePickerParts } from './svelte/ark/index.ts'
import DatePickerComponent from './svelte/date-picker-composition.svelte'
export * from './svelte/ark/index.ts'

/**
 * Compound usage (all primitive props and snippets remain available):
 * <DatePicker.Root>
 *   <DatePicker.Label>Appointment</DatePicker.Label>
 *   <DatePicker.Control><DatePicker.Input /><DatePicker.Trigger>Choose date</DatePicker.Trigger></DatePicker.Control>
 *   <DatePicker.Positioner><DatePicker.Content>
 *     ...View, navigation and Table parts; see svelte/date-picker-composition.svelte...
 *   </DatePicker.Content></DatePicker.Positioner>
 * </DatePicker.Root>
 *
 * Editable assembled DatePicker component. Customize its markup and props for your application.
 * DatePicker.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, uncomment recipe.css and edit its stable .spark-* selectors.
 */
export interface DatePickerProps {
  /** Associated input label. */
  label: Snippet
  /** Props for the nested primitives. Add or remove entries with the markup. */
  parts?: {
    /** Single-date day calendar. value/defaultValue, onValueChange, min, max, locale and name. */
    root?: Omit<
      ComponentProps<typeof DatePickerParts.Root>,
      'children' | 'selectionMode' | 'minView' | 'maxView' | 'view' | 'defaultView'
    >
    /** Associated label classes. */
    label?: Omit<ComponentProps<typeof DatePickerParts.Label>, 'children'>
    /** Input/trigger layout classes. */
    control?: Omit<ComponentProps<typeof DatePickerParts.Control>, 'children'>
    /** Input placeholder, ref, classes and native events. */
    input?: Omit<ComponentProps<typeof DatePickerParts.Input>, 'children'>
    /** Open-calendar button props. */
    trigger?: Omit<ComponentProps<typeof DatePickerParts.Trigger>, 'children'>
    /** Floating positioning container; preserve Zag coordinates. */
    positioner?: Omit<ComponentProps<typeof DatePickerParts.Positioner>, 'children'>
    /** Calendar surface props and ref. */
    content?: Omit<ComponentProps<typeof DatePickerParts.Content>, 'children'>
    /** Day-view DOM props; view is fixed by this composition. */
    view?: Omit<ComponentProps<typeof DatePickerParts.View>, 'children' | 'view'>
    /** Month navigation layout props. */
    viewControl?: Omit<ComponentProps<typeof DatePickerParts.ViewControl>, 'children'>
    /** Previous-month button props. */
    prevTrigger?: Omit<ComponentProps<typeof DatePickerParts.PrevTrigger>, 'children'>
    /** Visible month/year label props. */
    rangeText?: Omit<ComponentProps<typeof DatePickerParts.RangeText>, 'children'>
    /** Next-month button props. */
    nextTrigger?: Omit<ComponentProps<typeof DatePickerParts.NextTrigger>, 'children'>
    /** Calendar grid props. */
    table?: Omit<ComponentProps<typeof DatePickerParts.Table>, 'children'>
    /** Weekday header section props. */
    tableHead?: Omit<ComponentProps<typeof DatePickerParts.TableHead>, 'children'>
    /** Props shared by header and week rows. */
    tableRow?: Omit<ComponentProps<typeof DatePickerParts.TableRow>, 'children'>
    /** Props shared by weekday headers. */
    tableHeader?: Omit<ComponentProps<typeof DatePickerParts.TableHeader>, 'children'>
    /** Calendar body props. */
    tableBody?: Omit<ComponentProps<typeof DatePickerParts.TableBody>, 'children'>
    /** Props shared by date cells; the date value is supplied internally. */
    tableCell?: Omit<ComponentProps<typeof DatePickerParts.TableCell>, 'children' | 'value'>
    /** Props shared by selectable day buttons. */
    tableCellTrigger?: Omit<ComponentProps<typeof DatePickerParts.TableCellTrigger>, 'children'>
  }
}

/**
 * Assembled component with attached subcomponents. Customize it freely.
 * Ark anatomy and behavior: https://ark-ui.com/docs/components/date-picker
 * This composition intentionally fixes single selection and day view; use the primitives for ranges or month/year pickers.
 * @example
 * <DatePicker>
 *   {#snippet label()}Appointment{/snippet}
 * </DatePicker>
 * `parts` forwards controlled values and change callbacks. For bind:ref or
 * bind:value/checked/open on individual primitives, use the compound API directly.
 */
export const DatePicker = Object.assign(DatePickerComponent, DatePickerParts)
