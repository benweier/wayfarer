import { createSyncStorage } from '@/store/create-sync-storage.helper'
import { atomWithStorage } from 'jotai/utils'
import * as v from 'valibot'

export type SidebarState = v.InferOutput<typeof SidebarSchema>

const SIDEBAR_STORAGE_KEY = 'sidebar'

const SidebarSchema = v.pipe(v.string(), v.union([v.literal('expanded'), v.literal('collapsed')]))

export const sidebarAtom = atomWithStorage<SidebarState>(
  SIDEBAR_STORAGE_KEY,
  'expanded',
  createSyncStorage(SidebarSchema),
  {
    getOnInit: true,
  },
)
