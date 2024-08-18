import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import type { ToastProps } from './toast.types'

export const Toast = ({ title, description, icon, status, onDismiss }: ToastProps) => {
  return (
    <div className="toast relative w-full max-w-full rounded-md p-4 flex gap-3 overflow-hidden" data-status={status}>
      <span className="toast-status absolute inset-y-0 left-0 w-[3px]" />
      <div className="toast-icon grow-0 shrink-0">{icon}</div>

      <div className="toast-content flex flex-col gap-1 grow-1">
        <div className="toast-title typography-base font-bold">{title}</div>
        {description && <div className="toast-description typography-sm">{description}</div>}
      </div>

      {onDismiss && (
        <div className="toast-action grow-0 shrink-0">
          <Button icon aria-label="dismiss" onClick={() => onDismiss()} size="small" kind="flat" intent="neutral">
            <AppIcon id="x" className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
