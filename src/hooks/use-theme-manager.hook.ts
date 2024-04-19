import { themeAtom } from '@/store/atoms/theme'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const toggleThemeClass = (el: HTMLElement, preference: 'system' | 'light' | 'dark', system: 'light' | 'dark') => {
  el.classList.remove('light', 'dark')

  switch (preference) {
    case 'light':
    case 'dark':
      el.classList.add(preference)
      break

    case 'system': {
      el.classList.add(system)

      break
    }
  }
}

export const useThemeManager = () => {
  const [theme] = useAtom(themeAtom)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    const el = document.documentElement

    toggleThemeClass(el, theme, prefersDark.matches ? 'dark' : 'light')

    if (theme !== 'system') return

    const listener = (event: MediaQueryListEvent) => {
      toggleThemeClass(el, theme, event.matches ? 'dark' : 'light')
    }

    prefersDark.addEventListener('change', listener)

    return () => {
      prefersDark.removeEventListener('change', listener)
    }
  }, [theme])
}
