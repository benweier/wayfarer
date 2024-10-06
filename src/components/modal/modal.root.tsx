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
        if (!isOpen) modal.actions.close()
      }}
    >
      {trigger}

      <Dialog.Portal>
        {overlay}

        <div className="fixed inset-0 z-40 flex h-dvh w-screen items-center justify-center [--dialog-content-max-height:calc(100dvh-1rem)] [--dialog-content-max-width:calc(100vw-1rem)] md:[--dialog-content-max-height:80dvh]">
          <Dialog.Content
            onPointerDownOutside={(event) => {
              event.preventDefault()
            }}
            className={cx(
              'popover flex w-screen max-w-[var(--dialog-content-max-width)] flex-col overflow-clip rounded-xl border-1 border-border-secondary bg-background-primary ring-3 ring-border-primary/20 focus:outline-none',
              {
                'w-auto': size === 'auto',
                // 'inset-0 h-dvh max-h-[calc(100dvh-1rem)]': size === 'full',
                // 'max-h-[var(--dialog-content-max-height)] ': size !== 'full',
                'md:max-w-screen-sm': size === 'sm',
                'md:max-w-screen-md': size === 'md',
                'md:max-w-screen-lg': size === 'lg',
                'md:max-w-screen-xl': size === 'xl',
              },
            )}
            aria-describedby={undefined}
          >
            {children}
            {close && <div className="absolute top-7 right-6 z-50">{close}</div>}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
