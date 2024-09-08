import { useCallback, useRef } from 'react'
import type { CollapsibleImperativeRef } from './collapsible.types'

export const useCollapsibleImperativeHandle = () => {
  const collapsible = useRef<CollapsibleImperativeRef>(null)
  const ref = useCallback((instance: CollapsibleImperativeRef) => {
    collapsible.current = instance
  }, [])
  const open = useCallback(() => {
    if (collapsible.current) collapsible.current.open()
  }, [])
  const close = useCallback(() => {
    if (collapsible.current) collapsible.current.close()
  }, [])
  const toggle = useCallback(() => {
    if (collapsible.current) collapsible.current.toggle()
  }, [])

  return {
    ref,
    collapsible: {
      open,
      close,
      toggle,
    },
  }
}
