import type { Meta, StoryObj } from '@storybook/react-vite'
import { Field } from './react.tsx'

const meta = {
  title: 'Components/Field',
  component: Field.Root,
  args: { disabled: false, invalid: false, readOnly: false, required: false },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>
        Email <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input type="email" placeholder="you@example.com" />
      <Field.HelperText>Enter your email address.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
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
    <Field.Root {...args}>
      <Field.Label>Message</Field.Label>
      <Field.Textarea placeholder="Write a message…" />
      <Field.HelperText>Tell us how we can help.</Field.HelperText>
    </Field.Root>
  ),
}
export const Select: Story = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label>Country</Field.Label>
      <Field.Select defaultValue="">
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

export const CustomizedWrapper: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Editable assembled component from the public component index. The parts prop forwards typed props to each nested primitive; change the source to add or remove parts.',
      },
    },
  },
  render: (args) => (
    <Field
      label="Email"
      helperText="Enter your email address."
      errorText="Enter a valid email address."
      parts={{ root: args, input: { type: 'email', placeholder: 'you@example.com' } }}
    />
  ),
}
