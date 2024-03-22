import { Dialog, Transition } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { Fragment, type PropsWithChildren } from 'react'
import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { type ModalDialogProps } from './modal.types'
import { useModalContext } from './use-modal-store.hook'

export const Root = ({
  size = 'auto',
  closeable = false,
  disableExternalClose = false,
  children,
}: PropsWithChildren<ModalDialogProps>) => {
  const { show, handleClose } = useModalContext((state) => ({
    show: state.isOpen,
    handleClose: state.actions.closeModal,
  }))

  return (
    <Transition appear show={show} as={Fragment} static>
      <Dialog
        as="div"
        className="relative z-10"
        static
        onClose={() => {
          if (disableExternalClose) return
          handleClose()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="backdrop-blur-xs fixed inset-0 bg-white/50 dark:bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-150"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <div className="flex justify-center p-6">
              <Dialog.Panel
                className={cx(
                  'transform overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-6 ring-3 ring-black/5 outline-none transition-all dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-50/10',
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

                {closeable && (
                  <Button
                    intent="danger"
                    kind="outline"
                    size="small"
                    icon
                    className="absolute top-2 right-2"
                    onClick={() => {
                      handleClose()
                    }}
                  >
                    <AppIcon id="x" className="size-3" />
                  </Button>
                )}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
