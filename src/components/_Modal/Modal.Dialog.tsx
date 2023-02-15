import { PropsWithChildren, useContext, useRef } from 'react'
import { cx } from '@/utilities/cx'
import { ModalContext } from './Modal.Context'
import { Overlay } from './Modal.Overlay'
import { useClickOutside } from './useClickOutside'
import { useInOutTransition } from './useInOutTransition'
import type { DialogProps } from './modal.types.d'

const Close = () => {
  const { closeModal } = useContext(ModalContext)

  return (
    <button
      className="h-full w-full border-t border-zinc-300 p-3 text-center text-xs text-zinc-700 hover:bg-zinc-200/50 focus:bg-zinc-200/30 focus:outline-none dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700/50 dark:focus:bg-zinc-700/50"
      onClick={closeModal}
    >
      CLOSE
    </button>
  )
}

export const Root = ({ size, overlay = <Overlay />, children }: PropsWithChildren<DialogProps>) => {
  const { isOpen, closeModal, closeOnOutsideClick, onClose, onOpen } = useContext(ModalContext)
  const transition = useInOutTransition(isOpen, 150, isOpen ? onOpen : onClose)
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => {
    if (closeOnOutsideClick) closeModal()
  })

  return (
    <>
      {overlay}
      {transition.stage !== 'exited' && (
        <div
          className={cx(
            'fixed inset-0 z-50 flex h-full items-center justify-center',
            {
              'scale-90 opacity-0': transition.stage === 'appear',
              'scale-100 opacity-100 transition duration-150 ease-in-out': transition.stage === 'entering',
              'scale-100 opacity-100': transition.stage === 'entered',
            },
            {
              'scale-90 opacity-0 transition duration-150 ease-in-out': transition.stage === 'exiting',
            },
          )}
        >
          <div
            ref={ref}
            tabIndex={0}
            role="dialog"
            className={cx(
              'relative m-8 flex max-h-[80vh] flex-col overflow-y-auto rounded-lg border border-zinc-300 bg-zinc-50 bg-opacity-75 p-0 ring ring-zinc-900/5 backdrop-blur-lg focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:bg-opacity-75 dark:ring-zinc-50/10',
              {
                'w-full md:max-w-sm': size === 'sm',
                'w-full md:max-w-2xl': size === 'md',
                'w-full md:max-w-6xl': size === 'lg',
                'md:max-w-screen w-full': size === 'full',
                'min-w-fit max-w-full': size === 'auto',
              },
            )}
          >
            {children}
          </div>
        </div>
      )}
    </>
  )
}

const Title = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex-basis-auto sticky flex-shrink-0 flex-grow-0 bg-zinc-100 p-4 dark:bg-zinc-800/50">
      {children}
    </div>
  )
}

const Content = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="flex-grow-1 flex-shrink-1 flex-basis-auto overflow-y-auto p-4">{children}</div>
}

const Actions = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="flex-basis-auto flex-shrink-0 flex-grow-0 bg-zinc-100 dark:bg-zinc-800/50">{children}</div>
}

export const Dialog = Object.assign(Root, { Close, Title, Content, Actions })
