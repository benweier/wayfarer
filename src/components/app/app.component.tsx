import { KBar } from '@/components/kbar'
import { ThemeStyleSheet } from '@/components/theme-style-sheet'
import { router } from '@/routes/router.conf'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { enableMapSet } from 'immer'
import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useAppActions } from './use-app-actions.hook'

import '@/services/valibot'
import '@/services/sentry'
import '@/styles/main.css'

enableMapSet()

export const App = () => {
  const actions = useAppActions()

  return (
    <Suspense fallback={null}>
      <ThemeStyleSheet />

      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={client}>
          <KBar actions={actions}>
            <RouterProvider router={router} />
          </KBar>
        </QueryClientProvider>
      </I18nextProvider>
    </Suspense>
  )
}
