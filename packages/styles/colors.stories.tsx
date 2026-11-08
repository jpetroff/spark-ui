import { useId, useState } from 'react'
import { HoverCard } from '@spark/hover-card/react.tsx'
import { Portal } from '@spark/portal/react.tsx'
import { Popover } from '@spark/popover/react.tsx'
import type { Meta, StoryObj } from '@storybook/react-vite'
import paletteSource from './src/colors.css?raw'
import tokenSource from './src/tokens.css?raw'
import './colors.css'

// Read the default theme declarations, before density/layer and accessibility overrides.
function declarations(source: string) {
  const root = source.match(/:root\s*\{([^}]+)\}/)?.[1] ?? ''
  return new Map(
    Array.from(root.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g), ([, name, value]) => [
      name,
      value.replace(/\s+/g, ' ').trim(),
    ]),
  )
}

const palette = declarations(paletteSource)
const tokens = declarations(tokenSource)

// Follow aliases as well as every var() in a color-mix; never compare hex values,
// since two independently named swatches can have the same value.
function paletteReferences(name: string, visited = new Set<string>()): Set<string> {
  if (palette.has(name)) return new Set([name])
  if (visited.has(name)) return new Set()
  const next = new Set(visited).add(name)
  return new Set(
    Array.from((tokens.get(name) ?? '').matchAll(/var\((--[\w-]+)/g)).flatMap(([, reference]) => [
      ...paletteReferences(reference, next),
    ]),
  )
}

const semanticTokens = [...tokens]
  .filter(([name]) => name.startsWith('--color-'))
  .map(([name, value]) => ({ name, value, references: paletteReferences(name) }))

const swatches = [...palette].map(([name, value]) => {
  const [, family, shade] = name.match(/^--color-(.+)-(\d+)$/)!
  return {
    name,
    value,
    family,
    shade,
    usages: semanticTokens.filter(({ references }) => references.has(name)),
  }
})

const families = [...new Set(swatches.map(({ family }) => family))]
const usedCount = swatches.filter(({ usages }) => usages.length > 0).length

const shades = [...new Set(swatches.map(({ shade }) => shade))]

const filterGroups = [
  { name: 'Usage', options: ['text', 'background', 'icon'] },
  { name: 'State', options: ['default', 'hover', 'pressed', 'disabled'] },
  { name: 'Edges', options: ['outline', 'border'] },
  {
    name: 'Purpose',
    options: [
      'neutral',
      'action',
      'field',
      'selected',
      'link',
      'focus',
      'on-strong',
      'info',
      'success',
      'warning',
      'danger',
    ],
  },
] as const

type FilterGroup = (typeof filterGroups)[number]['name']
type Filters = Record<FilterGroup, string[]>
const emptyFilters: Filters = { Usage: [], State: [], Edges: [], Purpose: [] }

function matchesModifier(name: string, modifier: string): boolean {
  if (modifier === 'default') {
    return !['hover', 'pressed', 'disabled'].some((state) => matchesModifier(name, state))
  }
  return `${name}-`.includes(`-${modifier}-`)
}

function ColorsPage() {
  const paletteId = useId()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [selectedSwatch, setSelectedSwatch] = useState<(typeof swatches)[number]>()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const search = query.trim().toLowerCase()
  const visible = semanticTokens.filter((token) => {
    const matchesSearch = [
      token.name,
      token.value,
      ...[...token.references].flatMap((name) => [name, palette.get(name)]),
    ]
      .join(' ')
      .toLowerCase()
      .includes(search)
    return (
      matchesSearch &&
      Object.values(filters).every(
        (modifiers) =>
          modifiers.length === 0 ||
          modifiers.some((modifier) => matchesModifier(token.name, modifier)),
      )
    )
  })
  const hasFilters = query !== '' || Object.values(filters).some((values) => values.length > 0)

  function swatchTriggerId(name?: string) {
    return `${paletteId}-${name}`
  }

  function toggleFilter(group: FilterGroup, modifier: string) {
    setFilters((current) => ({
      ...current,
      [group]: current[group].includes(modifier)
        ? current[group].filter((value) => value !== modifier)
        : [...current[group], modifier],
      // Usage and edge filters describe the same part of a token's name.
      ...(group === 'Usage' ? { Edges: [] } : group === 'Edges' ? { Usage: [] } : {}),
    }))
  }

  return (
    <main className="color-reference" data-spark-layer="0">
      <header className="color-reference-header">
        <p className="color-reference-eyebrow">Spark UI · Foundations</p>
        <h1>Colors</h1>
        <p>
          {swatches.length} swatches · {families.length} families · {semanticTokens.length} semantic
          tokens
        </p>
      </header>

      <section aria-labelledby="palette-heading">
        <div className="color-reference-section-heading">
          <h2 id="palette-heading">Palette</h2>
          <p className="color-reference-legend">
            <span aria-hidden="true" /> {usedCount} outlined swatches have semantic uses
          </p>
        </div>
        <p className="color-reference-hint" id="palette-help">
          Hover or focus an outlined swatch to see its semantic tokens. Click any swatch to keep its
          color code and token names open for copying.
        </p>
        <Popover.Root
          lazyMount
          unmountOnExit
          open={popoverOpen}
          onOpenChange={({ open }) => setPopoverOpen(open)}
          triggerValue={selectedSwatch?.name ?? null}
          onTriggerValueChange={({ value }) =>
            setSelectedSwatch(swatches.find(({ name }) => name === value))
          }
          ids={{ trigger: swatchTriggerId }}
          positioning={{ placement: 'bottom', strategy: 'fixed', gutter: 8 }}
        >
          <div className="color-reference-table-scroll" tabIndex={0} aria-label="Color palette">
            <table className="color-reference-palette" aria-describedby="palette-help">
              <thead>
                <tr>
                  <th scope="col">Family</th>
                  {shades.map((shade) => (
                    <th scope="col" key={shade}>
                      {shade}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {families.map((family) => (
                  <tr key={family}>
                    <th scope="row">{family.replaceAll('-', ' ')}</th>
                    {shades.map((shade) => {
                      const swatch = swatches.find(
                        (color) => color.family === family && color.shade === shade,
                      )
                      if (!swatch) return <td key={shade} />
                      return (
                        <td key={shade}>
                          <HoverCard.Root
                            lazyMount
                            unmountOnExit
                            disabled={popoverOpen || swatch.usages.length === 0}
                            ids={{ trigger: swatchTriggerId(swatch.name) }}
                            openDelay={100}
                            closeDelay={150}
                            positioning={{ placement: 'bottom', strategy: 'fixed', gutter: 8 }}
                          >
                            <Popover.Trigger value={swatch.name} asChild>
                              <HoverCard.Trigger
                                className="color-reference-swatch"
                                data-used={swatch.usages.length > 0 ? '' : undefined}
                                style={{ backgroundColor: `var(${swatch.name})` }}
                                aria-label={`${swatch.name}, ${swatch.value}, ${swatch.usages.length} semantic uses`}
                              />
                            </Popover.Trigger>
                            {!popoverOpen && swatch.usages.length > 0 && (
                              <Portal>
                                <HoverCard.Positioner className="color-reference-hover-positioner">
                                  <HoverCard.Content className="color-reference-hover">
                                    <ul>
                                      {swatch.usages.map((token) => (
                                        <li key={token.name}>
                                          <code>{token.name}</code>
                                        </li>
                                      ))}
                                    </ul>
                                  </HoverCard.Content>
                                </HoverCard.Positioner>
                              </Portal>
                            )}
                          </HoverCard.Root>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Portal>
            <Popover.Positioner className="color-reference-hover-positioner">
              <Popover.Content className="color-reference-hover color-reference-swatch-details">
                {selectedSwatch && (
                  <>
                    <Popover.Title className="color-reference-popover-title">
                      <code>{selectedSwatch.name}</code>
                    </Popover.Title>
                    <code>{selectedSwatch.value}</code>
                    {selectedSwatch.usages.length > 0 && (
                      <ul>
                        {selectedSwatch.usages.map((token) => (
                          <li key={token.name}>
                            <code>{token.name}</code>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </section>

      <section className="color-reference-semantics" aria-labelledby="semantics-heading">
        <div className="color-reference-section-heading">
          <h2 id="semantics-heading">Semantic colors</h2>
          <p>Default dark theme</p>
        </div>
        <p className="color-reference-hint">
          Semantic previews preserve opacity. Source swatches include references through aliases.
        </p>
        <div className="color-reference-toolbar">
          <label htmlFor="color-reference-search">Search semantic colors</label>
          <input
            id="color-reference-search"
            type="search"
            placeholder="Search tokens, swatches, or hex values…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="color-reference-filters">
            {filterGroups.map((group) => (
              <fieldset key={group.name}>
                <legend>{group.name}</legend>
                <div>
                  {group.options.map((modifier) => (
                    <button
                      type="button"
                      key={modifier}
                      aria-pressed={filters[group.name].includes(modifier)}
                      onClick={() => toggleFilter(group.name, modifier)}
                    >
                      {modifier === 'danger' ? 'Error / danger' : modifier.replaceAll('-', ' ')}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
          <div className="color-reference-filter-summary">
            <p role="status">
              Showing {visible.length} of {semanticTokens.length} semantic colors
            </p>
            {hasFilters && (
              <button
                type="button"
                className="color-reference-clear"
                onClick={() => {
                  setQuery('')
                  setFilters(emptyFilters)
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="color-reference-table-scroll">
          <table className="color-reference-semantic-table">
            <thead>
              <tr>
                <th scope="col">Semantic color</th>
                <th scope="col">Palette source</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((token) => (
                <tr key={token.name}>
                  <td>
                    <div className="color-reference-token">
                      <span
                        className="color-reference-token-paint"
                        style={{ backgroundColor: `var(${token.name})` }}
                        aria-hidden="true"
                      />
                      <div>
                        <code>{token.name}</code>
                        <code className="color-reference-expression">{token.value}</code>
                      </div>
                    </div>
                  </td>
                  <td>
                    <ul className="color-reference-sources">
                      {[...token.references].map((name) => (
                        <li key={name}>
                          <span
                            className="color-reference-token-paint"
                            style={{ backgroundColor: `var(${name})` }}
                            aria-hidden="true"
                          />
                          <div>
                            <code>{name}</code>
                            <code className="color-reference-expression">{palette.get(name)}</code>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={2} className="color-reference-empty">
                    No semantic colors match. Try another search or clear the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <footer>
        Palette: <code>packages/styles/src/colors.css</code> · Semantic tokens:{' '}
        <code>packages/styles/src/tokens.css</code>. This page reads both files directly.
      </footer>
    </main>
  )
}

const meta = {
  title: 'Design System/Colors',
  parameters: { layout: 'fullscreen' },
  tags: ['!autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = { render: () => <ColorsPage /> }
