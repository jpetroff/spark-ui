import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@spark/button/react.tsx'
import { Popover } from './react.tsx'

const meta = {
  title: 'Components/Popover',
  component: Popover.Root,
  args: { modal: false, closeOnEscape: true, closeOnInteractOutside: true },
  render: (args) => (
    <Popover.Root {...args}>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className="grid w-72 gap-3 rounded-lg border border-border bg-background p-4 shadow-lg">
          <Popover.Title className="font-semibold">Notifications</Popover.Title>
          <Popover.Description className="text-sm text-muted-foreground">
            You are all caught up. New notifications will appear here.
          </Popover.Description>
          <Popover.CloseTrigger asChild>
            <Button size="sm">Close</Button>
          </Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  ),
} satisfies Meta<typeof Popover.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const InitiallyOpen: Story = { args: { defaultOpen: true } }
export const Modal: Story = { args: { modal: true } }
export const Top: Story = { args: { positioning: { placement: 'top' } } }
