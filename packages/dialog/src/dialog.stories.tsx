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
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
      <Dialog.Positioner className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Content className="grid w-full max-w-sm gap-4 rounded-lg border border-border bg-background p-6 shadow-lg">
          <Dialog.Title className="text-lg font-semibold">Edit profile</Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground">
            Update your profile details, then close this dialog to return to the page.
          </Dialog.Description>
          <Dialog.CloseTrigger asChild>
            <Button>Close</Button>
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
