import { createTheme } from '@mui/material'

export const myCustomFont = 'Trebuchet MS'

export enum Colors {
  grey = '#F7F6F6',
  error = '#DC5277',
  iconColor = '#7B8099',
  main = '#079854',
  secondary = '#2A7AE4'
}

export const appTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: Colors.main
    },
    secondary: {
      main: Colors.secondary
    },
    success: {
      main: '#76B66E'
    }
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    allVariants: {
      color: Colors.main
    }
  }
})
