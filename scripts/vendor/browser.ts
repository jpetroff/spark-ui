import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { chromium, expect } from '@playwright/test'
import { root } from './import.ts'
import { configureStyling, type StylingMode } from './styling-fixture.ts'

const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox'],
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
})
try {
  for (const framework of ['react', 'svelte'])
    for (const mode of ['functional', 'sample', 'tailwind'] satisfies StylingMode[]) {
      const dir = path.join(root, '.vendor-tests/consumers', framework)
      const restore = configureStyling(dir, framework, mode)
      const extension = framework === 'react' ? 'tsx' : 'ts'
      const server = await createServer({
        root: dir,
        server: { host: '127.0.0.1', port: 0 },
        plugins: [
          ...(mode === 'tailwind' ? [tailwindcss()] : []),
          {
            name: 'fixture-ssr',
            configureServer(server) {
              server.middlewares.use(async (req, res, next) => {
                if (req.url !== '/') return next()
                try {
                  const { html } = await server.ssrLoadModule(`/src/ssr.${extension}`)
                  const document = await server.transformIndexHtml(
                    '/',
                    `<!doctype html><html><head><link rel="icon" href="data:,"/><style>body{min-height:120vh}</style></head><body><div id="app">${html}</div><script type="module" src="/src/client.${extension}"></script></body></html>`,
                  )
                  res.setHeader('Content-Type', 'text/html; charset=utf-8')
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
        const email = page.getByRole('textbox', { name: 'Email' })
        await email.fill('person@example.com')
        await expect(email).toHaveValue('person@example.com')
        await expect(email).toHaveAttribute('aria-invalid', 'true')
        await expect(page.getByText('Use your work email.')).toBeVisible()
        await expect(page.getByText('Enter a valid email.')).toBeVisible()
        const overflow = await page.locator('body').evaluate((node) => node.style.overflow)
        const nativeButton = page.getByRole('button', { name: 'Native clicks 0', exact: true })
        await expect(nativeButton).toHaveAttribute('type', 'button')
        await expect(nativeButton).toHaveAttribute('data-slot', 'button')
        await expect(nativeButton).toHaveAttribute('data-ref-ready', 'true')
        await expect(nativeButton).toHaveClass(/spark-button-secondary/)
        await expect(nativeButton).toHaveClass(/spark-button-lg/)
        if (mode !== 'functional') await expect(nativeButton).toHaveCSS('height', '48px')
        await expect(nativeButton).toHaveCSS('padding-inline-start', '24px')
        await expect(
          page.getByRole('button', { name: 'Native disabled', exact: true }),
        ).toBeDisabled()
        if (mode !== 'functional') {
          if (mode === 'tailwind') {
            await nativeButton.evaluate((node) => {
              node.classList.add('bg-spark-info-surface')
              node.style.setProperty('--color-background-info', '#123456')
            })
            await expect(nativeButton).toHaveCSS('background-color', 'rgb(18, 52, 86)')
            await nativeButton.evaluate((node) => {
              node.classList.remove('bg-spark-info-surface')
              node.style.removeProperty('--color-background-info')
            })
          }
          await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark')
          await expect(page.locator('html')).toHaveCSS('background-color', 'rgb(17, 16, 15)')
          await page.keyboard.press('Tab')
          await nativeButton.focus()
          await expect(nativeButton).toHaveCSS('outline-style', 'solid')
          await page.emulateMedia({ reducedMotion: 'reduce' })
          await expect(nativeButton).toHaveCSS('transition-duration', '0s')
          await page.emulateMedia({ forcedColors: 'active' })
          await expect(nativeButton).toHaveCSS('outline-style', 'solid')
          await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'no-preference' })
        }
        await nativeButton.click()
        await expect(
          page.getByRole('button', { name: 'Native clicks 1', exact: true }),
        ).toBeVisible()
        const trigger = page.getByRole('button', { name: 'Open dialog', exact: true })
        await trigger.click()
        const dialog = page.getByRole('dialog', { name: 'Settings', exact: true })
        await expect(dialog).toBeVisible()
        await page.getByRole('button', { name: 'Open popover', exact: true }).click()
        const popover = page.getByRole('dialog', { name: 'Details', exact: true })
        await expect(popover).toBeVisible()
        await expect(popover).toHaveClass(/custom-popover/)
        if (mode === 'sample') await page.screenshot({ path: path.join(dir, 'styled-overlay.png') })
        await page.keyboard.press('Escape')
        await expect(popover).toBeHidden()
        await expect(dialog).toBeVisible()
        await expect(page.getByRole('button', { name: 'Open popover', exact: true })).toBeFocused()
        await page.getByRole('button', { name: 'Open popover', exact: true }).click()
        await expect(popover).toBeVisible()
        await dialog.click({ position: { x: 2, y: 2 } })
        await expect(popover).toBeHidden()
        await expect(dialog).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(dialog).toBeHidden()
        await expect(trigger).toBeFocused()
        await expect
          .poll(() => page.locator('body').evaluate((node) => node.style.overflow))
          .toBe(overflow)
        await page.locator('.spark-date-picker-trigger').click()
        await expect(page.locator('.spark-date-picker-next-trigger')).toBeVisible()
        await expect(page.locator('.spark-date-picker-table-cell-trigger').first()).toHaveAttribute(
          'role',
          'button',
        )
        await page
          .locator('.spark-date-picker-table-cell-trigger')
          .filter({ hasText: /^15$/ })
          .click()
        await expect(page.locator('.spark-date-picker-input')).not.toHaveValue('')
        await expect(page.locator('.spark-date-picker-next-trigger')).toBeHidden()
        await page.locator('.spark-date-picker-trigger').click()
        await page.keyboard.press('Escape')
        await expect(page.locator('.spark-date-picker-next-trigger')).toBeHidden()
        assert.deepEqual(errors, [], `${framework} SSR/hydration/browser errors`)
        console.log(
          `${framework} (${mode}): SSR/hydration, Field context, RTL, nested dismissal, focus restoration, and scroll restoration passed`,
        )
      } catch (error) {
        console.error({
          framework,
          mode,
          errors,
          overlayStates: await page.locator('[aria-expanded]').evaluateAll((nodes) =>
            nodes.map((node) => ({
              text: node.textContent,
              expanded: node.getAttribute('aria-expanded'),
            })),
          ),
        })
        throw error
      } finally {
        await page.close()
        await server.close()
        restore()
      }
    }
} finally {
  await browser.close()
}
