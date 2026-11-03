import type { Meta, StoryObj } from '@storybook/react-vite'
import { Swap } from './react.tsx'
import { useState } from 'react'
import { Button } from '@spark/button/react.tsx'

const meta = {
  title: 'Components/Swap',
  component: Swap,
  args: { on: 'Saved', off: 'Unsaved' },
  parameters: {
    docs: {
      description: {
        component:
          'A display primitive that swaps between two pieces of content. Wrap it in a button when it should be interactive.',
      },
    },
  },
} satisfies Meta<typeof Swap>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const On: Story = { args: { parts: { root: { swap: true } } } }
export const CustomizedWrapper: Story = {
  args: {
    on: 'Light theme',
    off: 'Dark theme',
    parts: { root: { swap: true }, onIndicator: { title: 'Active theme' } },
  },
}
export const Interactive: Story = {
  render: function Interactive(args) {
    const [saved, setSaved] = useState(false)
    return (
      <Button
        parts={{ button: { onClick: () => setSaved((value) => !value), 'aria-pressed': saved } }}
      >
        <Swap {...args} parts={{ root: { swap: saved } }} />
      </Button>
    )
  },
}
