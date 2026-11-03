import type { Meta, StoryObj } from '@storybook/react-vite'
import { FloatingPanel } from './react.tsx'

const meta = {
  title: 'Components/Floating Panel',
  component: FloatingPanel,
  args: {
    title: 'Project notes',
    trigger: 'Open notes',
    children: 'Drag the header to move this panel. Resize it from the bottom-right corner.',
  },
} satisfies Meta<typeof FloatingPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = {
  args: { parts: { root: { defaultOpen: true, defaultPosition: { x: 32, y: 32 } } } },
}
export const CustomizedWrapper: Story = {
  args: {
    title: 'Inspector',
    parts: {
      root: { defaultSize: { width: 360, height: 240 }, defaultPosition: { x: 48, y: 48 } },
      body: { style: { lineHeight: 1.8 } },
    },
  },
}
