import { useRef, useState } from 'react'
import { Button } from '@spark/button/react.tsx'
import { Checkbox } from '@spark/checkbox/react.tsx'
import { DatePicker } from '@spark/date-picker/react.tsx'
import { Dialog } from '@spark/dialog/react.tsx'
import { EnvironmentProvider } from '@spark/environment/react.tsx'
import { Field } from '@spark/field/react.tsx'
import { FloatingPanel } from '@spark/floating-panel/react.tsx'
import { Format } from '@spark/format/react.tsx'
import { Highlight } from '@spark/highlight/react.tsx'
import { HoverCard } from '@spark/hover-card/react.tsx'
import { JsonTreeView } from '@spark/json-tree-view/react.tsx'
import { LocaleProvider } from '@spark/locale/react.tsx'
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
import { useStructureOutlines } from './use-structure-outlines'

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue', disabled: true },
]
const plans = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
]
const files = [
  {
    id: 'src',
    name: 'src',
    children: [
      { id: 'app', name: 'app.tsx' },
      { id: 'styles', name: 'styles.css' },
      {
        id: 'components',
        name: 'components',
        children: frameworks.map(({ value }) => ({ id: value, name: `${value}.tsx` })),
      },
    ],
  },
  ...Array.from({ length: 12 }, (_, index) => ({
    id: `sample-${index}`,
    name: `sample-${index + 1}.tsx`,
  })),
]

function NotificationSample() {
  const [toaster] = useState(() => createToaster({ placement: 'bottom-end' }))
  return (
    <>
      <Button
        parts={{
          button: {
            onClick: () =>
              toaster.create({
                title: 'Changes saved',
                description: 'Your project is up to date.',
                type: 'success',
              }),
          },
        }}
      >
        Show notification
      </Button>
      <Toast toaster={toaster} parts={{ toaster: { label: 'Canvas notifications' } }} />
    </>
  )
}

function SwapSample() {
  const [saved, setSaved] = useState(false)
  return (
    <Button
      parts={{
        button: {
          variant: 'outline',
          onClick: () => setSaved((value) => !value),
          'aria-pressed': saved,
        },
      }}
    >
      <Swap on="Saved" off="Save changes" parts={{ root: { swap: saved } }} />
    </Button>
  )
}

function PortalSample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <>
      <div ref={container} />
      <Portal container={container}>
        <Button parts={{ button: { variant: 'secondary' } }}>Portaled button</Button>
      </Portal>
    </>
  )
}

