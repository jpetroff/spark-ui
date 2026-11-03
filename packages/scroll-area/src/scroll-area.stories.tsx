import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from './react.tsx'

const content = (
  <div>
    {Array.from({ length: 20 }, (_, index) => (
      <p key={index}>Release note {index + 1}: Improvements to Spark UI components.</p>
    ))}
  </div>
)
const meta = {
  title: 'Components/Scroll Area',
  component: ScrollArea,
  args: { children: content, parts: { root: { style: { width: 320, height: 240 } } } },
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BothAxes: Story = { args: { children: <div style={{ width: 640 }}>{content}</div> } }
export const CustomizedWrapper: Story = {
  args: {
    parts: { root: { style: { width: 280, height: 160 } }, content: { style: { padding: 24 } } },
  },
}
