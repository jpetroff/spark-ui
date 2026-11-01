import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { viteAliases } from './scripts/vendor/aliases.ts'
import tsconfig from './tsconfig.json' with { type: 'json' }

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    alias: viteAliases(
      tsconfig.compilerOptions.paths,
      fileURLToPath(new URL('.', import.meta.url)),
    ),
    dedupe: ['react', 'react-dom'],
  },
})
