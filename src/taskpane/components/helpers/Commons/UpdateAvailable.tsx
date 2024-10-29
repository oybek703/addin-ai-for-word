import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import Slide, { SlideProps } from '@mui/material/Slide'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import { LOCAL_DATA_KEYS } from '@utils/constants'

function SlideTransition(props: SlideProps) {
  return (
    <Slide {...props} direction='down'>
      {props.children}
    </Slide>
  )
}

const localUpdateStatus = localStorage.getItem(LOCAL_DATA_KEYS.updateRequired)
const localReloadStatus = localStorage.getItem(LOCAL_DATA_KEYS.reloadRequired)

enum Timer {
  initialTime = 10,
  endTime = 1
}

export default function UpdateAvailable() {
  const [timeLeft, setTimeLeft] = useState(Timer.initialTime)
  const reloadIntervalRef = useRef<string | number | NodeJS.Timeout>()
  const [updateRequired, setUpdateRequired] = useState(JSON.parse(localUpdateStatus) || false)
  const [reloadRequired, setReloadRequired] = useState(JSON.parse(localReloadStatus) || false)

  function checkAppUpdate() {
    setUpdateRequired(JSON.parse(localStorage.getItem(LOCAL_DATA_KEYS.updateRequired)) || false)
  }

  function checkReloadStatus() {
    setReloadRequired(JSON.parse(localStorage.getItem(LOCAL_DATA_KEYS.reloadRequired)) || false)
  }

  const handleClose = () => {
    setTimeLeft(Timer.initialTime)
    setUpdateRequired(false)
  }

  const handleReload = () => {
    const appVersion = localStorage.getItem(LOCAL_DATA_KEYS.appVersion)
    localStorage.setItem(LOCAL_DATA_KEYS.appOldVersion, appVersion)
    localStorage.setItem(LOCAL_DATA_KEYS.updateRequired, 'false')
    setUpdateRequired(false)
    setTimeout(() => window.location.reload(), 100)
  }

  useEffect(() => {
    const interval = setInterval(checkAppUpdate, 60000)
    const reloadInterval = setInterval(checkReloadStatus, 5000)
    return () => {
      clearInterval(interval)
      clearInterval(reloadInterval)
    }
  }, [])

  useEffect(() => {
    if (reloadRequired) {
      localStorage.removeItem(LOCAL_DATA_KEYS.reloadRequired)
      setReloadRequired(false)
      window.location.reload()
    }
  }, [reloadRequired])

  useEffect(() => {
    if (updateRequired)
      reloadIntervalRef.current = setInterval(() => {
        setTimeLeft(prevState => prevState - 1)
      }, 1000)

    return () => clearInterval(reloadIntervalRef.current)
  }, [updateRequired])

  useEffect(() => {
    if (updateRequired) {
      if (timeLeft <= Timer.endTime && reloadIntervalRef.current) {
        clearInterval(reloadIntervalRef.current)
        handleReload()
      }
    }
  }, [timeLeft])

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={updateRequired}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      key={SlideTransition.name}
    >
      <Alert
        variant='filled'
        severity='info'
        icon={false}
        onClose={handleClose}
        sx={{
          width: '100%',
          alignItems: 'center',
          fontSize: '12px',
          textAlign: 'center',
          py: 0
        }}
      >
        <Grid container sx={{ alignItems: 'center' }}>
          New version is available. Reload in {timeLeft} sec.
        </Grid>
      </Alert>
    </Snackbar>
  )
}
