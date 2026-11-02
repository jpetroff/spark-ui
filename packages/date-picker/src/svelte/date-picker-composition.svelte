<!-- Editable composition. See the public component index for its documented prop API and usage. -->
<script lang="ts">
  import type { DatePickerProps } from '../svelte.ts'
  import { DatePicker } from './ark/index.ts'

  let { label, parts = {} }: DatePickerProps = $props()
</script>

<DatePicker.Root {...parts.root} selectionMode="single" minView="day" maxView="day" view="day">
  <DatePicker.Label {...parts.label}>{@render label()}</DatePicker.Label>
  <DatePicker.Control {...parts.control}>
    <DatePicker.Input {...parts.input} />
    <DatePicker.Trigger {...parts.trigger}>Choose date</DatePicker.Trigger>
  </DatePicker.Control>
  <DatePicker.Positioner {...parts.positioner}>
    <DatePicker.Content {...parts.content}>
      <DatePicker.View {...parts.view} view="day">
        <DatePicker.ViewControl {...parts.viewControl}>
          <DatePicker.PrevTrigger {...parts.prevTrigger}>Previous month</DatePicker.PrevTrigger>
          <DatePicker.RangeText {...parts.rangeText} />
          <DatePicker.NextTrigger {...parts.nextTrigger}>Next month</DatePicker.NextTrigger>
        </DatePicker.ViewControl>
        <DatePicker.Context>
          {#snippet render(context)}
            {@const api = context()}
            <DatePicker.Table {...parts.table}>
              <DatePicker.TableHead {...parts.tableHead}>
                <DatePicker.TableRow {...parts.tableRow}>
                  {#each api.weekDays as day}
                    <DatePicker.TableHeader {...parts.tableHeader}>{day.short}</DatePicker.TableHeader>
                  {/each}
                </DatePicker.TableRow>
              </DatePicker.TableHead>
              <DatePicker.TableBody {...parts.tableBody}>
                {#each api.weeks as week}
                  <DatePicker.TableRow {...parts.tableRow}>
                    {#each week as day}
                      <DatePicker.TableCell {...parts.tableCell} value={day}>
                        <DatePicker.TableCellTrigger {...parts.tableCellTrigger}>
                          {day.day}
                        </DatePicker.TableCellTrigger>
                      </DatePicker.TableCell>
                    {/each}
                  </DatePicker.TableRow>
                {/each}
              </DatePicker.TableBody>
            </DatePicker.Table>
          {/snippet}
        </DatePicker.Context>
      </DatePicker.View>
    </DatePicker.Content>
  </DatePicker.Positioner>
</DatePicker.Root>
