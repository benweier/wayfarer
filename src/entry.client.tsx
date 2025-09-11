import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode, Suspense, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'
import { HydratedRouter } from 'react-router/dom'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={client}>
              <HydratedRouter />
            </QueryClientProvider>
          </I18nextProvider>
        </Suspense>
      </ErrorBoundary>
    </StrictMode>,
  )
})
