import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { EnvironmentProvider, useEnvironmentContext } from './react.tsx'

function EnvironmentDetails() {
  const environment = useEnvironmentContext()
  const [details, setDetails] = useState({ root: '', document: '', window: '' })

  useEffect(() => {
    setDetails({
      root: environment.getRootNode().nodeName,
      document: environment.getDocument().title,
      window: environment.getWindow().location.pathname,
    })
  }, [environment])

  return (
    <dl className="grid gap-2 rounded-lg border border-border p-4">
      <dt className="font-semibold">Root node</dt>
      <dd>{details.root}</dd>
      <dt className="font-semibold">Document title</dt>
      <dd>{details.document}</dd>
      <dt className="font-semibold">Window path</dt>
      <dd>{details.window}</dd>
    </dl>
  )
}

const meta = {
  title: 'Components/Environment',
  component: EnvironmentProvider,
  render: (args) => (
    <EnvironmentProvider {...args}>
      <EnvironmentDetails />
    </EnvironmentProvider>
  ),
} satisfies Meta<typeof EnvironmentProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ExplicitDocument: Story = { args: { value: () => document } }
