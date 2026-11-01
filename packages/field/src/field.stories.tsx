import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from './react.tsx'

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  args: { disabled: false, invalid: false, readOnly: false, required: false },
  render: (args) => (
    <Field.Root {...args} className="grid w-72 gap-2">
      <Field.Label>
        Email <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input
        type="email"
        placeholder="you@example.com"
        className="rounded-md border border-input px-3 py-2 disabled:opacity-50"
      />
      <Field.HelperText className="text-sm text-muted-foreground">
        Enter your email address.
      </Field.HelperText>
      <Field.ErrorText className="text-sm">Enter a valid email address.</Field.ErrorText>
    </Field.Root>
  ),
} satisfies Meta<typeof Field.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Required: Story = { args: { required: true } }
export const Invalid: Story = { args: { invalid: true } }
export const Disabled: Story = { args: { disabled: true } }
export const ReadOnly: Story = { args: { readOnly: true } }
export const Textarea: Story = {
  render: (args) => (
    <Field.Root {...args} className="grid w-72 gap-2">
      <Field.Label>Message</Field.Label>
      <Field.Textarea
        placeholder="Write a message…"
        className="rounded-md border border-input px-3 py-2"
      />
      <Field.HelperText className="text-sm text-muted-foreground">
        Tell us how we can help.
      </Field.HelperText>
    </Field.Root>
  ),
}
export const Select: Story = {
  render: (args) => (
    <Field.Root {...args} className="grid w-72 gap-2">
      <Field.Label>Country</Field.Label>
      <Field.Select defaultValue="" className="rounded-md border border-input px-3 py-2">
        <option value="" disabled>
          Select a country
        </option>
        <option value="fi">Finland</option>
        <option value="gb">United Kingdom</option>
        <option value="us">United States</option>
      </Field.Select>
    </Field.Root>
  ),
}
