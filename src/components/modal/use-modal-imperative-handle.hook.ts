import { useCallback, useRef } from 'react'
import type { ModalImperativeRef } from './modal.types'

export const useModalImperativeHandle = () => {
  const modal = useRef<ModalImperativeRef>(null)
  const ref = useCallback((instance: ModalImperativeRef) => {
    modal.current = instance
  }, [])
  const open = useCallback(() => {
    if (modal.current) modal.current.open()
  }, [])
  const close = useCallback(() => {
    if (modal.current) modal.current.close()
  }, [])
  const toggle = useCallback(() => {
    if (modal.current) modal.current.toggle()
  }, [])

  return {
    ref,
    modal: {
      open,
      close,
      toggle,
    },
  }
}
