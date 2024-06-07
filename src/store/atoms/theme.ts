import { atomWithStorage } from 'jotai/utils'
import * as v from 'valibot'

export type ThemeState = v.InferOutput<typeof ThemeSchema>

const THEME_STORAGE_KEY = 'theme'

const ThemeSchema = v.pipe(v.string(), v.union([v.literal('system'), v.literal('light'), v.literal('dark')]))

export const themeAtom = atomWithStorage<ThemeState>(
  THEME_STORAGE_KEY,
  'system',
  {
    getItem(key, initialValue) {
      return v.parse(v.fallback(ThemeSchema, initialValue), localStorage.getItem(key))
    },
    setItem(key, value) {
      localStorage.setItem(key, value)
    },
    removeItem(key) {
      localStorage.removeItem(key)
    },
    subscribe(key, callback, initialValue) {
      const storageHandler = (e: StorageEvent) => {
        if (e.storageArea === localStorage && e.key === key) {
          callback(v.parse(v.fallback(ThemeSchema, initialValue), e.newValue))
        }
      }

      window.addEventListener('storage', storageHandler)

      return () => {
        window.removeEventListener('storage', storageHandler)
      }
    },
  },
  {
    getOnInit: true,
  },
)
