import React, { FC, Fragment } from 'react'
import { Grid, Tooltip } from '@mui/material'
import { ActivePages, ActiveTabs } from '@utils/constants'
import DrawerMenu from '@components/helpers/Drawer'
import HomeIcon from '@components/helpers/Icons/HomeIcon'
import ThreeDots from '@components/helpers/Icons/ThreeDots'
import PlanIcon from '@components/helpers/Icons/PlanIcon'
import { useAppStore } from '@components/store/app.store'
import { INavigation } from '@interfaces/app.interfaces'

export interface IHeaderProps {
  tabs: INavigation[]
}

const NavigationTabs: FC<IHeaderProps> = ({ tabs }) => {
  const { activeTab, setActiveTab, setIsDrawerOpen, setActivePage } = useAppStore()
  const handleChange = (newTab: ActiveTabs) => {
    if (newTab === ActiveTabs.home) setActivePage(ActivePages.main)
    setActiveTab(newTab)
  }

  return (
    <Fragment>
      <DrawerMenu tabs={tabs} onChange={handleChange} />
      <Grid component='aside'>
        <Tooltip title='Home' placement='right' arrow>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: 1,
              marginBottom: '18px'
            }}
            onClick={() => {
              setActiveTab(ActiveTabs.home)
              setActivePage(ActivePages.main)
            }}
          >
            <HomeIcon />
          </Grid>
        </Tooltip>
        <Tooltip title='Plans' placement='right' arrow>
          <Grid
            item
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginTop: 1,
              marginBottom: '18px'
            }}
            onClick={() => setActiveTab(ActiveTabs.premium)}
          >
            <PlanIcon />
          </Grid>
        </Tooltip>
        <Tooltip title='More' placement='right' arrow>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              mt: '-8px'
            }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <ThreeDots />
          </Grid>
        </Tooltip>
      </Grid>
      <Grid
        component='main'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'space-between'
        }}
      >
        <Grid
          sx={{
            width: '98%'
          }}
        >
          {tabs.map(
            ({ content, tab }, index) =>
              activeTab === tab && (
                <Grid sx={{ height: '100%', padding: 1 }} component='section' key={index}>
                  {content}
                </Grid>
              )
          )}
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default NavigationTabs
