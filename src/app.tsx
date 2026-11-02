import { useState } from 'react'
import { Button } from '@spark/button/react.tsx'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="workshop">
      <header className="workshop-install">
        <p className="workshop-muted">Component workshop</p>
        <h1>Spark UI</h1>
        <p className="workshop-muted">
          Components you own. Explore them in Storybook and copy their source into your app with
          shadcn.
        </p>
      </header>
      <section aria-label="Button examples" className="workshop-buttons">
        <Button parts={{ button: { onClick: () => setCount((value) => value + 1) } }}>
          Clicked {count} times
        </Button>
        <Button parts={{ button: { variant: 'secondary' } }}>Secondary</Button>
        <Button parts={{ button: { variant: 'outline' } }}>Outline</Button>
        <Button parts={{ button: { variant: 'ghost' } }}>Ghost</Button>
        <Button parts={{ button: { disabled: true } }}>Disabled</Button>
      </section>
      <section aria-label="Install Button" className="workshop-install">
        <h2>Add to your project</h2>
        <pre>
          <code>pnpm dlx shadcn@latest add http://localhost:5173/r/button.json</code>
        </pre>
        <p className="workshop-muted">
          Run this command from a project configured with shadcn. Tailwind CSS is optional.
        </p>
      </section>
    </main>
  )
}
