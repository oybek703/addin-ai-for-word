import React from 'react'
import { useAppStore } from '@components/store/app.store'
import { SignInReason } from '@utils/constants'
import { Dialog, DialogTitle, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Colors, myCustomFont } from '@components/layout/theme'
import CloseIcon from '@mui/icons-material/Close'
import DialogContent from '@mui/material/DialogContent'
import MsLoginBtn from '@components/auth/MsLoginBtn'

const SignInDialog = () => {
  const { openSignInDialog, setOpenSignInDialog } = useAppStore()
  const handleClose = () => setOpenSignInDialog({ open: false, reason: null })
  const isReasonSingIn = openSignInDialog.reason === SignInReason.signIn
  return (
    <Dialog
      PaperProps={{ sx: { borderRadius: '10px', maxWidth: '300px' } }}
      open={openSignInDialog.open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        ></Box>
        <Typography
          variant='h5'
          component='p'
          sx={{
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '36px',
            fontFamily: myCustomFont,
            mt: '16px',
            mb: isReasonSingIn ? '-4px' : '-2px',
            lineHeight: 0.8,
            whiteSpace: 'nowrap'
          }}
        >
          {isReasonSingIn ? 'Sign In' : 'Plan purchase'}
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          color: theme => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ width: '90%', p: '10px 15px', mb: '10px ' }}>
        <Box display={'flex'} flexDirection={'column'}>
          {!isReasonSingIn && (
            <Typography
              align='center'
              sx={{
                fontSize: '16px',
                display: 'inline-block',
                fontWeight: 500,
                lineHeight: '28px',
                letterSpacing: '0.15px',
                mb: '12px',
                color: Colors.main
              }}
              component='span'
            >
              Sign in to continue
            </Typography>
          )}
          <Typography
            align='center'
            sx={{
              fontSize: '14px',
              color: Colors.iconColor,
              mb: '24px',
              lineHeight: '24px',
              px: '3px',
              letterSpacing: '0.17px'
            }}
            component='span'
          >
            Use your Microsoft account to sign in{!isReasonSingIn && ' and subscribe'}.
          </Typography>

          <Box display={'flex'} justifyContent={'center'}>
            <MsLoginBtn />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog
