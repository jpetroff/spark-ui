import { execFileSync } from 'node:child_process'
import { generate, root } from './import.ts'
import { update } from './update.ts'
const args = process.argv.slice(2)
try {
  let baseline = false
  try {
    execFileSync('git', ['-C', root, 'rev-parse', '--verify', 'refs/heads/vendor/upstream'], {
      stdio: 'ignore',
    })
    baseline = true
  } catch {}
  if (baseline && !args.includes('--dry-run')) await update(args)
  else
    await generate(
      args.filter((a) => !a.startsWith('--')),
      { apply: !args.includes('--dry-run') },
    )
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
