import { useCallback, useRef } from 'react'
import { ModalImperativeRef } from '@/components/Modal/modal.types'

export const useModalImperativeHandle = () => {
  const modal = useRef<ModalImperativeRef>()
  const ref = useCallback((instance: ModalImperativeRef) => {
    modal.current = instance
  }, [])
  const openModal = useCallback(() => {
    if (modal.current) modal.current.openModal()
  }, [])
  const closeModal = useCallback(() => {
    if (modal.current) modal.current.closeModal()
  }, [])

  return {
    ref,
    modal: {
      open: openModal,
      close: closeModal,
    },
  }
}
