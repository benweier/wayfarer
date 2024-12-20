import { Button } from '@/components/button'
import { Meta } from '@/components/meta'
import { cx } from '@/utilities/cx.helper'
import * as Sentry from '@sentry/react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Outlet, ScrollRestoration, useRouterState } from '@tanstack/react-router'
import { lazy } from 'react'
import { Toaster } from 'sonner'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((mod) => ({
        default: () => <mod.TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />,
      })),
    )
const TanStackQueryDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((mod) => ({
        default: () => <mod.ReactQueryDevtools initialIsOpen={false} />,
      })),
    )
const NavigationLoader = () => {
  const isLoading = useRouterState({ select: (state) => state.isLoading || state.isTransitioning })

  return isLoading && <span className="loader" />
}

export const Core = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError, error }) => (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-4 p-3">
            <div className="display-sm font-mono text-foreground-error-primary">{error.message}</div>
            <Button
              intent="info"
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
      <Meta />
      <NavigationLoader />
      <Outlet />
      <Toaster
        position="bottom-right"
        visibleToasts={5}
        toastOptions={{
          unstyled: true,
        }}
        duration={5000}
        cn={cx}
      />
      <TanStackRouterDevtools />
      <TanStackQueryDevtools />
    </Sentry.ErrorBoundary>
  )
}
