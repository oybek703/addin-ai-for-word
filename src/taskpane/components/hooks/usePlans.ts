import { LOCAL_DATA_KEYS, UserPlans } from '@utils/constants'
import { useAppStore } from '@components/store/app.store'

export const usePlans = () => {
  const { userPlan, updateUserPlan } = useAppStore()

  const checkUserPlan = () => {
    const userPlanInLocal = localStorage.getItem(LOCAL_DATA_KEYS.userPlan) as UserPlans
    if (userPlanInLocal === UserPlans.basic && userPlan === UserPlans.pro) {
      updateUserPlan(UserPlans.basic)
      window.location.reload()
    }
  }

  return {
    checkUserPlan
  }
}
