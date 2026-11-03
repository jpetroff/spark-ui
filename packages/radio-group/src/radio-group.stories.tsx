import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from './react.tsx'
import { useState } from 'react'
const items = [
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise', disabled: true },
]
const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  args: { label: 'Plan', items, parts: { root: { defaultValue: 'starter' } } },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { parts: { root: { disabled: true, defaultValue: 'starter' } } },
}
export const CustomizedWrapper: Story = {
  args: {
    parts: {
      root: { defaultValue: 'pro', name: 'plan', orientation: 'horizontal' },
      label: { title: 'Choose a plan' },
    },
  },
}
export const Controlled: Story = {
  render: function Controlled(args) {
    const [value, setValue] = useState<string | null>('starter')
    return (
      <RadioGroup
        {...args}
        parts={{ root: { value, onValueChange: (details) => setValue(details.value) } }}
      />
    )
  },
}
