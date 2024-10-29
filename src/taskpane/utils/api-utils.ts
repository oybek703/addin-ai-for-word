import { AppHeaders, ConcurrentRequests, GPT_AI_METHODS, LOCAL_DATA_KEYS, UserPlans } from '@utils/constants'
import { ICallAPIOptions, IFuncParams } from '@interfaces/app.interfaces'
import { globalQueue, updateConcurrency } from '@utils/batch'
import axiosInstance from '@utils/axios-utils'
import { AxiosError } from 'axios'

export async function callAPI<T extends IFuncParams>(functionName: GPT_AI_METHODS, input: T) {
  const email = localStorage.getItem(LOCAL_DATA_KEYS.email)
  const options: ICallAPIOptions<T> = { functionName, gptInput: { ...input, email } }
  return batchCallAPI<T>(options)
}

async function batchCallAPI<T extends IFuncParams>(options: ICallAPIOptions<T>) {
  const { functionName, gptInput } = options

  try {
    return await globalQueue.add(async () => {
      const response = await axiosInstance.post(`/api/v1/process`, gptInput, {
        headers: {
          'X-Api-Key': localStorage.getItem(LOCAL_DATA_KEYS.apiKey),
          'Content-Type': 'application/json'
        }
      })
      const userPlan = response.config.headers.get(AppHeaders.userPlan)
      let remainingRequests = +response.headers[AppHeaders.remainingRequests]
      if (userPlan === UserPlans.free) remainingRequests = ConcurrentRequests.default
      if (userPlan === UserPlans.starter) remainingRequests = ConcurrentRequests.max
      // define concurrency based on remaining requests
      updateConcurrency(remainingRequests)
      return returnResponse(response.data)
    })
  } catch (e: unknown) {
    const error = `${e}`.includes('TimeoutError') ? 'Timeout error.' : e
    console.error(`Error while sending batch request ${functionName}: `, e)
    if (e instanceof AxiosError) return showAxiosError(e)
    return `ERROR: ${error}`
  }
}

async function returnResponse(data: unknown[]) {
  const noResultsMessage = 'No results to display.'
  if (!data) return noResultsMessage

  if (data?.length == 0) return [[noResultsMessage]]
  if (data.length) {
    let isArrayEmpty = data.every((innerArray: string) => Array.isArray(innerArray) && innerArray.length === 0)
    if (isArrayEmpty) return [[noResultsMessage]]
  }
  return data
}

function showAxiosError(e: AxiosError<{ message: string }>) {
  return `ERROR: ${e.response.data.message}`
}
