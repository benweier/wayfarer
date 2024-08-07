import { KBar } from '@/components/kbar'
import { PrefersColorScheme } from '@/components/responsive'
import { router } from '@/routes/router.conf'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
import { themeAtom } from '@/store/atoms/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { enableMapSet } from 'immer'
import { useAtomValue } from 'jotai'
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

const ThemeStyleSheet = () => {
  const theme = useAtomValue(themeAtom)
  const light = new URL('/css/light.css', import.meta.url)
  const dark = new URL('/css/dark.css', import.meta.url)

  return (
    <PrefersColorScheme
      preference={theme}
      light={<link rel="stylesheet" href={light.href} fetchPriority="high" />}
      dark={<link rel="stylesheet" href={dark.href} fetchPriority="high" />}
    />
  )
}
