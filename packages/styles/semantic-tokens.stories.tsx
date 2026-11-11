import { useId, useState, type CSSProperties, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@spark/button/react.tsx'
import { Checkbox } from '@spark/checkbox/react.tsx'
import { Field } from '@spark/field/react.tsx'
import tokenSource from '../themes/src/default/tokens.css?raw'
import './semantic-tokens.css'

const densities = ['sm', 'md', 'lg'] as const
type Density = (typeof densities)[number]
type Token = readonly [name: string, description: string]
type TokenTable = { title?: string; tokens: Token[] }

// Read the first root and the explicit density rules, never the later media or layer overrides.
const rules = Array.from(
  tokenSource.matchAll(/(?:^|\n)\s*(:root|:where\([^{}]+\))\s*\{([^{}]*)\}/g),
  ([, selector, body]) => ({ selector, body }),
)

function declarations(selector: string) {
  const rule = rules.find((rule) => rule.selector === selector)
  if (!rule) throw new Error(`Semantic tokens: missing rule ${selector}`)
  return new Map(
    Array.from(rule.body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g), ([, name, value]) => [
      name,
      value.replace(/\s+/g, ' ').trim(),
    ]),
  )
}

const base = declarations(':root')
const profiles = Object.fromEntries(
  densities.map((density) => {
    const rule = rules.find(({ selector }) =>
      selector.includes(`[data-spark-density='${density}']`),
    )
    if (!rule) throw new Error(`Semantic tokens: missing density ${density}`)
    return [density, declarations(rule.selector)]
  }),
) as Record<Density, Map<string, string>>

