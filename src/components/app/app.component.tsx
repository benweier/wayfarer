import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { enableMapSet } from 'immer'
import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import { router } from '@/routes/router.conf'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
import '@/services/sentry'
import '@/styles/tailwind.css'

enableMapSet()

export const App = () => {
  return (
    <Suspense fallback={<></>}>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <QueryClientProvider client={client}>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </HelmetProvider>
      </I18nextProvider>
    </Suspense>
  )
}
