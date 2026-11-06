import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState, type ReactNode } from 'react'
import { Button } from '@spark/button/react.tsx'
import { Checkbox } from '@spark/checkbox/react.tsx'
import { DatePicker } from '@spark/date-picker/react.tsx'
import { Dialog } from '@spark/dialog/react.tsx'
import { EnvironmentProvider, useEnvironmentContext } from '@spark/environment/react.tsx'
import { Field } from '@spark/field/react.tsx'
import { FloatingPanel } from '@spark/floating-panel/react.tsx'
import { Format } from '@spark/format/react.tsx'
import { Highlight } from '@spark/highlight/react.tsx'
import { HoverCard } from '@spark/hover-card/react.tsx'
import { JsonTreeView } from '@spark/json-tree-view/react.tsx'
import { LocaleProvider, useLocaleContext } from '@spark/locale/react.tsx'
import { Menu } from '@spark/menu/react.tsx'
import { NumberInput } from '@spark/number-input/react.tsx'
import { Popover } from '@spark/popover/react.tsx'
import { Portal } from '@spark/portal/react.tsx'
import { RadioGroup } from '@spark/radio-group/react.tsx'
import { ScrollArea } from '@spark/scroll-area/react.tsx'
import { SegmentGroup } from '@spark/segment-group/react.tsx'
import { Select } from '@spark/select/react.tsx'
import { Swap } from '@spark/swap/react.tsx'
import { Switch } from '@spark/switch/react.tsx'
import { Tabs } from '@spark/tabs/react.tsx'
import { Toast, createToaster } from '@spark/toast/react.tsx'
import { Toggle } from '@spark/toggle/react.tsx'
import { TreeView } from '@spark/tree-view/react.tsx'
import './token-workbench.css'

const densities = [
  { value: 'sm', label: 'Compact', size: 32 },
  { value: 'md', label: 'Default', size: 36 },
  { value: 'lg', label: 'Spacious', size: 44 },
] as const

const layers = [
  { value: '0', label: 'Canvas', step: 900 },
  { value: '1', label: 'Panel', step: 825 },
  { value: '2', label: 'Nested', step: 775 },
  { value: '3', label: 'Floating', step: 725 },
] as const

const statuses = ['info', 'success', 'warning', 'danger'] as const
const menuItems = [
  { value: 'duplicate', label: 'Duplicate' },
  { value: 'rename', label: 'Rename' },
  { value: 'delete', label: 'Delete', disabled: true },
]
const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue', disabled: true },
]
const plans = [
  { value: 'team', label: 'Team' },
  { value: 'solo', label: 'Solo' },
]

type Density = (typeof densities)[number]['value']

function Specimen({ name, children }: { name: string; children: ReactNode }) {
  return <div data-specimen={name}>{children}</div>
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor">
      <path d="M8 3v10M3 8h10" />
    </svg>
  )
}

function EnvironmentValue() {
  const environment = useEnvironmentContext()
  return <span>Root {environment.getRootNode().nodeName}</span>
}

function LocaleValue() {
  const { locale, dir } = useLocaleContext()
  return (
    <span lang={locale} dir={dir}>
      {locale} · {dir}
    </span>
  )
}

