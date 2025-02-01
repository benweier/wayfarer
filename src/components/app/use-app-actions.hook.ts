import { useSetAtom } from 'jotai'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { sidebarAtom } from '@/store/atoms/sidebar'
import { themeAtom } from '@/store/atoms/theme'
import type { Action } from 'kbar'

export const useAppActions = () => {
  const { t } = useTranslation()
  const setTheme = useSetAtom(themeAtom)
  const setSidebar = useSetAtom(sidebarAtom)

  const actions: Action[] = useMemo(
    () => [
      {
        id: 'preferences',
        name: t('preferences.label'),
        shortcut: ['Alt+KeyP'],
        priority: -1,
      },
      {
        id: 'theme',
        name: t('preferences.theme'),
        parent: 'preferences',
      },
      {
        id: 'menu',
        name: t('preferences.menu'),
        parent: 'preferences',
      },
      {
        id: 'theme:dark',
        name: t('preferences.dark'),
        parent: 'theme',
        perform: () => {
          setTheme('dark')
        },
      },
      {
        id: 'theme:light',
        name: t('preferences.light'),
        parent: 'theme',
        perform: () => {
          setTheme('light')
        },
      },
      {
        id: 'theme:system',
        name: t('preferences.system'),
        parent: 'theme',
        perform: () => {
          setTheme('system')
        },
      },
      {
        id: 'menu:collapsed',
        name: t('preferences.collapse'),
        parent: 'menu',
        perform: () => {
          setSidebar('collapsed')
        },
      },
      {
        id: 'menu:expand',
        name: t('preferences.expand'),
        parent: 'menu',
        perform: () => {
          setSidebar('expanded')
        },
      },
    ],
    [t, setTheme, setSidebar],
  )

  return actions
}
