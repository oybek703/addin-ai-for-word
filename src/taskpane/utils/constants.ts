export const API_URL = process.env.API_URL
export const APP_URL = process.env.APP_URL
export const AZURE_APP_CLIENT_ID = process.env.AZURE_APP_CLIENT_ID

export enum GPT_AI_METHODS {
  process = 'process'
}

export enum LOCAL_DATA_KEYS {
  updateRequired = 'update-required',
  reloadRequired = 'reload-required',
  appVersion = 'app-version',
  appOldVersion = 'app-old-version',
  freeExecutions = 'free-executions',
  userPlan = 'user-plan',
  apiKey = 'apiKey',
  email = 'email',
  requestId = 'request-id',
  firstName = 'firstName',
  lastName = 'lastName',
  viewGetStarted = 'viewGetStarted',
  concurrentRequests = 'concurrent-requests',
  trialEndedShown = 'trial-ended-shown'
}

export enum AppHeaders {
  remainingRequests = 'x-remaining-requests',
  userPlan = 'user-plan'
}

export enum ActiveTabs {
  home,
  premium,
  settings,
  external
}

export enum UserPlans {
  free = 'free',
  starter = 'starter',
  basic = 'basic',
  pro = 'pro'
}

export enum COMMON_MESSAGES {
  popUpBlocked = 'Popup blocked. Adjust browser settings or try a different browser.',
  dialogIgnored = 'Please allow the dialog to proceed.',
  dialogAlreadyOpened = 'Dialog already opened',
  officeIsNotFullyLoaded = 'Office is not loaded fully.',
  somethingWentWrong = 'Something went wrong. Please try again.'
}

export enum ExternalLinks {
  privacyPolicy = 'https://shhapps.com/privacy-policy-add-in',
  fulfillmentPolicy = 'https://shhapps.com/fulfillment-policy'
}

export enum ConcurrentRequests {
  min = 5,
  default = 25,
  max = 500
}

export enum SignInReason {
  signIn = 'sign-in',
  payment = 'payment'
}

export enum DialogSource {
  auth = 'auth'
}

export const dialogURLs = {
  login: `${APP_URL}/login.html`
}

export enum AuthStatus {
  success = 'success',
  failure = 'failure'
}

export interface IMSAuthResult {
  firstName?: string
  lastName?: string
  email: string
  accessToken: string
}

export interface IMSAuthErrorResult {
  errorCode: string
  errorMessage?: string
}

export interface IMsGraphUser {
  businessPhones: string[]
  displayName: string
  givenName: string
  jobTitle: string
  mail: string
  mobilePhone?: string
  officeLocation: string
  preferredLanguage: string
  surname: string
  userPrincipalName: string
  id: string
}

export enum ActivePages {
  main = 'main'
}

export const defaultFreeExecutions = 500
