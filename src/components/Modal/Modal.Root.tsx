import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useModalContext } from '@/components/Modal/useModalContext.hook'
import { cx } from '@/utilities/cx'

export const Root = ({ size = 'md', children }: WithChildren<{ size?: 'sm' | 'md' | 'lg' }>) => {
  const { show, onClose } = useModalContext((state) => ({ show: state.isOpen, onClose: state.closeModal }))

  return (
    <Transition appear show={show} as={Fragment} static>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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
            <div className="flex min-h-full items-center justify-center px-4 py-16">
              <Dialog.Panel
                className={cx(
                  'w-full transform overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 ring ring-black/5 transition-all dark:border-zinc-700 dark:bg-zinc-800 dark:ring-zinc-50/10',
                  {
                    'max-w-md': size === 'sm',
                    'max-w-xl': size === 'md',
                    'max-w-5xl': size === 'lg',
                  },
                )}
              >
                {children}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
