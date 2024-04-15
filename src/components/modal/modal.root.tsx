import { Dialog, Transition } from '@headlessui/react'
import { cx } from 'class-variance-authority'
import { Fragment, type PropsWithChildren } from 'react'
import { type ModalDialogProps } from './modal.types'
import { useModalContext } from './use-modal-store.hook'

export const Root = ({
  size = 'auto',
  close,
  disableExternalClose = false,
  children,
}: PropsWithChildren<ModalDialogProps>) => {
  const modal = useModalContext()

  return (
    <Transition appear show={modal.isOpen} as={Fragment} static>
      <Dialog
        as="div"
        className="relative z-10"
        static
        onClose={() => {
          if (disableExternalClose) return
          modal.actions.closeModal()
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
          <div className="backdrop-blur-xs bg-background-primary/20 fixed inset-0" />
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
                  'bg-background-primary border-border-primary ring-border-primary/20 transform overflow-hidden rounded-xl border p-6 ring-3 outline-none transition-all',
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

                {close && <div className="absolute top-2 right-2">{close}</div>}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
