import { FC, memo, RefObject } from 'react'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import FocusLock from 'react-focus-lock'
import usePortal from 'react-useportal'
import { Dialog } from './Dialog'
import { ModalProps, UseModalProps } from './types'
import { useUnmount } from '@/hooks/useUnmount'

type UsePortalType = {
  ref: RefObject<HTMLDivElement>
  isOpen: boolean
  openPortal: () => void
  togglePortal: () => void
  closePortal: () => void
  Portal: FC
}

export const useModal = ({ Component = Dialog, onClose, openOnMount = false }: UseModalProps) => {
  const { ref, isOpen, openPortal, togglePortal, closePortal, Portal } = usePortal({
    onOpen: (event) => disableBodyScroll(event.targetEl.current),
    onClose: (event) => {
      onClose?.()
      enableBodyScroll(event.targetEl.current)
    },
    isOpen: openOnMount,
  }) as UsePortalType

  useUnmount(() => clearAllBodyScrollLocks())

  const PortalModal = memo((props: ModalProps) => (
    <Portal>
      <FocusLock>
        <Component {...props} />
      </FocusLock>
    </Portal>
  ))

  PortalModal.displayName = 'PortalModal'

  return {
    ref,
    Modal: PortalModal,
    openModal: openPortal,
    toggleModal: togglePortal,
    closeModal: closePortal,
    isOpen,
  }
}
