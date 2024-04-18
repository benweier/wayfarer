import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'class-variance-authority'
import { type PropsWithChildren } from 'react'
import { type ModalDialogProps } from './modal.types'
import { useModalContext } from './use-modal-store.hook'

export const Root = ({
  trigger,
  size = 'auto',
  close,
  disableExternalClose = false,
  children,
}: PropsWithChildren<ModalDialogProps>) => {
  const modal = useModalContext()

  return (
    <Dialog.Root
      open={modal.isOpen}
      onOpenChange={(isOpen) => {
        if (disableExternalClose) return
        if (!isOpen) modal.actions.closeModal()
      }}
    >
      {trigger}

      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-xs bg-background-primary/20 fixed inset-0 z-40" />
        <Dialog.Content
          className={cx(
            'popover bg-background-primary border-border-primary ring-border-primary/20 fixed fixed top-1/2 left-1/2 z-50 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl p-6 ring-3 focus:outline-none',
            {
              'w-auto': size === 'auto',
              'w-screen': size === 'full',
              'max-w-screen-sm w-full': size === 'sm',
              'max-w-screen-md w-full': size === 'md',
              'max-w-screen-lg w-full': size === 'lg',
              'max-w-screen-xl w-full': size === 'xl',
            },
          )}
        >
          {children}

          {close && <div className="absolute top-4 right-4">{close}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
