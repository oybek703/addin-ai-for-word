import { useAppStore } from '@components/store/app.store'
import { useAuthDialog } from '@components/hooks/useAuthDialog'
import React from 'react'
import { Avatar, IconButton, List, ListItemAvatar, Tooltip } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import { Logout } from '@mui/icons-material'
import { Colors } from '@components/layout/theme'
import ListItemText from '@mui/material/ListItemText'
import { getAvatarText } from '@utils/index'

const UserAvatar = () => {
  const { userInfo } = useAppStore()
  const { logoutUser } = useAuthDialog()
  return (
    <List
      style={{
        width: '95%'
      }}
    >
      <ListItem
        secondaryAction={
          <Tooltip arrow title='Sign out'>
            <IconButton onClick={logoutUser} style={{ color: '#fff' }} edge='end' aria-label='log-out'>
              <Logout />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemAvatar
          onClick={event => {
            event.stopPropagation()
          }}
          style={{
            minWidth: 'fit-content',
            width: 36
          }}
          sx={{
            color: Colors.grey,
            'MuiListItemAvatar-root': {
              bgcolor: Colors.grey
            }
          }}
        >
          <Avatar
            sx={{
              '.MuiListItemAvatar-root': {
                minWidth: 'fit-content',
                width: 48
              },
              bgcolor: Colors.iconColor,
              color: '#fff'
            }}
            style={{
              fontSize: 14,
              width: 32,
              height: 32
            }}
          >
            {getAvatarText(userInfo)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          onClick={event => {
            event.stopPropagation()
          }}
          sx={{
            '.MuiListItemText-primary': {
              color: '#fff',
              fontSize: 14,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'left'
            },
            '.MuiListItemText-secondary': {
              color: Colors.iconColor,
              fontSize: 12,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'left'
            }
          }}
          primary={
            <Tooltip placement='top' arrow title={`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`}>
              <span>
                {userInfo?.firstName || ''} {userInfo?.lastName || ''}
              </span>
            </Tooltip>
          }
          secondary={
            <Tooltip placement='bottom' arrow title={userInfo?.email}>
              <span>{userInfo?.email}</span>
            </Tooltip>
          }
        />
      </ListItem>
    </List>
  )
}

export default UserAvatar
