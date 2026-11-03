import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './react.tsx'
import { useState } from 'react'
const items = [
  { value: 'overview', label: 'Overview', content: 'Your project at a glance.' },
  { value: 'settings', label: 'Settings', content: 'Manage your project settings.' },
  { value: 'billing', label: 'Billing', content: 'Billing is unavailable.', disabled: true },
]
const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: { label: 'Project settings', items, parts: { root: { defaultValue: 'overview' } } },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Vertical: Story = {
  args: { parts: { root: { defaultValue: 'overview', orientation: 'vertical' } } },
}
export const CustomizedWrapper: Story = {
  args: {
    parts: {
      root: { defaultValue: 'settings', activationMode: 'manual' },
      content: { style: { minHeight: 100 } },
    },
  },
}
export const Controlled: Story = {
  render: function Controlled(args) {
    const [value, setValue] = useState<string | null>('overview')
    return (
      <Tabs
        {...args}
        parts={{ root: { value, onValueChange: (details) => setValue(details.value) } }}
      />
    )
  },
}
