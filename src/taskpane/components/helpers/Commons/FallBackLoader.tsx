import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

const FallBackLoader = () => {
  return (
    <Box sx={{ position: 'absolute', display: 'grid', placeItems: 'center', top: 0, bottom: 0, left: 0, right: 0 }}>
      <CircularProgress />
    </Box>
  )
}

export default FallBackLoader
