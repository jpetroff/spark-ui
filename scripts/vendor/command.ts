import { execFileSync } from 'node:child_process'
import { generate, root } from './import.ts'
import { update } from './update.ts'
import { startOperation, saveOperation, failOperation, generationOptions } from './ledger.ts'
const args = process.argv.slice(2)
try {
  let baseline = false
  try {
    execFileSync('git', ['-C', root, 'rev-parse', '--verify', 'refs/heads/vendor/upstream'], {
      stdio: 'ignore',
    })
    baseline = true
  } catch {}
  const names = [...new Set(args.filter((a) => !a.startsWith('--')))]
  if (!names.length) throw new Error('Usage: vendor:import <component...> [--dry-run]')
  if (args.some((a) => a.startsWith('--') && a !== '--dry-run'))
    throw new Error('Only --dry-run is supported')
  if (baseline && !args.includes('--dry-run')) await update(names, 'import')
  else if (args.includes('--dry-run')) await generate(names)
  else {
    const operation = startOperation('import', names)
    try {
      operation.phase = 'generation'
      saveOperation(operation)
      await generate(names, { apply: true, ...generationOptions(operation) })
      operation.status = 'imported'
      operation.phase = 'done'
      saveOperation(operation)
    } catch (error) {
      failOperation(operation, error)
      throw error
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
}
