import { atomWithStorage } from 'jotai/utils'

export type SidebarState = 'collapsed' | 'expanded'

const SIDEBAR_STORAGE_KEY = 'sidebar'

export const sidebarAtom = atomWithStorage<SidebarState>(SIDEBAR_STORAGE_KEY, 'expanded', undefined, {
  getOnInit: true,
})
