import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { setStoreDefaultValues } from '@utils/store'
import { ActivePages, ActiveTabs, LOCAL_DATA_KEYS, UserPlans } from '@utils/constants'
import { IApiUser, IBackdrop, ISnackbarProps, IUpdateUserPlan, IUserInfo } from '@interfaces/app.interfaces'
import { generateRequestId } from '@utils/index'

export interface IAppState {
  activeTab: ActiveTabs
  setActiveTab: (activeTab: ActiveTabs) => void
  userInfo: IUserInfo
  updateUserData: (userData: IApiUser) => void
  freeExecutions: number
  updateFreeExecutions: (freeExecutions: number) => void
  userPlan: UserPlans
  updateUserPlan: IUpdateUserPlan
  oldPlan?: UserPlans
  requestId: string
  snackbar?: ISnackbarProps
  setSnackbar?: (data: ISnackbarProps) => void
  backdrop?: IBackdrop
  setBackdrop?: (backdrop?: IBackdrop) => void
  viewGetStarted?: boolean
  updateViewGetStarted?: (viewGetStarted: boolean) => void
  isDrawerOpen?: boolean
  setIsDrawerOpen?: (isDrawerOpen: boolean) => void
  showTrialEnded?: boolean
  setShowTrialEnded?: (showTrialEnded?: boolean) => void
  trialEndedShown?: boolean
  updateTrialEndedShown?: (trialEndedShown: boolean) => void
  isLoggedIn?: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void
  openSignInDialog?: { open: boolean; reason?: string | null }
  setOpenSignInDialog?: (openSignInDialog: { open: boolean; reason?: string | null }) => void
  activePage: ActivePages
  setActivePage: (activePage: ActivePages) => void
}

setStoreDefaultValues()

export const useAppStore = create<IAppState>()(
  devtools(
    (set, get) => ({
      activeTab: ActiveTabs.home,
      setActiveTab: newTab => set({ activeTab: newTab }),
      userInfo: {
        email: localStorage.getItem(LOCAL_DATA_KEYS.email),
        lastName: localStorage.getItem(LOCAL_DATA_KEYS.lastName),
        firstName: localStorage.getItem(LOCAL_DATA_KEYS.firstName)
      },
      updateUserData: userData => {
        const state = get()
        const newUserInfo: IUserInfo = {
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email
        }
        if (userData.email) {
          localStorage.setItem(LOCAL_DATA_KEYS.email, userData.email)
          set({ userInfo: { ...newUserInfo, email: userData.email } })
        }
        if (userData.first_name) {
          localStorage.setItem(LOCAL_DATA_KEYS.firstName, userData.first_name)
          set({ userInfo: { ...newUserInfo, firstName: userData.first_name } })
        }
        if (userData.last_name) {
          localStorage.setItem(LOCAL_DATA_KEYS.lastName, userData.last_name)
          set({ userInfo: { ...newUserInfo, lastName: userData.last_name } })
        }
        if (userData.freeExecutions || +userData.freeExecutions === 0)
          state.updateFreeExecutions(userData.freeExecutions)
        if (userData.plan) state.updateUserPlan(userData.plan || UserPlans.basic)
        if (userData.old_plan || userData.old_plan === null) set({ oldPlan: userData.old_plan })
      },
      freeExecutions: +localStorage.getItem(LOCAL_DATA_KEYS.freeExecutions),
      updateFreeExecutions: freeExecutions => {
        const { freeExecutions: freeExecutionsInState } = get()
        localStorage.setItem(LOCAL_DATA_KEYS.freeExecutions, String(freeExecutions))
        if (+freeExecutions !== freeExecutionsInState) set({ freeExecutions })
      },
      userPlan: (localStorage.getItem(LOCAL_DATA_KEYS.userPlan) as UserPlans) || UserPlans.free,
      updateUserPlan: newPlan => {
        localStorage.setItem(LOCAL_DATA_KEYS.userPlan, newPlan)
        set({ userPlan: newPlan })
      },
      requestId: localStorage.getItem(LOCAL_DATA_KEYS.requestId) || generateRequestId(),
      snackbar: { open: false },
      setSnackbar: snackbar => set({ snackbar }),
      backdrop: { open: false, closeOnClick: true },
      setBackdrop: backdrop => {
        if (backdrop.closeOnClick !== false) set({ backdrop: { open: backdrop.open, closeOnClick: true } })
        else set({ backdrop: { open: backdrop.open, closeOnClick: backdrop.closeOnClick } })
      },
      viewGetStarted: localStorage.getItem(LOCAL_DATA_KEYS.viewGetStarted) == 'true' || false,
      updateViewGetStarted: viewGetStarted => {
        localStorage.setItem(LOCAL_DATA_KEYS.viewGetStarted, String(viewGetStarted))
        set({ viewGetStarted: true })
      },
      isDrawerOpen: false,
      setIsDrawerOpen: isDrawerOpen => set({ isDrawerOpen }),
      showTrialEnded:
        localStorage.getItem(LOCAL_DATA_KEYS.freeExecutions) == '0' &&
        localStorage.getItem(LOCAL_DATA_KEYS.userPlan) == 'free',
      setShowTrialEnded: showTrialEnded => set({ showTrialEnded }),
      trialEndedShown: localStorage.getItem(LOCAL_DATA_KEYS.trialEndedShown) == 'true' || false,
      updateTrialEndedShown: trialEndedShown => {
        localStorage.setItem(LOCAL_DATA_KEYS.trialEndedShown, String(trialEndedShown))
        set({ trialEndedShown })
      },
      setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
      openSignInDialog: { open: false },
      setOpenSignInDialog: openSignInDialog => set({ openSignInDialog }),
      activePage: ActivePages.main,
      setActivePage: activePage => set({ activePage: activePage })
    }),
    { name: `AI | ChatGPT for Word ${process.env.NODE_ENV === 'development' ? 'Local' : ''}` }
  )
)
