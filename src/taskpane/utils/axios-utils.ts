import axios, { AxiosError, AxiosResponse } from 'axios'
import { API_URL, LOCAL_DATA_KEYS, UserPlans } from '@utils/constants'
import { IUpsertMsUser } from '@interfaces/api-res.interfaces'
import { IApiUser } from '@interfaces/app.interfaces'

const axiosInstance = axios.create({
  baseURL: API_URL
})

/**
 * Checks an app version from axios headers and update if different in localstorage
 * @param {AxiosResponse} response - Axios response
 * @return {void}
 */
function checkAppVersion(response: AxiosResponse): void {
  try {
    const appVersion = response?.headers[LOCAL_DATA_KEYS.appVersion]
    if (appVersion) {
      let appOldVersion = localStorage.getItem(LOCAL_DATA_KEYS.appOldVersion)
      if (!appOldVersion) {
        appOldVersion = appVersion
        localStorage.setItem(LOCAL_DATA_KEYS.appOldVersion, appOldVersion)
      }
      localStorage.setItem(LOCAL_DATA_KEYS.appVersion, appVersion)
      const updateRequired = appOldVersion === appVersion ? 'false' : 'true'
      localStorage.setItem(LOCAL_DATA_KEYS.updateRequired, updateRequired)
    }
  } catch (e) {
    console.error('Error while axios request app-version interceptor: ', e)
  }
}

/**
 * Update left OpenAI credits and free executions for user in localstorage
 * @param {AxiosResponse} response - Axios response
 * @return {void}
 */
function checkLeftCreditsAndFreeExecutions(response: AxiosResponse): void {
  try {
    const leftAiCredits = response?.headers[LOCAL_DATA_KEYS.aiCredits]
    const leftFreeExecutions = response?.headers[LOCAL_DATA_KEYS.freeExecutions]
    if (leftAiCredits || leftAiCredits === 0) localStorage.setItem(LOCAL_DATA_KEYS.aiCredits, leftAiCredits)
    if (leftFreeExecutions || leftFreeExecutions === 0)
      localStorage.setItem(LOCAL_DATA_KEYS.freeExecutions, leftFreeExecutions)
  } catch (e) {
    console.error('Error while axios request interceptor in checking AI credits and executions: ', e)
  }
}

/* Axios's response interceptor for checking app-version and forbidden requests */
axiosInstance.interceptors.response.use(
  function (response) {
    checkLeftCreditsAndFreeExecutions(response)
    checkAppVersion(response)
    return response
  },
  function (error) {
    if (error instanceof AxiosError) {
      checkLeftCreditsAndFreeExecutions(error.response)
      checkAppVersion(error.response)
      if (error?.response?.status === 403) {
        const userPlanInLocal = localStorage.getItem(LOCAL_DATA_KEYS.userPlan) as UserPlans
        if (userPlanInLocal === UserPlans.pro || userPlanInLocal === UserPlans.starter) {
          localStorage.setItem(LOCAL_DATA_KEYS.userPlan, UserPlans.basic)
          localStorage.setItem(LOCAL_DATA_KEYS.reloadRequired, String(true))
        }
      }
    }
    return Promise.reject(error)
  }
)

/* Axios's request interceptor for adding required headers */
axiosInstance.interceptors.request.use(function (config) {
  config.headers.set(LOCAL_DATA_KEYS.appVersion, localStorage.getItem(LOCAL_DATA_KEYS.appVersion))
  config.headers.set(LOCAL_DATA_KEYS.userPlan, localStorage.getItem(LOCAL_DATA_KEYS.userPlan))
  config.headers.set(LOCAL_DATA_KEYS.requestId, localStorage.getItem(LOCAL_DATA_KEYS.requestId))
  return config
})

/**
 * Get user data from db
 * @return {IApiUser} - User info
 * @param email
 */
export const getUserData = async (email: string): Promise<IApiUser | null> => {
  try {
    const { data } = await axiosInstance.get<IApiUser>('/subscriber', {
      params: { email }
    })
    return data
  } catch (e: unknown) {
    console.error('Error while getting subscriber data: ', e)
    return null
  }
}

/**
 * Insert or update Microsoft user
 * @param {IUpsertMsUser} params - Required params
 * @return {IApiUser} - User info
 */
export const upsertMicrosoftUser = async (params: IUpsertMsUser): Promise<IApiUser> => {
  try {
    const { data } = await axiosInstance.put<IApiUser>('/subscriber', params)
    return data
  } catch (e) {
    console.log('params[userPrincipalName-data] => ', JSON.stringify(params, null, 2))
    console.error('Error while upserting Microsoft user: ', e)
    throw e
  }
}

export default axiosInstance
