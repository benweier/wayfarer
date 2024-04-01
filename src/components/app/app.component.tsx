import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { enableMapSet } from 'immer'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { PrefersColorScheme } from '@/components/responsive'
import { router } from '@/routes/router.conf'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
import { themeAtom } from '@/store/atoms/theme'
import '@/services/sentry'
import '@/styles/main.css'

enableMapSet()

export const App = () => {
  return (
    <Suspense fallback={<></>}>
      <ThemeStyleSheet />
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </I18nextProvider>
    </Suspense>
  )
}

const ThemeStyleSheet = () => {
  const theme = useAtomValue(themeAtom)

  return (
    <PrefersColorScheme
      preference={theme}
      light={<link rel="stylesheet" href="/css/light.css" fetchPriority="high" />}
      dark={<link rel="stylesheet" href="/css/dark.css" fetchPriority="high" />}
    />
  )
}
