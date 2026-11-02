import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './react.tsx'

const meta = {
  title: 'Components/Button',
  component: Button.Root,
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'outline', 'ghost'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button.Root>

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

export const CustomizedWrapper: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Editable assembled component from the public component index. The parts prop forwards typed props to each nested primitive; change the source to add or remove parts.',
      },
    },
  },
  render: () => (
    <Button parts={{ button: { variant: 'outline', size: 'lg' } }}>Save changes</Button>
  ),
}
