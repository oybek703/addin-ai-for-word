import { ActiveTabs, GPT_AI_METHODS, UserPlans } from '@utils/constants'
import { JSX, ReactElement } from 'react'
import { AlertColor } from '@mui/material/Alert'
import { SnackbarContentProps } from '@mui/material/SnackbarContent'

export interface IOfficeInitialized {
  isOfficeInitialized: boolean
}

export interface INavigation {
  label: string
  content?: ReactElement
  icon: ReactElement
  tab: ActiveTabs
  link?: string
}

export interface IUserInfo {
  email?: string
  firstName?: string
  lastName?: string
}

export interface ISnackbarProps {
  open: boolean
  message?: string | JSX.Element
  severity?: AlertColor
  action?: SnackbarContentProps['action']
}

export interface IBackdrop {
  open: boolean
  closeOnClick?: boolean
}

export type IUpdateUserPlan = (newPlan: UserPlans) => void

export interface IAICredits {
  monthly: number
  refill?: number
}

export interface IApiUser {
  email: string
  first_name: string
  last_name: string
  plan?: UserPlans
  old_plan?: UserPlans | null
  freeExecutions?: number
}

export interface IFuncParams {}

export interface ICallAPIOptions<T extends IFuncParams> {
  functionName: GPT_AI_METHODS
  gptInput: T
}
