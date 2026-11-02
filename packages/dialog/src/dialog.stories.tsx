import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@spark/button/react.tsx'
import { Dialog } from './react.tsx'

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  args: { modal: true, closeOnEscape: true, closeOnInteractOutside: true },
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button.Root>Open dialog</Button.Root>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Update your profile details, then close this dialog to return to the page.
          </Dialog.Description>
          <Dialog.CloseTrigger asChild>
            <Button.Root>Close</Button.Root>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  ),
} satisfies Meta<typeof Dialog.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const InitiallyOpen: Story = { args: { defaultOpen: true } }
export const NonModal: Story = { args: { modal: false } }

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
    <Dialog
      title="Edit profile"
      description="Update your profile details."
      trigger={<Button.Root>Open dialog</Button.Root>}
      parts={{ root: args, trigger: { asChild: true } }}
    />
  ),
}
