import axios from 'axios'
import './loader.css'
import { getValidEmail } from '@utils/index'
import msalInstance from '@utils/auth-config'
import { AuthStatus, IMSAuthErrorResult, IMSAuthResult, IMsGraphUser } from '@utils/constants'
;(async () => {
  // The initialize function must be run each time a new page is loaded
  await Office.onReady(() => {
    msalInstance.initialize().then(async () =>
      // handleRedirectPromise should be invoked on every page load
      msalInstance
        .handleRedirectPromise()
        .then(async response => {
          // If the response is non-null, it means the page is returning from AAD with a successful response
          if (response) {
            const { data: userData } = await axios.get<IMsGraphUser>(
              `https://graph.microsoft.com/v1.0/users/${response?.uniqueId}?$select=givenName,surname,userPrincipalName,mail,identities`,
              {
                headers: { Authorization: `Bearer ${response.accessToken}` }
              }
            )
            const result: IMSAuthResult = {
              firstName: userData.givenName,
              lastName: userData.surname,
              email: getValidEmail(userData?.mail, userData?.userPrincipalName),
              accessToken: response.accessToken,
              // @ts-ignore
              _tempData: { userData, oldEmail: response?.account?.username }
            }
            Office.context.ui.messageParent(JSON.stringify({ status: AuthStatus.success, result }))
          }
          // Otherwise, invoke login
          else
            await msalInstance.loginRedirect({
              scopes: ['user.read']
            })
        })
        .catch(error => {
          console.error('Auth error: ', error)
          const errorResult: IMSAuthErrorResult = {
            errorCode: error.errorCode,
            errorMessage: error.errorMessage
          }
          Office.context.ui.messageParent(JSON.stringify({ status: AuthStatus.failure, result: errorResult }))
        })
    )
  })
})()
