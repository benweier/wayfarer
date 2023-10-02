import * as Sentry from '@sentry/react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import { useThemeManager } from '@/hooks/use-theme-manager.hook'
import { Loading } from './routes.fallback'

const NavigationLoader = () => {
  const navigation = useNavigation()

  return navigation.state !== 'idle' ? <span className="loader" /> : <></>
}

export const Core = () => {
  const { reset } = useQueryErrorResetBoundary()

  useThemeManager()

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError, error }) => (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-4 p-3">
            <div className="font-mono text-xl font-bold tracking-tighter text-rose-500">{error.message}</div>
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={() => {
                resetError()
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}
    >
      <Suspense fallback={<Loading />}>
        <div className="min-h-screen">
          <NavigationLoader />
          <Outlet />
        </div>
      </Suspense>
    </Sentry.ErrorBoundary>
  )
}
