import type { Meta, StoryObj } from '@storybook/react-vite'
import { NumberInput } from './react.tsx'
import { useState } from 'react'

const meta = {
  title: 'Components/Number Input',
  component: NumberInput,
  args: { label: 'Quantity', parts: { root: { defaultValue: '3', min: 0, max: 10 } } },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = { args: { parts: { root: { defaultValue: '3', disabled: true } } } }
export const ReadOnly: Story = { args: { parts: { root: { defaultValue: '3', readOnly: true } } } }
export const CustomizedWrapper: Story = {
  args: {
    label: 'Price',
    parts: {
      root: {
        defaultValue: '19.5',
        step: 0.5,
        min: 0,
        formatOptions: { style: 'currency', currency: 'EUR' },
      },
      input: { name: 'price' },
    },
  },
}
export const Controlled: Story = {
  render: function Controlled(args) {
    const [value, setValue] = useState('2')
    return (
      <NumberInput
        {...args}
        parts={{
          root: { value, min: 0, max: 10, onValueChange: (details) => setValue(details.value) },
        }}
      />
    )
  },
}
