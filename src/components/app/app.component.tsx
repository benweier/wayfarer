import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import * as Sentry from '@sentry/react'
import { QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { enableMapSet } from 'immer'
import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Button } from '@/components/button'
import { KBar } from '@/components/kbar'
import { ThemeStyleSheet } from '@/components/theme-style-sheet'
import { router } from '@/routes/router.conf'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
import { useAppActions } from './use-app-actions.hook'

import '@/services/valibot'
import '@/styles/main.css'

enableMapSet()

Sentry.init({
  dsn: import.meta.env.SENTRY_DSN,
  enabled: import.meta.env.PROD,
  integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
  tracesSampleRate: 0.1,
})

export const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  const actions = useAppActions()

  return (
    <Sentry.ErrorBoundary
      onReset={reset}
      fallback={({ resetError, error }) => (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="flex w-full flex-col items-center gap-4 p-3">
            <div className="text-h4 text-foreground-error-primary font-mono">{error.message}</div>
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
      <div className="flex h-dvh w-screen flex-col">
        <Suspense fallback={null}>
          <ThemeStyleSheet />

          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={client}>
              <KBar actions={actions}>
                <TooltipProvider delayDuration={100}>
                  <RouterProvider router={router} />
                </TooltipProvider>
              </KBar>
            </QueryClientProvider>
          </I18nextProvider>
        </Suspense>
      </div>
    </Sentry.ErrorBoundary>
  )
}
