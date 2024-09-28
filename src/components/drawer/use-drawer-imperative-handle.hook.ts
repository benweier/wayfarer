import { useCallback, useRef } from 'react'
import type { DrawerImperativeRef } from './drawer.types'

export const useDrawerImperativeHandle = () => {
  const drawer = useRef<DrawerImperativeRef>(null)
  const ref = useCallback((instance: DrawerImperativeRef) => {
    drawer.current = instance
  }, [])
  const open = useCallback(() => {
    if (drawer.current) drawer.current.open()
  }, [])
  const close = useCallback(() => {
    if (drawer.current) drawer.current.close()
  }, [])
  const toggle = useCallback(() => {
    if (drawer.current) drawer.current.toggle()
  }, [])

  return {
    ref,
    drawer: {
      open,
      close,
      toggle,
    },
  }
}
