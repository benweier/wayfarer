import * as ScrollArea from '@/components/scroll-area'
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
            '--dialog-content-max-height': '85vh',
          }}
          className={cx(
            'popover bg-background-primary border-1 border-border-secondary ring-border-primary/20 fixed top-1/2 left-1/2 z-50 max-h-[var(--dialog-content-max-height)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl ring-3 focus:outline-none',
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
          <ScrollArea.Root height="var(--dialog-content-max-height)">
            <ScrollArea.Viewport className="p-6">
              {children}
              {close && <div className="absolute top-7 right-6">{close}</div>}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="vertical" />
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
