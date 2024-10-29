import { COMMON_MESSAGES, DialogSource } from '@utils/constants'
import { useAppStore } from '@components/store/app.store'

export const useDialogEvent = (dialogSource: DialogSource) => {
  const { setSnackbar } = useAppStore()

  function processDialogEvent(args: Office.DialogParentMessageReceivedEventArgs) {
    if ('error' in args) {
      switch (args.error) {
        case 12002:
          console.log('The dialog was closed by the user')
          break
        case 12003:
          console.log('The dialog box was directed to a URL with the HTTP protocol. HTTPS is required.')
          break
        case 12006:
          console.log('The dialog was closed')
          break
        default:
          setSnackbar({ message: `An error occurred: ${args.error}`, open: true, severity: 'error' })
          console.error(`Error in dialog ${dialogSource}`)
      }
    }
  }

  function handleFailedDialogDisplay(result: Office.AsyncResult<Office.Dialog>) {
    switch (result.error.code) {
      case 12004:
        console.log('Domain is not trusted')
        break
      case 12005:
        console.log('HTTPS is required')
        break
      case 12007:
        setSnackbar({ message: COMMON_MESSAGES.dialogAlreadyOpened, open: true, severity: 'info' })
        break
      case 12009:
        setSnackbar({ message: COMMON_MESSAGES.dialogIgnored, open: true, severity: 'error' })
        break
      case 12011:
        setSnackbar({ message: COMMON_MESSAGES.popUpBlocked, open: true, severity: 'error' })
        break
      default:
        setSnackbar({
          message: `An error occurred: ${result.error.code} ${result.error.message}`,
          open: true,
          severity: 'error'
        })
        console.error(`Error in dialog ${dialogSource}`)
        break
    }
  }

  return { processDialogEvent, handleFailedDialogDisplay }
}
