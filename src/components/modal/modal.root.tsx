import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'
import { Overlay } from './modal.overlay'
import type { ModalDialogProps } from './modal.types'
import { useModalContext } from './use-modal-store.hook'

export const Root = ({
  trigger,
  overlay = <Overlay />,
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
        {overlay}

        <Dialog.Content
          onPointerDownOutside={(event) => {
            event.preventDefault()
          }}
          style={{
            '--dialog-content-max-height': '85dvh',
          }}
          className={cx(
            'popover -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 flex max-h-[var(--dialog-content-max-height)] flex-col overflow-hidden rounded-xl border-1 border-border-secondary bg-background-primary ring-3 ring-border-primary/20 focus:outline-none',
            {
              'w-auto': size === 'auto',
              'w-screen': size === 'full',
              'w-full max-w-screen-sm': size === 'sm',
              'w-full max-w-screen-md': size === 'md',
              'w-full max-w-screen-lg': size === 'lg',
              'w-full max-w-screen-xl': size === 'xl',
            },
          )}
          aria-describedby={undefined}
        >
          {children}
          {close && <div className="absolute top-7 right-6 z-50">{close}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
