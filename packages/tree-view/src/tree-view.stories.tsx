import type { Meta, StoryObj } from '@storybook/react-vite'
import { TreeView } from './react.tsx'

const nodes = [
  {
    id: 'src',
    name: 'src',
    children: [
      { id: 'app', name: 'app.tsx' },
      { id: 'styles', name: 'styles.css' },
      { id: 'components', name: 'components', children: [{ id: 'button', name: 'button.tsx' }] },
    ],
  },
  { id: 'readme', name: 'README.md' },
]
const meta = {
  title: 'Components/Tree View',
  component: TreeView,
  args: { label: 'Project files', nodes, parts: { root: { defaultExpandedValue: ['src'] } } },
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MultipleSelection: Story = {
  args: {
    parts: {
      root: {
        selectionMode: 'multiple',
        defaultExpandedValue: ['src'],
        defaultSelectedValue: ['app', 'styles'],
      },
    },
  },
}
export const CustomizedWrapper: Story = {
  args: {
    label: 'Source explorer',
    parts: {
      root: { defaultExpandedValue: ['src', 'components'] },
      tree: { style: { minWidth: 280 } },
    },
  },
}
