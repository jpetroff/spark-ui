import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './react.tsx'
import { useState } from 'react'
import { Button } from '@spark/button/react.tsx'
import { createToaster, type ToastPlacement, type ToastType } from './react.tsx'
function ToastDemo({
  type = 'success',
  placement = 'bottom-end',
}: {
  type?: ToastType
  placement?: ToastPlacement
}) {
  const [toaster] = useState(() => createToaster({ placement, overlap: true, gap: 16 }))
  return (
    <div>
      <Button
        parts={{
          button: {
            onClick: () =>
              toaster.create({
                title: type === 'error' ? 'Could not save' : 'Changes saved',
                description: type === 'error' ? 'Please try again.' : 'Your project is up to date.',
                type,
              }),
          },
        }}
      >
        Show notification
      </Button>
      <Toast toaster={toaster} parts={{ toaster: { label: 'Project notifications' } }} />
    </div>
  )
}
const meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          'Create a stable toaster store, render the Toast sample once, then call toaster.create() to show notifications.',
      },
    },
  },
  render: (args) => <ToastDemo key={args.placement} {...args} />,
} satisfies Meta<typeof ToastDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Error: Story = { args: { type: 'error' } }
export const CustomizedWrapper: Story = { args: { placement: 'top-end' } }
