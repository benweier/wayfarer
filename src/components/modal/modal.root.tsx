import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { AppIcon } from '@/components/icons'
import { cx } from '@/utilities/cx'
import { type ModalDialogProps } from './modal.types'
import { useModalContext } from './use-modal-store.hook'

export const Root = ({ size = 'auto', closeable = false, children }: WithChildren<ModalDialogProps>) => {
  const { show, handleClose } = useModalContext((state) => ({
    show: state.isOpen,
    handleClose: state.actions.closeModal,
  }))

  return (
    <Transition appear show={show} as={Fragment} static>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
            <div className="flex min-h-full items-center justify-center p-5">
              <Dialog.Panel
                tabIndex={1}
                className={cx(
                  'transform overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 outline-none ring ring-black/5 transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:ring-zinc-50/10',
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
                  <button
                    className="btn btn-icon btn-outline btn-danger absolute right-1 top-1 rounded-lg"
                    onClick={() => {
                      handleClose()
                    }}
                  >
                    <AppIcon id="x" className="h-4 w-4" />
                  </button>
                )}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
