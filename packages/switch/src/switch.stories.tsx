import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './react.tsx'
import { useState } from 'react'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: { label: 'Email notifications' },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = { args: { parts: { root: { defaultChecked: true } } } }
export const Disabled: Story = {
  args: { parts: { root: { disabled: true, defaultChecked: true } } },
}
export const CustomizedWrapper: Story = {
  args: {
    label: 'Product updates',
    parts: { root: { name: 'updates' }, control: { title: 'Toggle product updates' } },
  },
}
export const Controlled: Story = {
  render: function Controlled(args) {
    const [checked, setChecked] = useState(false)
    return (
      <Switch
        {...args}
        parts={{ root: { checked, onCheckedChange: (details) => setChecked(details.checked) } }}
      />
    )
  },
}
