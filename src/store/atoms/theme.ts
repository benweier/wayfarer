import { atomWithStorage } from 'jotai/utils'

export type ThemeState = 'system' | 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

export const themeAtom = atomWithStorage<ThemeState>(
  THEME_STORAGE_KEY,
  (window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeState | null) ?? 'system',
  undefined,
  {
    getOnInit: true,
  },
)
