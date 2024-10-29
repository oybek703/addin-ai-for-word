// a function to retry loading a chunk to avoid chunk load error for out of date code
import { ComponentType } from 'react'

export const lazyRetry = function (componentImport, name: string) {
  return new Promise<{ default: ComponentType }>((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false')
    // try to import the component
    componentImport()
      .then(component => {
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false') // success so reset the refresh
        resolve(component)
      })
      .catch((error: Error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true') // we are now going to refresh
          return window.location.reload() // refresh the page
        }
        reject(error || 'Lazy retry error!') // Default error behaviour as already tried refresh
      })
  })
}
