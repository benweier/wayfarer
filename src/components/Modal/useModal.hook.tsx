import { useCallback, useState } from 'react'
import { Modal } from './Modal.Portal'
import type { UseModalOptions } from './modal.types.d'

export const useModal = ({ initialOpen = false, onOpen, onClose, Portal = Modal }: UseModalOptions = {}) => {
  const [isOpen, setOpen] = useState(initialOpen)
  const openModal = useCallback(() => {
    setOpen(true)
    onOpen?.()
  }, [onOpen])
  const closeModal = useCallback(() => {
    setOpen(false)
    onClose?.()
  }, [onClose])

  return {
    Modal: Portal,
    openModal,
    closeModal,
    isOpen,
  }
}
