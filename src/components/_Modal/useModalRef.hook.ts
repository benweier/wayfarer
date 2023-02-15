import { useCallback, useRef } from 'react'
import type { ModalRefType } from './modal.types.d'

export const useModalRef = () => {
  const modalRef = useRef<ModalRefType>()

  const openModal = useCallback(() => {
    if (modalRef.current) modalRef.current.openModal()
  }, [])
  const closeModal = useCallback(() => {
    if (modalRef.current) modalRef.current.closeModal()
  }, [])

  return {
    ref: modalRef,
    openModal,
    closeModal,
  }
}
