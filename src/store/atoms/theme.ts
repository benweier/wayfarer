import { createSyncStorage } from '@/store/create-sync-storage.helper'
import { atomWithStorage } from 'jotai/utils'
import * as v from 'valibot'

export type ThemeState = v.InferOutput<typeof ThemeSchema>

const THEME_STORAGE_KEY = 'theme'

const ThemeSchema = v.pipe(v.string(), v.union([v.literal('system'), v.literal('light'), v.literal('dark')]))

export const themeAtom = atomWithStorage<ThemeState>(THEME_STORAGE_KEY, 'system', createSyncStorage(ThemeSchema), {
  getOnInit: true,
})
