import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu } from './react.tsx'
import { useState } from 'react'
const items = [
  { value: 'edit', label: 'Edit' },
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'delete', label: 'Delete', disabled: true },
]
const meta = {
  title: 'Components/Menu',
  component: Menu,
  args: { trigger: 'Document actions', items },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = { args: { parts: { root: { defaultOpen: true } } } }
export const CustomizedWrapper: Story = {
  args: {
    parts: {
      root: { positioning: { placement: 'bottom-end' } },
      trigger: { title: 'Actions for this document' },
    },
  },
}
export const Selection: Story = {
  render: function Selection(args) {
    const [selection, setSelection] = useState('None')
    return (
      <div>
        <Menu {...args} parts={{ root: { onSelect: (details) => setSelection(details.value) } }} />
        <p role="status">Last action: {selection}</p>
      </div>
    )
  },
}
