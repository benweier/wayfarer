import { useCallback, useRef } from 'react'
import type { DrawerImperativeRef } from './drawer.types'

export const useDrawerImperativeHandle = () => {
  const modal = useRef<DrawerImperativeRef>(null)
  const ref = useCallback((instance: DrawerImperativeRef) => {
    modal.current = instance
  }, [])
  const openDrawer = useCallback(() => {
    if (modal.current) modal.current.openDrawer()
  }, [])
  const closeDrawer = useCallback(() => {
    if (modal.current) modal.current.closeDrawer()
  }, [])

  return {
    ref,
    modal: {
      open: openDrawer,
      close: closeDrawer,
    },
  }
}
