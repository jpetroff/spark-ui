import type { Meta, StoryObj } from '@storybook/react-vite'
import { Format } from './react.tsx'
import { LocaleProvider } from '@spark/locale/react.tsx'

const meta = {
  title: 'Components/Format',
  component: Format,
  args: { value: 1234.56 },
  parameters: {
    docs: {
      description: {
        component:
          'The callable Format sample formats a number. Attached Byte, Time and RelativeTime formatters share the locale provider.',
      },
    },
  },
} satisfies Meta<typeof Format>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Currency: Story = { args: { style: 'currency', currency: 'EUR' } }
export const Percent: Story = { args: { value: 0.875, style: 'percent', maximumFractionDigits: 1 } }
export const Bytes: Story = { render: () => <Format.Byte value={1048576} unitSystem="binary" /> }
export const Time: Story = { render: () => <Format.Time value="14:30" /> }
export const RelativeTime: Story = {
  render: () => <Format.RelativeTime value={new Date(Date.now() - 86400000)} />,
}
export const Localized: Story = {
  render: (args) => (
    <LocaleProvider locale="de-DE">
      <Format {...args} style="currency" currency="EUR" />
    </LocaleProvider>
  ),
}