const sizing: TokenTable[] = [
  {
    tokens: [
      ['--size-row-min', 'Minimum height of a control or interactive row.'],
      ['--size-icon', 'Standard inline icon dimensions.'],
      ['--size-indicator', 'Checkbox and radio indicator dimensions.'],
      ['--size-border', 'Standard border thickness.'],
      ['--size-focus-ring', 'Keyboard focus outline thickness.'],
    ],
  },
]
const spacing: TokenTable[] = [
  {
    tokens: [
      ['--space-unit', 'Base unit used to build spacing calculations.'],
      ['--space-row-inline', 'Horizontal padding inside controls and rows.'],
      ['--space-content-gap', 'Gap between related inline content, such as an icon and label.'],
      ['--space-stack-gap', 'Gap between items in a vertical stack.'],
      ['--space-panel-inset', 'Padding inside panels and containers.'],
      ['--space-section-gap', 'Separation between larger content sections.'],
      ['--space-field-gap', 'Gap between a field label, control, and supporting text.'],
      ['--space-list-inset', 'Inset around items inside a list.'],
      ['--space-tree-indent', 'Indentation for each nested tree level.'],
      ['--space-focus-offset', 'Distance between a control and its focus outline.'],
    ],
  },
]
const colors: TokenTable[] = [
  {
    title: 'Surfaces',
    tokens: [
      ['--color-background-layer-0', 'Base application surface.'],
      ['--color-background-layer-1', 'First distinct surface above the base.'],
      ['--color-background-layer-2', 'Second distinct surface above the base.'],
      ['--color-background-layer-3', 'Third distinct surface above the base.'],
      ['--color-background-surface', 'Current surface; follows the nearest explicit layer scope.'],
      ['--color-background-scrim', 'Translucent backdrop behind an overlay.'],
    ],
  },
  {
    title: 'Foregrounds',
    tokens: [
      ['--color-text-primary', 'Primary text and headings.'],
      ['--color-text-secondary', 'Supporting text and descriptions.'],
      ['--color-text-placeholder', 'Placeholder text inside an empty field.'],
      ['--color-text-on-strong', 'Text on solid action fills.'],
      ['--color-text-disabled', 'Text in disabled controls.'],
      ['--color-text-link', 'Default link text.'],
      ['--color-text-link-hover', 'Link text on hover.'],
      ['--color-icon-default', 'Standard interface icons.'],
      ['--color-icon-muted', 'Lower-emphasis interface icons.'],
      ['--color-icon-on-strong', 'Icons on solid action fills.'],
      ['--color-icon-disabled', 'Icons in disabled controls.'],
    ],
  },
  {
    title: 'Borders and focus',
    tokens: [
      ['--color-border-divider', 'Subtle separators between content regions.'],
      ['--color-border-control', 'Visible edge identifying an interactive control.'],
      ['--color-border-selected', 'Border of a selected control or item.'],
      ['--color-border-disabled', 'Border of a disabled control.'],
      ['--color-outline-focus', 'Keyboard focus outline on standard surfaces.'],
      ['--color-outline-focus-on-strong', 'Keyboard focus outline on solid action fills.'],
    ],
  },
  {
    title: 'Interaction fills',
    tokens: [
      ['--color-background-neutral', 'Subtle default fill for neutral controls.'],
      ['--color-background-neutral-hover', 'Neutral control fill on hover.'],
      ['--color-background-neutral-pressed', 'Neutral control fill while pressed.'],
      ['--color-background-field', 'Default input and field fill.'],
      ['--color-background-field-hover', 'Input and field fill on hover.'],
      ['--color-background-selected', 'Default fill of a selected item.'],
      ['--color-background-selected-hover', 'Selected item fill on hover.'],
      ['--color-background-selected-pressed', 'Selected item fill while pressed.'],
      ['--color-background-disabled', 'Fill of a disabled control.'],
      ['--color-background-action', 'Solid primary action fill.'],
      ['--color-background-action-hover', 'Primary action fill on hover.'],
      ['--color-background-action-pressed', 'Primary action fill while pressed.'],
    ],
  },
  {
    title: 'Feedback',
    tokens: (['info', 'success', 'warning', 'danger'] as const).flatMap(
      (status) =>
        [
          [`--color-text-${status}`, `Text conveying ${status} feedback.`],
          [`--color-icon-${status}`, `Icon accompanying ${status} feedback.`],
          [`--color-border-${status}`, `Border around ${status} feedback.`],
          [`--color-background-${status}`, `Tinted surface behind ${status} feedback.`],
        ] as Token[],
    ),
  },
]
const typography: TokenTable[] = [
  {
    tokens: [
      ['--font-family-ui', 'Font stack for interface text.'],
      ['--font-family-mono', 'Font stack for code and JSON.'],
      ['--font-size-caption', 'Small supporting text and captions.'],
      ['--font-size-control', 'Text size inside controls.'],
      ['--line-height-control', 'Line height inside controls.'],
      ['--font-size-title', 'Section and panel title size.'],
      ['--font-weight-label', 'Emphasis for labels and button text.'],
      ['--font-weight-title', 'Emphasis for titles and headings.'],
    ],
  },
]
const radii: TokenTable[] = [
  {
    tokens: [
      ['--radius-control', 'Corner radius of buttons, inputs, and indicators.'],
      ['--radius-overlay', 'Corner radius of overlay panels.'],
      ['--radius-pill', 'Fully rounded corners for pill shapes.'],
    ],
  },
]
const elevation: TokenTable[] = [
  { tokens: [['--shadow-overlay', 'Shadow separating an overlay panel from its backdrop.']] },
]
const motion: TokenTable[] = [
  {
    tokens: [
      [
        '--duration-interaction',
        'Duration of control transitions; becomes 0ms for reduced motion.',
      ],
      ['--ease-interaction', 'Easing curve for control transitions.'],
    ],
  },
]

// Fail visibly if the source or catalog changes without updating its counterpart.
const documented = [sizing, spacing, colors, typography, radii, elevation, motion].flatMap(
  (tables) => tables.flatMap(({ tokens }) => tokens),
)
const sourceNames = new Set(Array.from(tokenSource.matchAll(/(--[\w-]+)\s*:/g), ([, name]) => name))
const catalogNames = documented.map(([name]) => name)
const missing = [...sourceNames].filter((name) => !catalogNames.includes(name))
const invalid = documented.filter(
  ([name, description], index) =>
    !sourceNames.has(name) ||
    !description.trim() ||
    catalogNames.indexOf(name) !== index ||
    (profiles.md.has(name)
      ? densities.some((density) => !profiles[density].has(name))
      : !base.has(name)),
)
if (missing.length || invalid.length) {
  throw new Error(
    `Semantic token catalog mismatch: ${[...missing, ...invalid.map(([name]) => name)].join(', ')}`,
  )
}

function Icon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function DensityExamples({ children }: { children: (density: Density) => ReactNode }) {
  return (
    <div className="semantic-tokens-densities">
      {densities.map((density) => (
        <div key={density} data-spark-density={density}>
          <p className="semantic-tokens-caption">
            {density}
            {density === 'md' ? ' (default)' : ''}
          </p>
          {children(density)}
        </div>
      ))}
    </div>
  )
}

