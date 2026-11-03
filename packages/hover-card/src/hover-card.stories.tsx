import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard } from './react.tsx'

const meta = {
  title: 'Components/Hover Card',
  component: HoverCard,
  args: {
    trigger: 'About Spark UI',
    children: 'Components you own. Copy the source and make it yours.',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Supplementary information revealed on hover. Essential content should also be available outside the card.',
      },
    },
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Open: Story = { args: { parts: { root: { defaultOpen: true } } } }
export const CustomizedWrapper: Story = {
  args: {
    trigger: 'Spark UI details',
    parts: {
      root: { openDelay: 150, positioning: { placement: 'top' } },
      trigger: { title: 'Learn about Spark UI' },
      content: { style: { maxWidth: 240 } },
    },
  },
}
