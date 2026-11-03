import type { Meta, StoryObj } from '@storybook/react-vite'
import { Highlight } from './react.tsx'

const meta = {
  title: 'Components/Highlight',
  component: Highlight,
  args: { text: 'Components you own. Build with Spark UI.', query: 'own' },
} satisfies Meta<typeof Highlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleTerms: Story = { args: { query: ['Components', 'Spark'] } }
export const CaseSensitive: Story = {
  args: { text: 'Spark and spark', query: 'Spark', ignoreCase: false },
}
export const CustomizedWrapper: Story = {
  args: {
    style: {
      background: 'var(--spark-warning-surface)',
      color: 'var(--spark-warning-text)',
      paddingInline: 2,
      borderRadius: 3,
    },
  },
}
