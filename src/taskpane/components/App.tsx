import '@components/styles/app.css'
import React, { FC, Fragment, lazy, Suspense, useEffect } from 'react'
import { ThemeProvider } from '@mui/material'
import { lazyRetry } from '@components/helpers/Commons/Lazyretry'
import { IHeaderProps } from '@components/layout/NavigationTabs'
import { INavigation, IOfficeInitialized } from '@interfaces/app.interfaces'
import Loader from '@components/helpers/Loader'
import UpdateAvailable from '@components/helpers/Commons/UpdateAvailable'
import { ActiveTabs, ExternalLinks } from '@utils/constants'
import HomeIcon from '@components/helpers/Icons/HomeIcon'
import PlanIcon from '@components/helpers/Icons/PlanIcon'
import MessageSnackbar from '@components/helpers/Commons/MessageSnackbar'
import LoaderBackdrop from '@components/helpers/Commons/LoaderBackdrop'
import ErrorBoundary from '@components/helpers/ErrorBoundary'
import { appTheme } from '@components/layout/theme'
import FallBackLoader from '@components/helpers/Commons/FallBackLoader'
import { usePlans } from '@components/hooks/usePlans'
import SignInDialog from '@components/helpers/Commons/SignInDialog'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined'
import { getUserData } from '@utils/axios-utils'
import { useAppStore } from '@components/store/app.store'

const Home = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Home" */ '@components/tabs/Home'), 'Home'))
const Premium = lazy(() =>
  lazyRetry(() => import(/* webpackChunkName: "Premium" */ '@components/tabs/Premium'), 'Premium')
)

const NavigationTabs = lazy(() =>
  lazyRetry(() => import(/* webpackChunkName: "NavigationTabs" */ './layout/NavigationTabs'), 'NavigationTabs')
) as unknown as React.LazyExoticComponent<React.FC<IHeaderProps>>

const externalTabs: INavigation[] = [
  {
    tab: ActiveTabs.external,
    label: 'Help',
    content: null,
    icon: <HelpOutlineOutlinedIcon sx={{ color: '#fff', width: '23px', height: '23px' }} />,
    link: ''
  },
  {
    tab: ActiveTabs.external,
    label: 'Contact Us',
    content: null,
    icon: <MailOutlineOutlinedIcon sx={{ color: '#fff', width: '22px', height: '23px' }} />,
    link: ''
  },
  {
    tab: ActiveTabs.external,
    label: 'Privacy Policy',
    content: null,
    icon: <NotesOutlinedIcon sx={{ color: '#fff', width: '22px', height: '23px' }} />,
    link: ExternalLinks.privacyPolicy
  },
  {
    tab: ActiveTabs.external,
    label: 'Fulfillment Policy',
    content: null,
    icon: <NotesOutlinedIcon sx={{ color: '#fff', width: '22px', height: '23px' }} />,
    link: ExternalLinks.fulfillmentPolicy
  }
]

const defaultMainTabs: INavigation[] = [
  {
    tab: ActiveTabs.home,
    label: 'Home',
    content: (
      <Suspense fallback={<FallBackLoader />}>
        <Home />
      </Suspense>
    ),
    icon: <HomeIcon />
  },
  {
    tab: ActiveTabs.premium,
    label: 'Plans',
    content: (
      <Suspense fallback={<FallBackLoader />}>
        <Premium />
      </Suspense>
    ),
    icon: <PlanIcon />
  }
]

const App: FC<IOfficeInitialized> = ({ isOfficeInitialized }) => {
  const { checkUserPlan } = usePlans()
  const { activeTab, userInfo, updateUserData, backdrop, setIsLoggedIn } = useAppStore()

  useEffect(() => {
    ;(async () => {
      if (userInfo?.email) {
        const userData = await getUserData(userInfo.email)
        if (userData && userData?.email) updateUserData(userData)
      }
    })()
    checkUserPlan()
    if (userInfo?.email) setIsLoggedIn(true)
  }, [activeTab])

  if (!isOfficeInitialized) return <Loader />

  return (
    <Fragment>
      <UpdateAvailable />
      <Suspense fallback={<FallBackLoader />}>
        <NavigationTabs tabs={[...defaultMainTabs, ...externalTabs]} />
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
