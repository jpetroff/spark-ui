import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './react.tsx'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
  args: { defaultChecked: false, disabled: false, readOnly: false, invalid: false },
  render: (args) => (
    <Checkbox.Root {...args} className="flex items-center gap-2 data-disabled:opacity-50">
      <Checkbox.Control className="flex size-5 items-center justify-center rounded border border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">
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
