import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { myCustomFont } from '@components/layout/theme'
import GetStartedStepper from '@components/helpers/HomeTab/GetStartedStepper'
import { useAppStore } from '@components/store/app.store'

export default function StepperDialog() {
  const { viewGetStarted, updateViewGetStarted } = useAppStore()
  const dialogStatus = !Boolean(viewGetStarted)
  const handleClose = () => updateViewGetStarted(true)
  return (
    <Dialog
      PaperProps={{ sx: { borderRadius: '10px' } }}
      open={dialogStatus}
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
        >
          <CloseIcon
            fontSize='small'
            sx={{ cursor: 'pointer', position: 'absolute', right: '5px', top: '5px' }}
            onClick={handleClose}
          />
        </Box>
        <Typography
          variant='h5'
          component='p'
          sx={{
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '36px',
            fontFamily: myCustomFont,
            mt: '16px',
            mb: '10px',
            lineHeight: 0.8,
            whiteSpace: 'nowrap'
          }}
        >
          How to Get Started
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ width: '90%', p: '10px 15px' }}>
        <GetStartedStepper />
      </DialogContent>
    </Dialog>
  )
}
