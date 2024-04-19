import { cx } from 'class-variance-authority'
import { useContext } from 'react'
import { ModalContext } from './Modal.Context'
import type { OverlayProps } from './modal.types'
import { useInOutTransition } from './useInOutTransition'

export const Overlay = ({ variant = 'auto' }: OverlayProps) => {
  const { isOpen } = useContext(ModalContext)
  const transition = useInOutTransition(isOpen, 150)

  return (
    <>
      {transition.stage !== 'exited' && (
        <div
          className={cx(
            'fixed inset-0 z-50 backdrop-blur-sm',
            {
              'bg-white/60': variant === 'light',
              'bg-black/40': variant === 'dark',
              'bg-white/75 dark:bg-black/75': variant === 'auto',
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
