import { useState } from 'react'
import { Button } from '@spark/button/index.ts'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 p-8">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Component workshop</p>
        <h1 className="text-4xl font-semibold tracking-tight">Spark UI</h1>
        <p className="text-muted-foreground">
          Components you own. Explore them in Storybook and copy their source into your app with
          shadcn.
        </p>
      </header>
      <section aria-label="Button examples" className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setCount((value) => value + 1)}>Clicked {count} times</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </section>
      <section aria-label="Install Button" className="space-y-3">
        <h2 className="text-lg font-medium">Add to your project</h2>
        <pre className="overflow-x-auto rounded-lg border border-border bg-secondary p-4 text-sm">
          <code>pnpm dlx shadcn@latest add http://localhost:5173/r/button.json</code>
        </pre>
        <p className="text-sm text-muted-foreground">
          Run this command from a project already configured with shadcn and Tailwind CSS.
        </p>
      </section>
    </main>
  )
}
