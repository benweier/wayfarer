import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { cx } from 'class-variance-authority'
import type { PropsWithChildren } from 'react'
import type { ModalDialogProps } from './modal.types'
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
          onPointerDownOutside={(event) => {
            event.preventDefault()
          }}
          style={{
            '--dialog-content-max-height': '85vh',
          }}
          className={cx(
            'popover bg-background-primary border-border-primary ring-border-primary/20 fixed top-1/2 left-1/2 z-50 max-h-[var(--dialog-content-max-height)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl ring-3 focus:outline-none',
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
          <ScrollArea.Root className="max-h-[var(--dialog-content-max-height)] overflow-hidden" type="scroll">
            <ScrollArea.Viewport className="relative h-full max-h-[var(--dialog-content-max-height)] p-6">
              {children}

              {close && <div className="absolute top-4 right-4">{close}</div>}
            </ScrollArea.Viewport>

            <ScrollArea.Scrollbar
              className="bg-background-secondary flex touch-none rounded-tr-md rounded-br-md p-0.5 transition-colors duration-100 ease-out select-none data-[orientation=vertical]:w-3"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="bg-background-quaternary relative flex-1 rounded-full" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
