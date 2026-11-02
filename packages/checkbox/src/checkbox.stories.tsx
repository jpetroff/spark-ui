import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './react.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
  args: { defaultChecked: false, disabled: false, readOnly: false, invalid: false },
  render: (args) => (
    <Checkbox.Root {...args}>
      <Checkbox.Control>
        <Checkbox.Indicator aria-hidden="true">✓</Checkbox.Indicator>
        <Checkbox.Indicator indeterminate aria-hidden="true">
          −
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
  ),
} satisfies Meta<typeof Checkbox.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Indeterminate: Story = { args: { defaultChecked: 'indeterminate' } }
export const Disabled: Story = { args: { disabled: true } }
export const ReadOnly: Story = { args: { defaultChecked: true, readOnly: true } }
export const Invalid: Story = { args: { invalid: true } }

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
    <Checkbox
      label="Accept terms and conditions"
      parts={{ root: args, control: { title: 'Customizable control' } }}
    />
  ),
}
