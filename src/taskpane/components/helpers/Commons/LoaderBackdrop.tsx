import React, { useEffect } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useAppStore } from '@components/store/app.store'

const LoaderBackdrop = () => {
  const { backdrop, setBackdrop } = useAppStore()

  const handleClick = () => {
    if (backdrop.closeOnClick) setBackdrop({ open: false, closeOnClick: true })
  }

  useEffect(() => {
    setBackdrop({ open: false, closeOnClick: true })
  }, [])

  return (
    <Backdrop
      onClick={handleClick}
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 10000 }}
      open={backdrop?.open || false}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default LoaderBackdrop