export function App() {
  const [outlines, setOutlines] = useState(false)
  useStructureOutlines(outlines)

  return (
    <EnvironmentProvider>
      <LocaleProvider locale="en-GB">
        <Button
          parts={{
            button: {
              className: 'canvas-outline-toggle',
              variant: 'outline',
              size: 'sm',
              'aria-pressed': outlines,
              onClick: () => setOutlines((value) => !value),
            },
          }}
        >
          Outline structure
        </Button>
        <main className="canvas" aria-label="Component canvas">
          <div className="canvas-sample canvas-row">
            <Button>Save</Button>
            <Button parts={{ button: { variant: 'secondary' } }}>Cancel</Button>
            <Button parts={{ button: { variant: 'outline' } }}>Preview</Button>
            <Button parts={{ button: { variant: 'ghost' } }}>More</Button>
          </div>
          <div className="canvas-sample canvas-stack">
            <Field
              label="Email"
              parts={{ input: { type: 'email', placeholder: 'you@example.com' } }}
            />
            <Checkbox label="Accept terms" />
            <Switch label="Email notifications" />
          </div>
          <div className="canvas-sample canvas-sample--small">
            <RadioGroup label="Plan" items={plans} parts={{ root: { defaultValue: 'free' } }} />
          </div>
          <div className="canvas-sample canvas-stack">
            <Select label="Framework" items={frameworks} />
            <NumberInput
              label="Quantity"
              parts={{ root: { defaultValue: '3', min: 0, max: 10 } }}
            />
            <DatePicker label="Appointment" />
          </div>
          <div className="canvas-sample canvas-sample--small canvas-stack">
            <SegmentGroup
              label="Billing"
              items={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly', label: 'Yearly' },
              ]}
              parts={{ root: { defaultValue: 'monthly' } }}
            />
            <div className="canvas-row">
              <Toggle>Bold</Toggle>
              <SwapSample />
            </div>
          </div>
          <div className="canvas-sample canvas-sample--wide">
            <Tabs
              label="Account settings"
              parts={{ root: { defaultValue: 'profile' } }}
              items={[
                {
                  value: 'profile',
                  label: 'Profile',
                  content: (
                    <form className="canvas-stack" onSubmit={(event) => event.preventDefault()}>
                      <Field
                        label="Display name"
                        parts={{ input: { defaultValue: 'Alex Morgan' } }}
                      />
                      <Select
                        label="Preferred framework"
                        items={frameworks}
                        parts={{ root: { defaultValue: ['react'] } }}
                      />
                      <Checkbox label="Share profile" parts={{ root: { defaultChecked: true } }} />
                      <div>
                        <Button parts={{ button: { type: 'submit' } }}>Update profile</Button>
                      </div>
                    </form>
                  ),
                },
                {
                  value: 'preferences',
                  label: 'Preferences',
                  content: <Switch label="Product updates" />,
                },
              ]}
            />
          </div>
          <div className="canvas-sample canvas-row">
            <Dialog title="Edit project" trigger="Edit project">
              <form className="canvas-stack" onSubmit={(event) => event.preventDefault()}>
                <Field label="Project name" parts={{ input: { defaultValue: 'Spark UI' } }} />
                <div className="canvas-row">
                  <Button parts={{ button: { type: 'submit' } }}>Save project</Button>
                  <Button parts={{ button: { type: 'reset', variant: 'secondary' } }}>Reset</Button>
                </div>
              </form>
            </Dialog>
            <Popover title="Notifications" trigger="Notification preferences">
              <Switch label="Desktop notifications" />
            </Popover>
            <Menu
              trigger="Project actions"
              items={[
                { value: 'edit', label: 'Edit' },
                { value: 'duplicate', label: 'Duplicate' },
                { value: 'archive', label: 'Archive', disabled: true },
              ]}
            />
            <HoverCard trigger="About Spark UI">
              <Highlight text="Components you own" query="own" />
            </HoverCard>
            <FloatingPanel
              title="Notes"
              trigger="Open notes"
              parts={{
                root: {
                  defaultSize: { width: 280, height: 240 },
                  defaultPosition: { x: 16, y: 80 },
                },
              }}
            >
              <Field label="Note" parts={{ input: { placeholder: 'Add a note' } }} />
            </FloatingPanel>
          </div>
          <div className="canvas-sample">
            <ScrollArea parts={{ root: { style: { width: '100%', height: 280 } } }}>
              <TreeView
                label="Project files"
                nodes={files}
                parts={{ root: { defaultExpandedValue: ['src', 'components'] } }}
              />
            </ScrollArea>
          </div>
          <div className="canvas-sample canvas-sample--wide">
            <JsonTreeView
              label="Project configuration"
              data={{
                name: 'Spark UI',
                private: true,
                frameworks: ['React', 'Svelte'],
                settings: { notifications: true, theme: 'dark' },
              }}
              parts={{ root: { defaultExpandedDepth: 2 } }}
            />
          </div>
          <div className="canvas-sample canvas-sample--small canvas-stack">
            <div>
              <Format value={1234.5} style="currency" currency="EUR" />
            </div>
            <div>
              <Highlight text="Components you own" query="own" />
            </div>
            <NotificationSample />
            <PortalSample />
          </div>
        </main>
      </LocaleProvider>
    </EnvironmentProvider>
  )
}
