import type { Meta, StoryObj } from '@storybook/react-vite'
import { LocaleProvider, useDateFormatter, useLocaleContext } from './react.tsx'

function LocaleDetails() {
  const { locale, dir } = useLocaleContext()
  const formatter = useDateFormatter({ dateStyle: 'long', timeZone: 'UTC' })

  return (
    <dl dir={dir} lang={locale} className="grid gap-2 rounded-lg border border-border p-4">
      <dt className="font-semibold">Locale</dt>
      <dd>{locale}</dd>
      <dt className="font-semibold">Direction</dt>
      <dd>{dir}</dd>
      <dt className="font-semibold">Formatted date</dt>
      <dd>{formatter.format(new Date('2026-01-15T12:00:00Z'))}</dd>
    </dl>
  )
}

const meta = {
  title: 'Components/Locale',
  component: LocaleProvider,
  args: { locale: 'en-US' },
  argTypes: { locale: { control: 'select', options: ['en-US', 'fi-FI', 'ar-EG'] } },
  render: (args) => (
    <LocaleProvider {...args}>
      <LocaleDetails />
    </LocaleProvider>
  ),
} satisfies Meta<typeof LocaleProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Finnish: Story = { args: { locale: 'fi-FI' } }
export const RightToLeft: Story = { args: { locale: 'ar-EG' } }
