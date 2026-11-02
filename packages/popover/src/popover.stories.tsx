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
        <Button.Root variant="outline">Open popover</Button.Root>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Notifications</Popover.Title>
          <Popover.Description>
            You are all caught up. New notifications will appear here.
          </Popover.Description>
          <Popover.CloseTrigger asChild>
            <Button.Root size="sm">Close</Button.Root>
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

export const CustomizedWrapper: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Editable assembled component from the public component index. The parts prop forwards typed props to each nested primitive; change the source to add or remove parts.',
      },
    },
  },
  render: (args) => (
    <Popover
      title="Notifications"
      description="You are all caught up. New notifications will appear here."
      trigger={<Button.Root variant="outline">Open popover</Button.Root>}
      closeLabel={<Button.Root size="sm">Close</Button.Root>}
      parts={{ root: args, trigger: { asChild: true }, closeTrigger: { asChild: true } }}
    />
  ),
}
