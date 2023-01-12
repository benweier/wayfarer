import { useContext } from 'react'
import { cx } from '@/utilities/cx'
import { ModalContext } from './Modal.Context'
import { OverlayProps } from './modal.types'
import { useInOutTransition } from './useInOutTransition'

export const Overlay = ({ variant = 'auto' }: OverlayProps) => {
  const { isOpen } = useContext(ModalContext)
  const transition = useInOutTransition(isOpen, 150)

  return (
    <>
      {transition.stage !== 'exited' && (
        <div
          className={cx(
            'backdrop-blur-xs fixed inset-0 z-50',
            {
              'bg-neutral-100 bg-opacity-60': variant === 'light',
              'bg-neutral-900 bg-opacity-40': variant === 'dark',
              'bg-neutral-100 bg-opacity-75 dark:bg-neutral-900 dark:bg-opacity-75': variant === 'auto',
            },
            {
              'opacity-0': transition.stage === 'appear',
              'opacity-100 transition duration-150 ease-in-out': transition.stage === 'entering',
              'opacity-100': transition.stage === 'entered',
            },
            {
              'opacity-0 transition duration-150 ease-in-out': transition.stage === 'exiting',
            },
          )}
        />
      )}
    </>
  )
}
