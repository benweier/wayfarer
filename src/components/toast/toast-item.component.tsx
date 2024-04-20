import type { ToastItemProps } from './toast.types'

export const ToastItem = ({ toast }: ToastItemProps) => {
  return (
    <div className="toast w-full rounded-md p-4 md:w-120" data-status={toast.status}>
      <div className="flex grow-0 shrink-0 gap-4">
        {toast.adornment && (
          <div className="toast-adornment flex items-center justify-center size-6">{toast.adornment}</div>
        )}

        <div>
          <div className="toast-title">{toast.title}</div>
          {toast.description && <div className="toast-description">{toast.description}</div>}
        </div>
      </div>
    </div>
  )
}
