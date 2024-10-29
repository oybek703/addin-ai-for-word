import * as React from 'react'
import { IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Button from '@mui/material/Button'
import { ISxStyles } from '@interfaces/styles.interface'
import { Colors } from '@components/layout/theme'

const styles: ISxStyles = {
  alertBox: {
    border: '1px solid black',
    borderRadius: 10,
    padding: '10px 40px',
    maxWidth: '250px',
    margin: '10vh auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    backgroundColor: Colors.grey
  },
  reloadBtn: {
    backgroundColor: '#7794aa !important'
  }
}

const ErrorAlert = () => {
  function handleClick() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Grid sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
      <Grid sx={styles.alertBox} container>
        <IconButton size='medium'>
          <ErrorOutlineIcon color='error' fontSize='medium' />
        </IconButton>
        <Typography variant='h6' align='center' color='error'>
          Something went wrong!
        </Typography>
      </Grid>
      <Typography sx={{ mb: '15px' }} align='center'>
        <Button variant='outlined' component='span' disabled color='primary'>
          Please check your connection
        </Button>
      </Typography>
      <Grid container justifyContent='center'>
        <Button onClick={handleClick} sx={styles.reloadBtn} variant='contained'>
          Refresh
        </Button>
      </Grid>
    </Grid>
  )
}

export default ErrorAlert
