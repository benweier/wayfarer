import { KBar } from '@/components/kbar'
import { PrefersColorScheme } from '@/components/responsive'
import { router } from '@/routes/router.conf'
import { i18n } from '@/services/i18n'
import { client } from '@/services/query-client'
import { sidebarAtom } from '@/store/atoms/sidebar'
import { themeAtom } from '@/store/atoms/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { enableMapSet } from 'immer'
import { getDefaultStore, useAtomValue } from 'jotai'
import type { Action } from 'kbar'
import { Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'

import '@/services/sentry'
import '@/styles/main.css'

enableMapSet()

const store = getDefaultStore()

const actions: Action[] = [
  {
    id: 'preferences',
    name: 'Preferences',
    shortcut: ['Alt+KeyP'],
    priority: -1,
  },
  {
    id: 'theme',
    name: 'Theme',
    parent: 'preferences',
  },
  {
    id: 'menu',
    name: 'Menu',
    parent: 'preferences',
  },
  {
    id: 'theme:dark',
    name: 'Dark',
    parent: 'theme',
    perform: () => {
      void store.set(themeAtom, 'dark')
    },
  },
  {
    id: 'theme:light',
    name: 'Light',
    parent: 'theme',
    perform: () => {
      void store.set(themeAtom, 'light')
    },
  },
  {
    id: 'theme:ystem',
    name: 'System',
    parent: 'theme',
    perform: () => {
      void store.set(themeAtom, 'system')
    },
  },
  {
    id: 'menu:collapsed',
    name: 'Collapse',
    parent: 'menu',
    perform: () => {
      void store.set(sidebarAtom, 'collapsed')
    },
  },
  {
    id: 'menu:expand',
    name: 'Expand',
    parent: 'menu',
    perform: () => {
      void store.set(sidebarAtom, 'expanded')
    },
  },
]

export const App = () => {
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

  return (
    <PrefersColorScheme
      preference={theme}
      light={<link rel="stylesheet" href="/css/light.css" fetchPriority="high" />}
      dark={<link rel="stylesheet" href="/css/dark.css" fetchPriority="high" />}
    />
  )
}
