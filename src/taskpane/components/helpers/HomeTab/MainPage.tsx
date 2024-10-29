import React, { Fragment } from 'react'
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import StepperDialog from '@components/helpers/HomeTab/StepperDialog'

const Main = () => {
  return (
    <Fragment>
      <Grid container sx={{ display: 'flex', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontFamily: 'Trebuchet MS, sans-serif',
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '32px',
              mb: '10px'
            }}
          >
            AI | ChatGPT for Word!
          </Typography>
        </Box>
      </Grid>
      <StepperDialog />
    </Fragment>
  )
}

export default Main
