import React, { FC } from 'react'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import { useAppStore } from '@components/store/app.store'

const MessageSnackbar: FC = () => {
  const { snackbar, setSnackbar } = useAppStore()
  if (!snackbar.message) return null
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={snackbar.open}
      onClose={() => setSnackbar({ open: false, message: '' })}
    >
      <Alert sx={{ fontSize: '0.95em', '&.MuiAlert-icon': { alignItems: 'center' } }} severity={snackbar.severity}>
        {snackbar.message}{' '}
      </Alert>
    </Snackbar>
  )
}

export default MessageSnackbar
