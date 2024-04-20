import { Fragment } from 'react'
import { ToastItem } from './toast-item.component'
import { useToastState } from './toast.store'

export const ToastContainer = () => {
  const toasts = useToastState()

  return (
    <div className="pointer-events-none fixed right-0 bottom-0 z-99 max-h-full w-full flex items-center justify-center overflow-hidden p-5">
      <ol className="flex flex-col gap-2">
        {Array.from(toasts).map(([id, toast]) => {
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
