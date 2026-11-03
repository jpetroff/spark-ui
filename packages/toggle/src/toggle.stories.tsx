import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from './react.tsx'
import { useState } from 'react'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  args: { children: 'Bold' },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pressed: Story = { args: { parts: { root: { defaultPressed: true } } } }
export const Disabled: Story = { args: { parts: { root: { disabled: true } } } }
export const CustomizedWrapper: Story = {
  args: {
    children: 'Italic',
    parts: { root: { 'aria-label': 'Italic text', title: 'Toggle italic formatting' } },
  },
}
export const Controlled: Story = {
  render: function Controlled(args) {
    const [pressed, setPressed] = useState(false)
    return <Toggle {...args} parts={{ root: { pressed, onPressedChange: setPressed } }} />
  },
}
