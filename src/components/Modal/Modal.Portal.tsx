import { createFocusTrap } from 'focus-trap'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useEscapeKey } from './useEscapeKey'
import { useScrollLock } from './useScrollLock'
import type { ModalContextType } from './modal.types.d'

const Portal = ({ children }: PropsWithChildren<unknown>) => createPortal(children, document.body)

export const Modal = ({ isOpen, closeModal, closeOnEsc, children }: PropsWithChildren<ModalContextType>) => {
  const ref = useRef<HTMLDivElement>(null)
  const scrollLock = useScrollLock()

  useEscapeKey(() => {
    if (closeOnEsc) closeModal()
  })

  useEffect(() => {
    if (!ref.current) return

    try {
      const trap = createFocusTrap(ref.current)

      queueMicrotask(() => {
        if (isOpen) {
          try {
            scrollLock.activate()
            trap.activate()
          } catch (err) {
            return
          }
        }
      })

      return () => {
        try {
          scrollLock.deactivate()
          trap.deactivate()
        } catch (err) {
          return
        }
      }
    } catch (err) {
      return
    }
  }, [isOpen, scrollLock])

  return (
    <Portal>
      <div ref={ref} className="modal" data-open={String(isOpen)}>
        {children}
      </div>
    </Portal>
  )
}
