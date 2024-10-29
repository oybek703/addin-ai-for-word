import React, { Component, ErrorInfo, PropsWithChildren } from 'react'
import ErrorAlert from '@components/helpers/ErrorBoundary/ErrorAlert'

interface IErrorBoundaryState {
  hasError?: boolean
}

class ErrorBoundary extends Component<PropsWithChildren<IErrorBoundaryState>, IErrorBoundaryState> {
  constructor(props: PropsWithChildren<IErrorBoundaryState>) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error: Error, _: ErrorInfo) {
    console.error(`Error while rendering component: `, error)
    this.setState({ hasError: true })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) return <ErrorAlert />
    return <>{children}</>
  }
}

export default ErrorBoundary
