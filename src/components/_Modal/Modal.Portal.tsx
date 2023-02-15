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
    const node = ref.current

    if (!node) return

    const trap = createFocusTrap(node)

    try {
      queueMicrotask(() => {
        if (isOpen) {
          try {
            scrollLock.activate()
            trap.activate()
          } catch (err) {
            return
          }
        } else {
          try {
            scrollLock.deactivate()
            trap.deactivate()
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
      scrollLock.deactivate()
      trap.deactivate()
      console.error(err)
      return
    }
  }, [isOpen, scrollLock])

  return (
    <Portal>
      <div ref={ref} className="modal" data-open={String(isOpen)}>
        <button></button>
        {children}
      </div>
    </Portal>
  )
}
