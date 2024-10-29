import React from 'react'
import { Button } from '@mui/material'
import MicrosoftIcon from '@components/helpers/Icons/MicrosoftIcon'
import { useAuthDialog } from '@components/hooks/useAuthDialog'

const MsLoginBtn = () => {
  const { openLoginDialog } = useAuthDialog()

  return (
    <Button
      variant='contained'
      onClick={() => openLoginDialog()}
      sx={{
        textTransform: 'none',
        fontSize: '1.1em',
        fontWeight: 500,
        backgroundColor: '#2F2F2F',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#2F2F2F'
        },
        borderRadius: '2px'
      }}
      startIcon={<MicrosoftIcon />}
    >
      Sign in with Microsoft
    </Button>
  )
}

export default MsLoginBtn
