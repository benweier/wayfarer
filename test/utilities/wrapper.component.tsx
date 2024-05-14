import { ErrorBoundary } from '@/components/error-boundary'
import { KBar } from '@/components/kbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, StrictMode, Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from './i18n'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <Suspense fallback={null}>
          <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={client}>
              <KBar>{children}</KBar>
            </QueryClientProvider>
          </I18nextProvider>
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  )
}
