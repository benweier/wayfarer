import { atomWithStorage } from 'jotai/utils'
import * as v from 'valibot'

export type SidebarState = v.InferOutput<typeof SidebarSchema>

const SIDEBAR_STORAGE_KEY = 'sidebar'

const SidebarSchema = v.pipe(v.string(), v.union([v.literal('expanded'), v.literal('collapsed')]))

export const sidebarAtom = atomWithStorage<SidebarState>(
  SIDEBAR_STORAGE_KEY,
  'expanded',
  {
    getItem(key, initialValue) {
      return v.parse(v.fallback(SidebarSchema, initialValue), localStorage.getItem(key))
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
          callback(v.parse(v.fallback(SidebarSchema, initialValue), e.newValue))
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
