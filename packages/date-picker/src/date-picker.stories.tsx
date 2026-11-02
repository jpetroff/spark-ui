import type { Meta, StoryObj } from '@storybook/react-vite'
import { DatePicker } from './react.tsx'

const meta = {
  title: 'Components/Date Picker',
  component: DatePicker,
  args: { label: 'Appointment' },
  parameters: {
    docs: {
      description: {
        component:
          'An editable single-date, day-calendar composition. Its public index documents every nested part prop. Use the compound DatePicker API for ranges or month/year views.',
      },
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { parts: { root: { disabled: true } } } }
export const CustomizedWrapper: Story = {
  args: {
    parts: { root: { name: 'appointment' }, input: { placeholder: 'Select an appointment' } },
  },
}
