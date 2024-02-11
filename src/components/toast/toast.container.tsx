import { Fragment, useCallback } from 'react'
import { ToastElement } from './toast.element'
import { useToastStore } from './toast.store'

export const ToastContainer = () => {
  const toasts = useToastStore(useCallback((state) => Array.from(state.toasts.entries()), []))

  return (
    <div
      id="toast-container"
      className="pointer-events-none fixed bottom-0 right-0 z-[99999] flex max-h-full w-full flex-col items-center justify-end gap-2 overflow-hidden p-5"
    >
      <ol>
        {toasts.map(([id, toast]) => {
          return (
            <Fragment key={id}>
              <li role="status">
                <ToastElement id={id} toast={toast} />
              </li>
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}
