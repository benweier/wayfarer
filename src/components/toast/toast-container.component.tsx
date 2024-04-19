import { Fragment } from 'react'
import { ToastItem } from './toast-item.component'
import { useToastStore } from './toast.store'

export const ToastContainer = () => {
  const toasts = useToastStore((state) => Array.from(state.toasts.entries()))

  return (
    <div className="pointer-events-none fixed right-0 bottom-0 z-99 max-h-full w-full flex flex-col items-center justify-end gap-2 overflow-hidden p-5">
      <ol>
        {toasts.map(([id, toast]) => {
          return (
            <Fragment key={id}>
              <li>
                <ToastItem id={id} toast={toast} />
              </li>
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}
