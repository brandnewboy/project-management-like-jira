import React from 'react'
import './App.css'
import AuthenticatedApp from 'authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
import { useAuth } from 'context/auth-context'
import { ErrorBoundary } from './components/error-boundary'
import { FullPageErrorRender } from './components/lib'
import { QueryClientProvider, QueryClient } from 'react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App() {
  const { user } = useAuth()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ErrorBoundary fallbackRender={FullPageErrorRender}>
          {!!user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </div>
    </QueryClientProvider>
  )
}

export default App
