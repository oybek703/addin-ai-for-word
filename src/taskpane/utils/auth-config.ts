import { Configuration, PublicClientApplication } from '@azure/msal-browser'
import { AZURE_APP_CLIENT_ID, dialogURLs } from '@utils/constants'

// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: AZURE_APP_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: dialogURLs.login // Must be registered as "spa" type
  },
  cache: {
    cacheLocation: 'localStorage', // needed to avoid "login required" error
    storeAuthStateInCookie: true // recommended to avoid certain IE/Edge issues
  }
}

const msalInstance = new PublicClientApplication(configuration)

export default msalInstance
