import { useDialogEvent } from '@components/hooks/useDialogEvent'
import {
  AuthStatus,
  COMMON_MESSAGES,
  DialogSource,
  dialogURLs,
  IMSAuthErrorResult,
  IMSAuthResult,
  LOCAL_DATA_KEYS
} from '@utils/constants'
import { generateRequestId } from '@utils/index'
import { upsertMicrosoftUser } from '@utils/axios-utils'
import { useAppStore } from '@components/store/app.store'

export const useAuthDialog = () => {
  const {
    setIsLoggedIn,
    setOpenSignInDialog,
    setSnackbar,
    requestId,
    setBackdrop,
    updateUserData,
    viewGetStarted,
    updateViewGetStarted
  } = useAppStore()

  const { handleFailedDialogDisplay, processDialogEvent } = useDialogEvent(DialogSource.auth)

  const processAuthDialogEvent = (args: Office.DialogParentMessageReceivedEventArgs) => {
    processDialogEvent(args)
    setBackdrop({ open: false })
  }

  type CallbackFunction = (arg: object | null) => void

  const openLoginDialog = (cb?: CallbackFunction) => {
    let loginDialog: Office.Dialog

    if (!Office?.context?.ui)
      return setSnackbar({ message: COMMON_MESSAGES.officeIsNotFullyLoaded, open: true, severity: 'error' })

    setBackdrop({ open: true, closeOnClick: false })

    Office.context.ui.displayDialogAsync(dialogURLs.login, { height: 40, width: 30 }, result => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        handleFailedDialogDisplay(result)
        setBackdrop({ open: false })
      } else {
        loginDialog = result.value
        loginDialog.addEventHandler(Office.EventType.DialogMessageReceived, processLoginMessage)
        loginDialog.addEventHandler(Office.EventType.DialogEventReceived, processAuthDialogEvent)
      }
    })

    const processLoginMessage = async (arg: { message: string; origin: string }) => {
      let messageFromDialog = JSON.parse(arg.message)
      if (messageFromDialog.status !== AuthStatus.success) {
        const authErrorResult: IMSAuthErrorResult = messageFromDialog.result
        console.log(authErrorResult)
        // Something went wrong with authentication or the authorization of the web application.
        loginDialog.close()
        console.error('Error while signing in user with Microsoft: ', authErrorResult)
        setBackdrop({ open: false })
        setSnackbar({
          open: true,
          message: authErrorResult.errorMessage || COMMON_MESSAGES.somethingWentWrong,
          severity: 'error'
        })
        if (cb) cb(null)
      } else {
        // We now have a valid access token.
        const authResult: IMSAuthResult = messageFromDialog.result
        let userRequestId = requestId || localStorage.getItem(LOCAL_DATA_KEYS.requestId)
        // If requestId doesn't exist in localStorage for some reason, generate one
        if (!userRequestId) userRequestId = generateRequestId()
        localStorage.setItem(LOCAL_DATA_KEYS.requestId, userRequestId)
        const userData = await upsertMicrosoftUser({
          email: authResult.email,
          firstName: authResult.firstName,
          lastName: authResult.lastName,
          requestId,
          // @ts-ignore
          _tempData: authResult?._tempData
        })
        if (!viewGetStarted) updateViewGetStarted(true)
        if (userData) updateUserData(userData)
        setIsLoggedIn(true)
        setBackdrop({ open: false, closeOnClick: true })
        setOpenSignInDialog({ open: false, reason: null })
        loginDialog.close()
        if (cb) cb({ email: userData.email, plan: userData.plan })
      }
    }
  }

  const logoutUser = async () => {
    try {
      localStorage.clear()
      setTimeout(() => window.location.reload(), 200)
    } catch (e) {
      console.error('Error while logging out user with Microsoft: ', e)
      setSnackbar({ open: true, message: 'Error while sign out!', severity: 'error' })
    }
  }

  return { openLoginDialog, logoutUser }
}
