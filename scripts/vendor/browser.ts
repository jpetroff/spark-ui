import path from 'node:path'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { chromium, expect } from '@playwright/test'
import { root } from './import.ts'

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox'],
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
})
try {
  for (const framework of ['react', 'svelte']) {
    const dir = path.join(root, '.vendor-tests/consumers', framework)
    const extension = framework === 'react' ? 'tsx' : 'ts'
    const server = await createServer({
      root: dir,
      server: { host: '127.0.0.1', port: 0 },
      plugins: [
        {
          name: 'fixture-ssr',
          configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
              if (req.url !== '/') return next()
              try {
                const { html } = await server.ssrLoadModule(`/src/ssr.${extension}`)
                const document = await server.transformIndexHtml(
                  '/',
                  `<!doctype html><html><head><link rel="icon" href="data:,"/><style>body{min-height:120vh} [data-scope="dialog"][data-part="backdrop"]{position:fixed;inset:0;background:#0003} [data-scope="dialog"][data-part="positioner"]{position:fixed;inset:60px;pointer-events:none} [data-scope="dialog"][data-part="content"]{background:white;padding:20px;pointer-events:auto} [data-scope="popover"][data-part="content"]{background:white;border:1px solid;padding:10px}</style></head><body><div id="app">${html}</div><script type="module" src="/src/client.${extension}"></script></body></html>`,
                )
                res.setHeader('Content-Type', 'text/html')
                res.end(document)
              } catch (error) {
                next(error)
              }
            })
          },
        },
      ],
    })
    await server.listen()
    const address = server.httpServer!.address() as { port: number }
    const page = await browser.newPage()
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })
    try {
      const response = await page.goto(`http://127.0.0.1:${address.port}/`)
      assert.equal(response!.status(), 200)
      await expect(page.getByText('Accept terms', { exact: true })).toBeVisible()
      const input = page.locator('input[type="checkbox"]')
      await expect(input).toHaveAttribute('aria-invalid', 'true')
      await page.getByText('Accept terms', { exact: true }).click()
      await expect(input).toBeChecked()
      await expect(page.locator('[data-scope="checkbox"][data-part="root"]')).toHaveAttribute(
        'dir',
        'rtl',
      )
      const overflow = await page.locator('body').evaluate((node) => node.style.overflow)
      const trigger = page.getByRole('button', { name: 'Open dialog', exact: true })
      await trigger.click()
      const dialog = page.getByRole('dialog', { name: 'Settings', exact: true })
      await expect(dialog).toBeVisible()
      await page.getByRole('button', { name: 'Open popover', exact: true }).click()
      const popover = page.getByRole('dialog', { name: 'Details', exact: true })
      await expect(popover).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(popover).toBeHidden()
      await expect(dialog).toBeVisible()
      await expect(page.getByRole('button', { name: 'Open popover', exact: true })).toBeFocused()
      await page.getByRole('button', { name: 'Open popover', exact: true }).click()
      await expect(popover).toBeVisible()
      await page.getByRole('heading', { name: 'Settings', exact: true }).click()
      await expect(popover).toBeHidden()
      await expect(dialog).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(dialog).toBeHidden()
      await expect(trigger).toBeFocused()
      await expect
        .poll(() => page.locator('body').evaluate((node) => node.style.overflow))
        .toBe(overflow)
      assert.deepEqual(errors, [], `${framework} SSR/hydration/browser errors`)
      console.log(
        `${framework}: SSR/hydration, Field context, RTL, nested dismissal, focus restoration, and scroll restoration passed`,
      )
    } finally {
      await page.close()
      await server.close()
    }
  }
} finally {
  await browser.close()
}