function SizingDemo() {
  return (
    <>
      <DensityExamples>
        {() => (
          <div className="semantic-tokens-stack">
            <Button.Root>
              <Icon />
              Add item
            </Button.Root>
            <Checkbox.Root defaultChecked>
              <Checkbox.Control>
                <Checkbox.Indicator aria-hidden="true">✓</Checkbox.Indicator>
              </Checkbox.Control>
              <Checkbox.Label>Selected item</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox.Root>
          </div>
        )}
      </DensityExamples>
      <div className="semantic-tokens-row">
        <span className="semantic-tokens-border-example">Standard border</span>
        <span className="semantic-tokens-focus-example">Focus ring geometry</span>
      </div>
    </>
  )
}

function SpacingDemo() {
  return (
    <DensityExamples>
      {() => (
        <div className="semantic-tokens-spacing-panel">
          <div className="semantic-tokens-stack">
            <Field.Root>
              <Field.Label>Project name</Field.Label>
              <Field.Input placeholder="My project" />
              <Field.HelperText>Label, control, and helper gap.</Field.HelperText>
            </Field.Root>
            <Button.Root variant="secondary">
              <Icon />
              Create
            </Button.Root>
          </div>
          <div className="semantic-tokens-list">
            <div className="semantic-tokens-list-row">Project</div>
            <div className="semantic-tokens-tree">
              <div className="semantic-tokens-list-row">Nested item</div>
            </div>
          </div>
        </div>
      )}
    </DensityExamples>
  )
}

function ColorsDemo() {
  return (
    <div className="semantic-tokens-stack">
      <div className="semantic-tokens-row">
        {(['0', '1', '2', '3'] as const).map((layer) => (
          <div className="semantic-tokens-surface" data-spark-layer={layer} key={layer}>
            <span>Layer {layer}</span>
          </div>
        ))}
      </div>
      <div className="semantic-tokens-row">
        <Button.Root>Action</Button.Root>
        <Button.Root variant="secondary">Neutral</Button.Root>
        <Button.Root variant="outline">Control border</Button.Root>
        <Button.Root disabled>Disabled</Button.Root>
        <a href="#semantic-tokens-colors">Link</a>
        <span className="semantic-tokens-focus-example">Focus outline</span>
      </div>
      <div className="semantic-tokens-row">
        <span>Primary text</span>
        <span className="semantic-tokens-secondary">Secondary text</span>
        {(['info', 'success', 'warning', 'danger'] as const).map((status) => (
          <span
            className="semantic-tokens-feedback"
            key={status}
            style={{
              color: `var(--color-text-${status})`,
              backgroundColor: `var(--color-background-${status})`,
              borderColor: `var(--color-border-${status})`,
            }}
          >
            <span style={{ color: `var(--color-icon-${status})` }} aria-hidden="true">
              ●
            </span>
            {status}
          </span>
        ))}
      </div>
    </div>
  )
}

function TypographyDemo() {
  return (
    <DensityExamples>
      {() => (
        <div className="semantic-tokens-type-sample">
          <p className="semantic-tokens-type-title">Panel title</p>
          <p className="semantic-tokens-type-label">Control label</p>
          <p>Control text and line height</p>
          <p className="semantic-tokens-caption">Caption and supporting text</p>
        </div>
      )}
    </DensityExamples>
  )
}

function RadiiDemo() {
  return (
    <div className="semantic-tokens-row">
      {['control', 'overlay', 'pill'].map((radius) => (
        <div
          className="semantic-tokens-radius"
          key={radius}
          style={{ borderRadius: `var(--radius-${radius})` }}
        >
          <span>{radius}</span>
        </div>
      ))}
    </div>
  )
}

function ElevationDemo() {
  return (
    <div className="semantic-tokens-elevation">
      <div className="semantic-tokens-elevation-panel" data-spark-layer="2">
        <div className="semantic-tokens-stack">
          <strong>Overlay panel</strong>
          <span>Shadow above a scrim.</span>
        </div>
      </div>
    </div>
  )
}

function MotionDemo() {
  return (
    <div className="semantic-tokens-row">
      <Button.Root variant="secondary" className="semantic-tokens-motion">
        Hover or focus me
      </Button.Root>
      <span>Interaction duration and easing. Respects reduced motion.</span>
    </div>
  )
}

