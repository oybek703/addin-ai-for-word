import React, { Fragment, useEffect, useRef, useState } from 'react'
import Grid from '@mui/material/Grid'
import '@components/helpers/Loader/loader.css'
import Button from '@mui/material/Button'
import { ISxStyles } from '@interfaces/styles.interface'

const styles: ISxStyles = {
  loaderContent: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  }
}

const Loader = () => {
  const loaderRef = useRef(null)
  const [reloadBtn, setReloadBtn] = useState(false)
  const handleReload = () => window.location.reload()
  useEffect(() => {
    setTimeout(function () {
      if (loaderRef.current) setReloadBtn(true)
    }, 10000)
  }, [])
  return (
    <Fragment>
      <Grid ref={loaderRef} sx={styles.loaderContent} justifyContent='center' container alignItems='center'>
        <Grid item justifySelf='center' className='loader quantum-spinner' />
      </Grid>
      <Grid sx={{ position: 'absolute', bottom: '20px', left: '45%' }} justifyContent='center'>
        {reloadBtn && (
          <Button
            onClick={handleReload}
            variant='outlined'
            size='small'
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Reload
          </Button>
        )}
      </Grid>
    </Fragment>
  )
}

export default Loader
