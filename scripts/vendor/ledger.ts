import fs from 'node:fs'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { git } from './graph.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const filename = '.import.lock.json'
export type Level = 'info' | 'warning' | 'error'
export type Branch = { name: string; commit: string }
export type Operation = {
  id: string
  mode: 'import' | 'update'
  requestedComponents: string[]
  components: string[]
  startedAt: string
  updatedAt: string
  source: { name: string; commit: string | null }
  upstream?: Record<string, { commit: string; version?: string }>
  branches: { candidate?: Branch; review?: Branch }
  phase: string
  status: 'running' | 'ready' | 'imported' | 'failed' | 'conflicted' | 'merged' | 'complete'
  report?: Record<string, unknown>
  events: { time: string; level: Level; message: string }[]
  merge?: { target: string; sourceCommit: string; commit?: string }
  cleanup?: { branch: string; status: 'deleted' | 'missing' | 'retained'; reason?: string }[]
}
type Ledger = { version: 1; operations: Operation[] }
const object = (value: unknown): value is Record<string, any> =>
  !!value && typeof value === 'object' && !Array.isArray(value)
const strings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')
const commit = (value: unknown) => typeof value === 'string' && /^[a-f0-9]{40,64}$/.test(value)
const ref = (value: unknown) =>
  typeof value === 'string' &&
  !!value &&
  !/[\s~^:?*\[\\]/.test(value) &&
  !value.includes('..') &&
  !value.includes('@{') &&
  !value.startsWith('-')
const branch = (value: unknown): value is Branch =>
  object(value) && ref(value.name) && commit(value.commit)

function validOperation(value: unknown): value is Operation {
  if (!object(value)) return false
  return (
    typeof value.id === 'string' &&
    !!value.id &&
    ['import', 'update'].includes(value.mode) &&
    strings(value.requestedComponents) &&
    strings(value.components) &&
    typeof value.startedAt === 'string' &&
    typeof value.updatedAt === 'string' &&
    object(value.source) &&
    ref(value.source.name) &&
    (value.source.commit === null || commit(value.source.commit)) &&
    object(value.branches) &&
    Object.keys(value.branches).every((key) => key === 'candidate' || key === 'review') &&
    (value.branches.candidate === undefined ||
      (branch(value.branches.candidate) &&
        value.branches.candidate.name.startsWith('vendor/candidate-'))) &&
    (value.branches.review === undefined ||
      (branch(value.branches.review) &&
        value.branches.review.name.startsWith('update/upstream-'))) &&
    typeof value.phase === 'string' &&
    ['running', 'ready', 'imported', 'failed', 'conflicted', 'merged', 'complete'].includes(
      value.status,
    ) &&
    Array.isArray(value.events) &&
    value.events.every(
      (event: unknown) =>
        object(event) &&
        typeof event.time === 'string' &&
        ['info', 'warning', 'error'].includes(event.level) &&
        typeof event.message === 'string',
    ) &&
    (value.upstream === undefined ||
      (object(value.upstream) &&
        Object.values(value.upstream).every((entry) => object(entry) && commit(entry.commit)))) &&
    (value.report === undefined || object(value.report)) &&
    (value.merge === undefined ||
      (object(value.merge) &&
        ref(value.merge.target) &&
        commit(value.merge.sourceCommit) &&
        (value.merge.commit === undefined || commit(value.merge.commit)))) &&
    (value.cleanup === undefined ||
      (Array.isArray(value.cleanup) &&
        value.cleanup.every(
          (item: unknown) =>
            object(item) &&
            ref(item.branch) &&
            ['deleted', 'missing', 'retained'].includes(item.status),
        )))
  )
}

export function readLedger(required = false, cwd = root): Ledger {
  const file = path.join(cwd, filename)
  if (!fs.existsSync(file)) {
    if (required) throw new Error(`Missing ${filename}; no recorded import can be merged safely`)
    return { version: 1, operations: [] }
  }
  let value: unknown
  try {
    value = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    throw new Error(`Malformed ${filename}; restore it before continuing`)
  }
  if (
    !object(value) ||
    value.version !== 1 ||
    !Array.isArray(value.operations) ||
    !value.operations.every(validOperation) ||
    new Set(value.operations.map((entry: Operation) => entry.id)).size !== value.operations.length
  )
    throw new Error(`Malformed ${filename}; unsupported schema or invalid operation records`)
  return value as Ledger
}

export function saveOperation(operation: Operation, cwd = root) {
  operation.updatedAt = new Date().toISOString()
  if (!validOperation(operation)) throw new Error('Invalid import operation record')
  const ledger = readLedger(false, cwd)
  const index = ledger.operations.findIndex((entry) => entry.id === operation.id)
  if (index === -1) ledger.operations.push(operation)
  else ledger.operations[index] = operation
  const file = path.join(cwd, filename)
  const temporary = `${file}.${randomUUID()}.tmp`
  try {
    fs.writeFileSync(temporary, `${JSON.stringify(ledger, null, 2)}\n`, { flag: 'wx' })
    fs.renameSync(temporary, file)
  } finally {
    fs.rmSync(temporary, { force: true })
  }
}

export function log(operation: Operation, level: Level, message: string) {
  operation.events.push({ time: new Date().toISOString(), level, message })
  saveOperation(operation)
}

export function startOperation(mode: Operation['mode'], names: string[]): Operation {
  readLedger()
  const time = new Date().toISOString()
  let sourceCommit: string | null = null
  try {
    sourceCommit = git(root, 'rev-parse', '--verify', 'HEAD')
  } catch {
    // The first direct import can run before the repository's initial commit.
  }
  const operation: Operation = {
    id: randomUUID(),
    mode,
    requestedComponents: [...new Set(names)].sort(),
    components: [],
    startedAt: time,
    updatedAt: time,
    source: {
      name: git(root, 'symbolic-ref', '--short', 'HEAD'),
      commit: sourceCommit,
    },
    branches: {},
    phase: 'validation',
    status: 'running',
    events: [],
  }
  log(operation, 'info', `Starting ${mode}`)
  return operation
}

export function failOperation(operation: Operation, error: unknown) {
  if (operation.status !== 'conflicted') operation.status = 'failed'
  log(operation, 'error', error instanceof Error ? error.message : String(error))
}

export function generationOptions(operation: Operation) {
  return {
    onDiagnostic: (level: Level, message: string) => log(operation, level, message),
    onUpstream: (upstream: Record<string, { commit: string }>) => {
      operation.upstream = upstream
      saveOperation(operation)
    },
    onReport: (report: Record<string, any>) => {
      operation.report = report
      operation.components = report.components
      operation.upstream = report.commits
      saveOperation(operation)
    },
  }
}

// Capture successful stderr warnings as well as failed command output in the ledger.
export function execute(operation: Operation, command: string, args: string[], cwd = root) {
  log(operation, 'info', `${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  if (result.stdout) {
    process.stdout.write(result.stdout)
    log(operation, result.status === 0 ? 'info' : 'error', result.stdout.trimEnd())
  }
  if (result.stderr) {
    process.stderr.write(result.stderr)
    log(operation, result.status === 0 ? 'warning' : 'error', result.stderr.trimEnd())
  }
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`${command} failed (${result.status ?? result.signal})`)
}
