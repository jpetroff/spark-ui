import type { Meta, StoryObj } from '@storybook/react-vite'
import { JsonTreeView } from './react.tsx'

const meta = {
  title: 'Components/JSON Tree View',
  component: JsonTreeView,
  args: {
    label: 'Project configuration',
    data: {
      name: 'Spark UI',
      version: 1,
      enabled: true,
      frameworks: ['React', 'Svelte'],
      theme: { mode: 'light', accent: null },
    },
  },
} satisfies Meta<typeof JsonTreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Expanded: Story = { args: { parts: { root: { defaultExpandedDepth: 3 } } } }
export const CustomizedWrapper: Story = {
  args: {
    parts: { root: { quotesOnKeys: false, maxPreviewItems: 2 }, tree: { style: { fontSize: 13 } } },
  },
}
