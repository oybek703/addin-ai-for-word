import '@components/styles/app.css'
import React, { FC, Fragment, lazy, Suspense, useEffect } from 'react'
import { AppBar, Box, IconButton, ThemeProvider, Toolbar } from '@mui/material'
import { lazyRetry } from '@components/helpers/Commons/Lazyretry'
import { IOfficeInitialized } from '@interfaces/app.interfaces'
import Loader from '@components/helpers/Loader'
import UpdateAvailable from '@components/helpers/Commons/UpdateAvailable'
import MessageSnackbar from '@components/helpers/Commons/MessageSnackbar'
import LoaderBackdrop from '@components/helpers/Commons/LoaderBackdrop'
import ErrorBoundary from '@components/helpers/ErrorBoundary'
import { appTheme } from '@components/layout/theme'
import FallBackLoader from '@components/helpers/Commons/FallBackLoader'
import { usePlans } from '@components/hooks/usePlans'
import SignInDialog from '@components/helpers/Commons/SignInDialog'
import { getUserData } from '@utils/axios-utils'
import { useAppStore } from '@components/store/app.store'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'

const Home = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Home" */ '@components/layout/pages/Home'), 'Home'))

const App: FC<IOfficeInitialized> = ({ isOfficeInitialized }) => {
  const { checkUserPlan } = usePlans()
  const { activeTab, userInfo, updateUserData, backdrop } = useAppStore()

  useEffect(() => {
    ;(async () => {
      if (userInfo?.email) {
        const userData = await getUserData(userInfo.email)
        if (userData && userData?.email) updateUserData(userData)
      }
    })()
    checkUserPlan()
  }, [activeTab])

  if (!isOfficeInitialized) return <Loader />

  return (
    <Fragment>
      <UpdateAvailable />
      <Suspense fallback={<FallBackLoader />}>
        <Box component='main'>
          <AppBar sx={{ maxHeight: '50px' }} position='static' color='secondary'>
            <Toolbar variant='dense' sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton size='small' edge='start' color='inherit' aria-label='menu' sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <IconButton
                size='small'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box component='section' sx={{ display: 'grid', placeItems: 'center' }}>
            <Home />
          </Box>
        </Box>
      </Suspense>
      <MessageSnackbar />
      <SignInDialog />
      {backdrop && <LoaderBackdrop />}
    </Fragment>
  )
}

const AppWrapper: FC<IOfficeInitialized> = ({ isOfficeInitialized }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={appTheme}>
        <App isOfficeInitialized={isOfficeInitialized} />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default AppWrapper
