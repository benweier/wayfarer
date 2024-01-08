import * as Sentry from '@sentry/react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Outlet, ScrollRestoration, useRouterState } from '@tanstack/react-router'
import { lazy } from 'react'
import { Button } from '@/components/button'
import { Meta } from '@/components/meta'
import { useThemeManager } from '@/hooks/use-theme-manager.hook'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((mod) => ({
        default: () => <mod.TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />,
      })),
    )
const NavigationLoader = () => {
  const isLoading = useRouterState({ select: (state) => state.status === 'pending' })

  return isLoading && <span className="loader" />
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
            <Button
              intent="primary"
              className="w-full max-w-xs"
              onClick={() => {
                resetError()
              }}
            >
              Try again
            </Button>
          </div>
        </div>
      )}
    >
      <ScrollRestoration />
      <Meta titleTemplate="%s • Wayfarer" />
      <div className="min-h-screen">
        <NavigationLoader />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </Sentry.ErrorBoundary>
  )
}
