import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './react.tsx'
import { useState } from 'react'
const items = [
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue', disabled: true },
]
const meta = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Framework', items },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = { args: { parts: { root: { defaultValue: ['react'] } } } }
export const Disabled: Story = { args: { parts: { root: { disabled: true } } } }
export const Multiple: Story = {
  args: { parts: { root: { multiple: true, defaultValue: ['react', 'svelte'] } } },
}
export const CustomizedWrapper: Story = {
  args: {
    placeholder: 'Choose your framework',
    parts: {
      root: { name: 'framework', positioning: { placement: 'bottom-end' } },
      trigger: { title: 'Choose a framework' },
    },
  },
}
export const Controlled: Story = {
  render: function Controlled(args) {
    const [value, setValue] = useState<string[]>([])
    return (
      <Select
        {...args}
        parts={{ root: { value, onValueChange: (details) => setValue(details.value) } }}
      />
    )
  },
}
