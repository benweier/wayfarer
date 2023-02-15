import { useCallback, useState } from 'react'
import { Modal } from './Modal.Portal'
import type { UseModalOptions } from './modal.types.d'

export const useModal = ({ initialOpen = false, Portal = Modal }: UseModalOptions = {}) => {
  const [isOpen, setOpen] = useState(initialOpen)
  const openModal = useCallback(() => {
    setOpen(true)
    // onOpen?.()
  }, [])
  const closeModal = useCallback(() => {
    setOpen(false)
    // onClose?.()
  }, [])

  return {
    Modal: Portal,
    openModal,
    closeModal,
    isOpen,
  }
}
