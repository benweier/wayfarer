import { atomWithStorage } from 'jotai/utils'

type ThemeState = 'auto' | 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'

export const themeAtom = atomWithStorage<ThemeState>(THEME_STORAGE_KEY, 'auto')