function TokenWorkbench() {
  const [density, setDensity] = useState<Density>('md')
  const [swapped, setSwapped] = useState(false)
  const [toaster] = useState(() => createToaster({ placement: 'bottom-end' }))
  const portalMount = useRef<HTMLDivElement>(null)

  return (
    <main className="token-workbench" data-spark-layer="0">
      <div className="token-workbench-layout" data-spark-density={density}>
        <header className="token-workbench-header">
          <div>
            <p className="token-workbench-eyebrow">Spark UI · Foundations</p>
            <h1>Token Workbench</h1>
            <p>Dark surfaces, interaction states, and three shared control sizes.</p>
          </div>
          <SegmentGroup
            label="Density"
            items={densities.map(({ value, label }) => ({ value, label }))}
            parts={{
              root: {
                orientation: 'horizontal',
                value: density,
                onValueChange: ({ value }) => {
                  const preset = densities.find((option) => option.value === value)
                  if (preset) setDensity(preset.value)
                },
              },
            }}
          />
        </header>

        <section className="token-workbench-alignment" aria-label="Density comparison">
          {densities.map(({ value, label, size }) => (
            <div
              className="token-workbench-panel"
              data-spark-layer="1"
              data-spark-density={value}
              key={value}
            >
              <p className="token-workbench-caption">
                {label} <code>{size}px</code>
              </p>
              <div className="token-workbench-comparison">
                <Button.Root variant="outline">
                  <PlusIcon />
                  Add
                </Button.Root>
                <Field.Root>
                  <Field.Input aria-label={label + ' field'} placeholder="Field" />
                </Field.Root>
                <Menu trigger={label + ' menu'} items={menuItems} />
              </div>
            </div>
          ))}
        </section>

        <section className="token-workbench-swatches" aria-label="Surface and feedback tokens">
          {layers.map(({ value, label, step }) => (
            <div key={value} data-spark-layer={value} className="token-workbench-swatch">
              <span>
                {value} · {label}
              </span>
              <code>Stone {step}</code>
            </div>
          ))}
          {statuses.map((status) => (
            <div key={status} className="token-workbench-swatch" data-status={status}>
              <span>{status}</span>
              <code>{status} 750</code>
            </div>
          ))}
        </section>

        <div className="token-workbench-grid">
          <section className="token-workbench-panel" data-spark-layer="1">
            <h2>Controls</h2>
            <div className="token-workbench-stack">
              <Specimen name="Button">
                <div className="token-workbench-row">
                  <Button.Root>
                    <PlusIcon /> Create
                  </Button.Root>
                  <Button.Root variant="secondary">Duplicate</Button.Root>
                  <Button.Root variant="outline" disabled>
                    Archive
                  </Button.Root>
                  <Button.Root variant="ghost" size="icon" aria-label="Add item">
                    <PlusIcon />
                  </Button.Root>
                </div>
              </Specimen>
              <div className="token-workbench-row">
                <Specimen name="Checkbox">
                  <Checkbox label="Include files" parts={{ root: { defaultChecked: true } }} />
                </Specimen>
                <Specimen name="Switch">
                  <Switch label="Publish" parts={{ root: { defaultChecked: true } }} />
                </Specimen>
              </div>
              <Specimen name="Radio Group">
                <RadioGroup
                  label="Plan"
                  items={plans}
                  parts={{ root: { orientation: 'horizontal', defaultValue: 'team' } }}
                />
              </Specimen>
              <Specimen name="Segment Group">
                <SegmentGroup
                  label="View"
                  items={[
                    { value: 'grid', label: 'Grid' },
                    { value: 'list', label: 'List' },
                  ]}
                  parts={{ root: { orientation: 'horizontal', defaultValue: 'grid' } }}
                />
              </Specimen>
              <Specimen name="Toggle">
                <Toggle parts={{ root: { defaultPressed: true } }}>Pin</Toggle>
              </Specimen>
              <Specimen name="Swap">
                <Button.Root
                  variant="outline"
                  aria-pressed={swapped}
                  onClick={() => setSwapped(!swapped)}
                >
                  <Swap off="Unsaved" on="Saved" parts={{ root: { swap: swapped } }} />
                </Button.Root>
              </Specimen>
            </div>
          </section>

          <section className="token-workbench-panel" data-spark-layer="1">
            <h2>Forms</h2>
            <div className="token-workbench-stack">
              <Specimen name="Field">
                <Field
                  label="Email"
                  errorText="Enter a valid email address."
                  parts={{
                    root: { invalid: true },
                    input: { type: 'email', defaultValue: 'alex@' },
                  }}
                />
              </Specimen>
              <Specimen name="Number Input">
                <NumberInput
                  label="Quantity"
                  parts={{ root: { defaultValue: '3', min: 0, max: 10 } }}
                />
              </Specimen>
              <Specimen name="Date Picker">
                <DatePicker label="Due date" parts={{ trigger: { 'aria-label': 'Choose date' } }} />
              </Specimen>
              <Specimen name="Select">
                <Select
                  label="Framework"
                  items={frameworks}
                  parts={{ root: { defaultValue: ['react'] } }}
                />
              </Specimen>
              <Specimen name="Fieldset">
                <fieldset className="spark-fieldset-root" data-spark-layer="2">
                  <legend className="spark-fieldset-legend">Delivery</legend>
                  <p className="spark-fieldset-helper-text">Summary preference</p>
                  <Checkbox label="Send weekly digest" />
                </fieldset>
              </Specimen>
            </div>
          </section>

          <section className="token-workbench-panel" data-spark-layer="1">
            <h2>Overlays</h2>
            <div className="token-workbench-stack">
              <div className="token-workbench-row">
                <Specimen name="Menu">
                  <Menu trigger="Actions" items={menuItems} />
                </Specimen>
                <Specimen name="Dialog">
                  <Dialog
                    trigger="Dialog"
                    title="Project settings"
                    description="Open the menu to inspect an overlay inside a dialog."
                  >
                    <Menu trigger="Dialog actions" items={menuItems} />
                  </Dialog>
                </Specimen>
                <Specimen name="Popover">
                  <Popover
                    trigger="Popover"
                    title="Notifications"
                    description="You're all caught up."
                  />
                </Specimen>
              </div>
              <div className="token-workbench-row">
                <Specimen name="Hover Card">
                  <HoverCard trigger="Hover card">Supplementary project information.</HoverCard>
                </Specimen>
                <Specimen name="Floating Panel">
                  <FloatingPanel trigger="Floating panel" title="Project notes">
                    Drag the header or resize the panel.
                  </FloatingPanel>
                </Specimen>
                <Specimen name="Toast">
                  <Button.Root
                    variant="outline"
                    onClick={() => toaster.create({ title: 'Changes saved', type: 'success' })}
                  >
                    Toast
                  </Button.Root>
                  <Toast toaster={toaster} />
                </Specimen>
              </div>
              <Specimen name="Portal">
                <div
                  className="token-workbench-portal"
                  data-spark-layer="2"
                  data-spark-density={density}
                  ref={portalMount}
                />
                <Portal container={portalMount}>
                  <Button.Root variant="ghost">Portalled button</Button.Root>
                </Portal>
              </Specimen>
            </div>
          </section>

          <section className="token-workbench-panel" data-spark-layer="1">
            <h2>Content</h2>
            <div className="token-workbench-stack">
              <Specimen name="Tabs">
                <Tabs
                  label="Project details"
                  items={[
                    { value: 'overview', label: 'Overview', content: 'Project activity' },
                    { value: 'history', label: 'History', content: 'Change history' },
                  ]}
                  parts={{ root: { defaultValue: 'overview' } }}
                />
              </Specimen>
              <Specimen name="Scroll Area">
                <ScrollArea
                  parts={{
                    root: { className: 'token-workbench-scroll' },
                    viewport: { role: 'region', 'aria-label': 'Release notes' },
                  }}
                >
                  <p>Release 1 · Shared sizing</p>
                  <p>Release 2 · Semantic colors</p>
                  <p>Release 3 · Surface layers</p>
                </ScrollArea>
              </Specimen>
              <div className="token-workbench-trees" data-spark-layer="2">
                <Specimen name="Tree View">
                  <TreeView
                    label="Files"
                    nodes={[
                      { id: 'src', name: 'src', children: [{ id: 'styles', name: 'styles.css' }] },
                    ]}
                  />
                </Specimen>
                <Specimen name="JSON Tree View">
                  <JsonTreeView
                    label="Configuration"
                    data={{ ready: true }}
                    parts={{ root: { defaultExpandedDepth: 1, maxPreviewItems: 0 } }}
                  />
                </Specimen>
              </div>
              <div className="token-workbench-details">
                <Specimen name="Format">
                  <Format value={1280} style="currency" currency="EUR" />
                </Specimen>
                <Specimen name="Highlight">
                  <Highlight text="Search match" query="match" className="token-workbench-mark" />
                </Specimen>
                <Specimen name="Locale">
                  <LocaleProvider locale="fi-FI">
                    <LocaleValue />
                  </LocaleProvider>
                </Specimen>
                <Specimen name="Environment">
                  <EnvironmentProvider>
                    <EnvironmentValue />
                  </EnvironmentProvider>
                </Specimen>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

const meta = {
  title: 'Design System/Token Workbench',
  parameters: { layout: 'fullscreen' },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>
export const Overview: Story = { render: () => <TokenWorkbench /> }