function TokenRows({ tokens }: { tokens: Token[] }) {
  const invariant = tokens.filter(([name]) => !profiles.md.has(name))
  const varying = tokens.filter(([name]) => profiles.md.has(name))
  return (
    <>
      {[invariant, varying]
        .filter((rows) => rows.length > 0)
        .map((rows) => {
          const densityDependent = profiles.md.has(rows[0][0])
          return (
            <div
              className="semantic-tokens-table-scroll"
              key={densityDependent ? 'density' : 'base'}
              tabIndex={0}
              role="region"
              aria-label={densityDependent ? 'Density-dependent token values' : 'Token values'}
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">Token</th>
                    {densityDependent ? (
                      densities.map((density) => (
                        <th scope="col" key={density}>
                          {density}
                        </th>
                      ))
                    ) : (
                      <th scope="col">Value</th>
                    )}
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([name, description]) => (
                    <tr key={name}>
                      <th scope="row">
                        <span className="semantic-tokens-token-name">
                          {name.startsWith('--color-') && (
                            <span
                              className="semantic-tokens-swatch"
                              aria-hidden="true"
                              style={{ backgroundColor: `var(${name})` } as CSSProperties}
                            />
                          )}
                          <code>{name}</code>
                        </span>
                      </th>
                      {densityDependent ? (
                        densities.map((density) => (
                          <td key={density}>
                            <code>{profiles[density].get(name)}</code>
                          </td>
                        ))
                      ) : (
                        <td>
                          <code>{base.get(name)}</code>
                        </td>
                      )}
                      <td>{description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
    </>
  )
}

function TokenGroup({
  title,
  tables,
  children,
}: {
  title: string
  tables: TokenTable[]
  children: ReactNode
}) {
  const [showStructure, setShowStructure] = useState(false)
  const demoId = useId()
  const headingId = `semantic-tokens-${title.toLowerCase()}`
  return (
    <section className="semantic-tokens-group" aria-labelledby={headingId}>
      <div className="semantic-tokens-group-heading">
        <h2 id={headingId}>{title}</h2>
        <Button.Root
          type="button"
          variant="outline"
          size="sm"
          aria-pressed={showStructure}
          aria-controls={demoId}
          aria-label={`Show ${title.toLowerCase()} structure`}
          onClick={() => setShowStructure((current) => !current)}
        >
          Show structure
        </Button.Root>
      </div>
      <div
        id={demoId}
        className="semantic-tokens-demo"
        data-show-structure={showStructure ? '' : undefined}
      >
        {children}
      </div>
      {tables.map(({ title: tableTitle, tokens }, index) => (
        <div className="semantic-tokens-table-group" key={tableTitle ?? index}>
          {tableTitle && <h3>{tableTitle}</h3>}
          <TokenRows tokens={tokens} />
        </div>
      ))}
    </section>
  )
}

function SemanticTokensPage() {
  return (
    <main className="semantic-tokens" data-spark-layer="0" data-spark-density="md">
      <header>
        <h1>Semantic tokens</h1>
        <p>
          {catalogNames.length} tokens for the default dark theme. Values show CSS declarations,
          including aliases and calculations.
        </p>
        <p>
          Density-dependent examples and values show sm, md (default), and lg. Show structure
          outlines all rendered elements and nested component parts in each demo.
        </p>
      </header>
      <TokenGroup title="Sizing" tables={sizing}>
        <SizingDemo />
      </TokenGroup>
      <TokenGroup title="Spacing" tables={spacing}>
        <SpacingDemo />
      </TokenGroup>
      <TokenGroup title="Colors" tables={colors}>
        <ColorsDemo />
      </TokenGroup>
      <TokenGroup title="Typography" tables={typography}>
        <TypographyDemo />
      </TokenGroup>
      <TokenGroup title="Radii" tables={radii}>
        <RadiiDemo />
      </TokenGroup>
      <TokenGroup title="Elevation" tables={elevation}>
        <ElevationDemo />
      </TokenGroup>
      <TokenGroup title="Motion" tables={motion}>
        <MotionDemo />
      </TokenGroup>
      <footer>
        Values read from <code>packages/themes/src/default/tokens.css</code>. Surface scopes and
        accessibility preferences can override defaults. Primitive palette and internal functional
        variables are documented separately.
      </footer>
    </main>
  )
}

const meta = {
  title: 'Design System/Semantic Tokens',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>
export const Overview: Story = { render: () => <SemanticTokensPage /> }
