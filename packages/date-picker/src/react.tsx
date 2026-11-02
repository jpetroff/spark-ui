'use client'

import './styles.css'

// Optional sample design system; uncomment and edit recipe.css to adopt it.
// import './recipe.css'

import type { ComponentProps, ReactNode } from 'react'
import { DatePicker as DatePickerParts } from './react/ark/index.ts'
export * from './react/ark/index.ts'

/**
 * Editable assembled DatePicker component. Customize its markup and props for your application.
 * DatePicker.Root and the other subcomponents remain available for custom compositions.
 * Add application classes through `parts` (className in React, class in Svelte).
 * Tailwind users can put utility strings in those same class props after configuring
 * Tailwind in their application; this component does not require it.
 * For ordinary CSS, uncomment recipe.css and edit its stable .spark-* selectors.
 */
export interface DatePickerProps {
  /** Associated input label. */
  label: ReactNode
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
 * <DatePicker label="Appointment" parts={{ root: { name: "appointment", closeOnSelect: true } }} />
 */
export const DatePicker = Object.assign(function DatePicker({
  label,
  parts = {},
}: DatePickerProps) {
  return (
    <DatePickerParts.Root
      {...parts.root}
      selectionMode="single"
      minView="day"
      maxView="day"
      view="day"
    >
      <DatePickerParts.Label {...parts.label}>{label}</DatePickerParts.Label>
      <DatePickerParts.Control {...parts.control}>
        <DatePickerParts.Input {...parts.input} />
        <DatePickerParts.Trigger {...parts.trigger}>Choose date</DatePickerParts.Trigger>
      </DatePickerParts.Control>
      <DatePickerParts.Positioner {...parts.positioner}>
        <DatePickerParts.Content {...parts.content}>
          <DatePickerParts.View {...parts.view} view="day">
            <DatePickerParts.ViewControl {...parts.viewControl}>
              <DatePickerParts.PrevTrigger {...parts.prevTrigger}>
                Previous month
              </DatePickerParts.PrevTrigger>
              <DatePickerParts.RangeText {...parts.rangeText} />
              <DatePickerParts.NextTrigger {...parts.nextTrigger}>
                Next month
              </DatePickerParts.NextTrigger>
            </DatePickerParts.ViewControl>
            <DatePickerParts.Context>
              {(api) => (
                <DatePickerParts.Table {...parts.table}>
                  <DatePickerParts.TableHead {...parts.tableHead}>
                    <DatePickerParts.TableRow {...parts.tableRow}>
                      {api.weekDays.map((day, index) => (
                        <DatePickerParts.TableHeader key={index} {...parts.tableHeader}>
                          {day.short}
                        </DatePickerParts.TableHeader>
                      ))}
                    </DatePickerParts.TableRow>
                  </DatePickerParts.TableHead>
                  <DatePickerParts.TableBody {...parts.tableBody}>
                    {api.weeks.map((week, index) => (
                      <DatePickerParts.TableRow key={index} {...parts.tableRow}>
                        {week.map((day) => (
                          <DatePickerParts.TableCell
                            key={day.toString()}
                            {...parts.tableCell}
                            value={day}
                          >
                            <DatePickerParts.TableCellTrigger {...parts.tableCellTrigger}>
                              {day.day}
                            </DatePickerParts.TableCellTrigger>
                          </DatePickerParts.TableCell>
                        ))}
                      </DatePickerParts.TableRow>
                    ))}
                  </DatePickerParts.TableBody>
                </DatePickerParts.Table>
              )}
            </DatePickerParts.Context>
          </DatePickerParts.View>
        </DatePickerParts.Content>
      </DatePickerParts.Positioner>
    </DatePickerParts.Root>
  )
}, DatePickerParts)