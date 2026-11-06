import type { Meta, StoryObj } from '@storybook/react-vite'
import { Portal } from './react.tsx'
import { useRef } from 'react'

const meta = {
  title: 'Components/Portal',
  component: Portal,
  args: { children: <p>Rendered outside the story root in the document body.</p> },
} satisfies Meta<typeof Portal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inline: Story = {
  args: { disabled: true, children: <p>Rendered inline because the portal is disabled.</p> },
}
export const CustomContainer: Story = {
  render: function CustomContainer(args) {
    const container = useRef<HTMLDivElement>(null)
    return (
      <div>
        <p>The portal mounts its content in the outlined target below.</p>
        <div
          ref={container}
          style={{
            minHeight: 80,
            padding: 'var(--space-panel-inset)',
            border: 'var(--size-border) dashed var(--color-border-control)',
          }}
        />
        <Portal {...args} container={container}>
          <p>Inside the custom container.</p>
        </Portal>
      </div>
    )
  },
}
