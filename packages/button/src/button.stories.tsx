import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@spark-ui/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
export const Disabled: Story = { args: { disabled: true } }
export const Icon: Story = { args: { size: 'icon', children: '+', 'aria-label': 'Add item' } }
