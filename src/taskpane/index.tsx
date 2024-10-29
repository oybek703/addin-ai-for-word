import React, { FC } from 'react'
import * as ReactDOM from 'react-dom'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AppWrapper from './components/App'
import { IOfficeInitialized } from '@interfaces/app.interfaces'
import { AppContainer } from 'react-hot-loader'

/* global document, Office, module, require */

let isOfficeInitialized = false

const render = (Component: FC<IOfficeInitialized>) => {
  ReactDOM.render(
    <AppContainer>
      <Component isOfficeInitialized={isOfficeInitialized} />
    </AppContainer>,
    document.getElementById('container')
  )
}

/* Render application after Office initializes */
Office?.onReady(() => {
  isOfficeInitialized = true
  render(AppWrapper)
}).catch(console.error)

// For showing loader if office is not initialized
render(AppWrapper)

if ((module as any).hot) {
  ;(module as any).hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(NextApp)
  })
}
