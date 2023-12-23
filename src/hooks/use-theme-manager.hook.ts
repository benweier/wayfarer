import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { themeAtom } from '@/store/atoms/theme'

export const useThemeManager = () => {
  const [theme] = useAtom(themeAtom)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    switch (theme) {
      case 'light':
        document.documentElement.dataset.theme = 'light'
        break

      case 'dark':
        document.documentElement.dataset.theme = 'dark'
        break

      default: {
        if (prefersDark.matches) {
          document.documentElement.dataset.theme = 'dark'
        } else {
          document.documentElement.dataset.theme = 'light'
        }

        break
      }
    }

    if (theme !== 'system') return

    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        document.documentElement.dataset.theme = 'dark'
      } else {
        document.documentElement.dataset.theme = 'light'
      }
    }

    prefersDark.addEventListener('change', listener)

    return () => {
      prefersDark.removeEventListener('change', listener)
    }
  }, [theme])
}
