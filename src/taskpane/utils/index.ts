import { IAICredits, IUserInfo } from '@interfaces/app.interfaces'

export const generateRequestId = () =>
  '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  )

export const getAvatarText = (userInfo: IUserInfo) => {
  const firstName = userInfo?.firstName
  const lastName = userInfo?.lastName
  const email = userInfo?.email
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`
  if (!firstName && email) return email[0]
  return 'U'
}

export const calculateAiCredits = (aiCreditsData: IAICredits) => {
  let aiCredits = +aiCreditsData.refill
  aiCredits += +aiCreditsData.monthly
  return aiCredits.toFixed(5)
}

export const getValidEmail = (msUserMail: string, userPrincipalName: string) => {
  if (String(msUserMail).includes('@')) return msUserMail
  return userPrincipalName
}
