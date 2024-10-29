import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Divider, Grid, IconButton } from '@mui/material'
import { IHeaderProps } from '@components/layout/NavigationTabs'
import { Colors } from '@components/layout/theme'
import { ActiveTabs, SignInReason } from '@utils/constants'
import { ChevronLeft } from '@mui/icons-material'
import { useAppStore } from '@components/store/app.store'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import UserAvatar from '@components/helpers/Commons/UserAvatar'

export interface IDrawerMenu extends IHeaderProps {
  onChange: Function
}

const DrawerMenu: React.FC<IDrawerMenu> = ({ tabs, onChange }) => {
  const { setIsDrawerOpen, isDrawerOpen, isLoggedIn, setOpenSignInDialog } = useAppStore()
  const toggleDrawer = (isOpen: boolean) => () => setIsDrawerOpen(isOpen)

  const handleMenu = (tab: ActiveTabs, _label: string, link = '') => {
    if (tab === ActiveTabs.external) {
      window.open(link, '_blank')
    } else onChange(tab)
  }

  const DrawerList = (
    <Box sx={{ width: 240 }} role='presentation' onClick={toggleDrawer(false)}>
      <Grid
        sx={{ height: '99vh', flexWrap: 'nowrap' }}
        container
        direction='column'
        justifyContent='space-between'
        alignItems='stretch'
      >
        <List>
          <ListItem
            sx={{
              marginBottom: 0,
              justifyContent: 'flex-end'
            }}
            key='0'
          >
            <ChevronLeft sx={{ color: '#fff', cursor: 'pointer' }} />
          </ListItem>
          <Divider sx={{ background: '#fff' }} />
          {tabs.map(({ label, icon, tab, link }, i) => (
            <ListItem
              sx={{
                gap: 12,
                marginBottom: 0
              }}
              key={`${label}${i}`}
              disablePadding
              onClick={() => {
                handleMenu(tab, label, link)
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    width: 42,
                    minWidth: 'fit-content',
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconButton component='div'>{icon}</IconButton>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '.MuiListItemText-primary': {
                      color: '#fff',
                      fontSize: 14,
                      ml: 1
                    }
                  }}
                  primary={label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ maxWidth: 240 }}>
          {isLoggedIn ? (
            <UserAvatar />
          ) : (
            <Box display={'flex'} mb={'26px'} pl={'24px'}>
              <Button
                variant='contained'
                onClick={() => {
                  setOpenSignInDialog({
                    open: true,
                    reason: SignInReason.signIn
                  })
                }}
                sx={{
                  textTransform: 'none',
                  fontSize: '1.1em',
                  fontWeight: 500,
                  border: '1px solid white',
                  padding: '2px 12px'
                }}
                endIcon={<LoginIcon />}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  )

  return (
    <Box>
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            backgroundColor: Colors.main
          }
        }}
      >
        {DrawerList}
      </Drawer>
    </Box>
  )
}

export default DrawerMenu
