import React, { ReactNode } from 'react'

interface Props extends React.PropsWithChildren {
  fallbackRender: (props: { error: Error | null }) => ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  state = {
    error: null
  }

  // 当子组件抛出异常此处会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render(): React.ReactNode {
    const { error } = this.state
    const { fallbackRender, children } = this.props

    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
