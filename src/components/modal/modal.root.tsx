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
          <div className="fixed inset-0 bg-white/50 backdrop-blur-xs dark:bg-black/50" />
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
                  'transform overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 p-6 outline-none ring ring-black/5 transition-all dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-50/10',
                  {
                    'w-auto': size === 'auto',
                    'w-screen': size === 'full',
                    'w-full max-w-screen-sm': size === 'sm',
                    'w-full max-w-screen-md': size === 'md',
                    'w-full max-w-screen-lg': size === 'lg',
                    'w-full max-w-screen-xl': size === 'xl',
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
                    className="absolute right-2 top-2"
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
