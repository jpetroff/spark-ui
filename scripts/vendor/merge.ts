import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { git } from './graph.ts'
import { root } from './import.ts'
import { clean, mergeBaseline, runGit } from './update.ts'
import { readLedger, saveOperation, log, type Operation } from './ledger.ts'

function tip(name: string) {
  try {
    return git(root, 'rev-parse', '--verify', `refs/heads/${name}^{commit}`)
  } catch {
    return undefined
  }
}

function contains(commit: string, target = 'HEAD') {
  try {
    git(root, 'merge-base', '--is-ancestor', commit, target)
    return true
  } catch {
    return false
  }
}

function cleanup(operation: Operation) {
  const worktrees = new Set(
    git(root, 'worktree', 'list', '--porcelain')
      .split('\n')
      .filter((line) => line.startsWith('branch refs/heads/'))
      .map((line) => line.slice('branch refs/heads/'.length)),
  )
  operation.phase = 'cleanup'
  operation.cleanup = []
  saveOperation(operation)
  for (const [role, branch] of Object.entries(operation.branches)) {
    const current = tip(branch.name)
    const expected = role === 'review' ? operation.merge!.sourceCommit : branch.commit
    let reason: string | undefined
    if (current) {
      if (current !== expected)
        reason = 'Branch changed since it was recorded; retained for inspection'
      else if (worktrees.has(branch.name)) reason = 'Branch is checked out in a worktree'
      else if (!contains(current)) reason = 'Branch commits are not included in the merge target'
      else {
        try {
          runGit(root, ['branch', '-d', '--', branch.name], operation)
        } catch (error) {
          reason = error instanceof Error ? error.message : String(error)
        }
      }
    }
    operation.cleanup.push({
      branch: branch.name,
      status: reason ? 'retained' : current ? 'deleted' : 'missing',
      ...(reason ? { reason } : {}),
    })
    log(
      operation,
      reason ? 'warning' : 'info',
      `${branch.name}: ${reason ?? (current ? 'deleted' : 'already absent')}`,
    )
  }
  const retained = operation.cleanup.filter((entry) => entry.status === 'retained')
  operation.status = retained.length ? 'merged' : 'complete'
  operation.phase = retained.length ? 'cleanup' : 'done'
  saveOperation(operation)
  if (retained.length)
    throw new Error(
      'Merge succeeded; some branches were retained. Inspect .import.lock.json and rerun vendor:merge to retry cleanup.',
    )
}

export function mergeImport(name?: string) {
  const ledger = readLedger(true)
  const matches = ledger.operations.filter((operation) =>
    name
      ? operation.branches.review?.name === name
      : operation.branches.review && operation.status !== 'complete',
  )
  if (matches.length !== 1)
    throw new Error(
      matches.length
        ? 'Several imports are pending; specify a recorded review branch'
        : 'No matching pending import review branch in .import.lock.json',
    )
  const operation = matches[0]!
  clean()
  const target = git(root, 'symbolic-ref', '--short', 'HEAD')
  if (
    target === 'vendor/upstream' ||
    target.startsWith('vendor/candidate-') ||
    target.startsWith('update/upstream-')
  )
    throw new Error(
      'Switch to your target branch before merging an import; service branches cannot be merge targets',
    )
  if (operation.merge && operation.merge.target !== target)
    throw new Error(`This merge was started on ${operation.merge.target}; switch there to resume`)
  if (operation.status === 'complete') {
    console.log('This import was already merged and cleaned up.')
    return
  }
  const review = operation.branches.review!
  const candidate = operation.branches.candidate
  if (!candidate) throw new Error('Import record has no candidate baseline; refusing to merge')
  if (operation.merge?.commit) {
    if (!contains(operation.merge.commit) || !contains(operation.merge.sourceCommit))
      throw new Error('The recorded merge is no longer included in this target; refusing cleanup')
  } else {
    const head = tip(review.name)
    if (!head) throw new Error(`Missing local review branch ${review.name}; refusing to merge`)
    if (!contains(review.commit, head) || !contains(candidate.commit, head))
      throw new Error(
        'Review branch does not include its recorded import baseline; resolve and commit the import merge first',
      )
    if (operation.merge && operation.merge.sourceCommit !== head)
      throw new Error(
        'Review branch changed during the merge; inspect the recorded operation before retrying',
      )
    operation.merge = { target, sourceCommit: head }
    operation.phase = 'merge'
    operation.status = 'running'
    saveOperation(operation)
    try {
      // An already resolved manual merge needs only cleanup.
      if (!contains(head)) mergeBaseline(root, `refs/heads/${review.name}`, operation)
    } catch (error) {
      operation.status = 'conflicted'
      log(
        operation,
        'error',
        `Merge failed; no branches were deleted. Resolve and commit, then rerun vendor:merge ${review.name}. ${String(error)}`,
      )
      throw error
    }
    operation.merge.commit = git(root, 'rev-parse', 'HEAD')
    operation.status = 'merged'
    saveOperation(operation)
  }
  cleanup(operation)
  console.log(`Merged ${review.name} into ${target} and cleaned up its service branches.`)
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2)
    if (args.length > 1 || args.some((arg) => arg.startsWith('-')))
      throw new Error('Usage: vendor:merge [review-branch]')
    mergeImport(args[0])
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
