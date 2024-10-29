import PQueue from 'p-queue'
import { ConcurrentRequests, LOCAL_DATA_KEYS } from '@utils/constants'

function createQueue(concurrency: number) {
  return new PQueue({
    concurrency: concurrency || ConcurrentRequests.default,
    // Set timeout to 20 minutes by default
    timeout: 20 * 60000,
    throwOnTimeout: true
  })
}

let concurrentRequests = +localStorage.getItem(LOCAL_DATA_KEYS.concurrentRequests)

export let globalQueue = createQueue(concurrentRequests)

export function updateConcurrency(newConcurrency: number) {
  const updatedConcurrency = newConcurrency > ConcurrentRequests.max ? ConcurrentRequests.max : ConcurrentRequests.min
  if (concurrentRequests !== updatedConcurrency) {
    localStorage.setItem(LOCAL_DATA_KEYS.concurrentRequests, updatedConcurrency.toString())
    globalQueue = createQueue(updatedConcurrency)
    concurrentRequests = updatedConcurrency
  }
}
