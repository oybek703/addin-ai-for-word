import { generateRequestId } from '@utils/index'
import { ConcurrentRequests, defaultFreeExecutions, LOCAL_DATA_KEYS, UserPlans } from '@utils/constants'

export const defaultAppState = {
  userPlan: UserPlans.free,
  freeExecutions: defaultFreeExecutions,
  requestId: generateRequestId(),
  concurrentRequests: ConcurrentRequests.default
}

// Set all default values if not set in localStorage
export const setStoreDefaultValues = () => {
  if (!localStorage.getItem(LOCAL_DATA_KEYS.userPlan))
    localStorage.setItem(LOCAL_DATA_KEYS.userPlan, defaultAppState.userPlan)
  if (!localStorage.getItem(LOCAL_DATA_KEYS.freeExecutions))
    localStorage.setItem(LOCAL_DATA_KEYS.freeExecutions, String(defaultAppState.freeExecutions))
  if (!localStorage.getItem(LOCAL_DATA_KEYS.requestId))
    localStorage.setItem(LOCAL_DATA_KEYS.requestId, defaultAppState.requestId)
  if (!localStorage.getItem(LOCAL_DATA_KEYS.concurrentRequests))
    localStorage.setItem(LOCAL_DATA_KEYS.concurrentRequests, String(defaultAppState.concurrentRequests))
}
