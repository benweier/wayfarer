import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import type { ToastProps } from './toast.types'

export const Toast = ({ title, description, icon, status, onDismiss }: ToastProps) => {
  return (
    <div className="toast relative flex w-full max-w-full gap-3 overflow-hidden rounded-md p-4" data-status={status}>
      <span className="toast-status absolute inset-y-0 left-0 w-[3px]" />
      <div className="toast-icon shrink-0 grow-0">{icon}</div>

      <div className="toast-content flex grow-1 flex-col gap-1">
        <div className="toast-title text-base font-bold">{title}</div>
        {description && <div className="toast-description text-sm">{description}</div>}
      </div>

      {onDismiss && (
        <div className="toast-action shrink-0 grow-0">
          <Button icon aria-label="dismiss" onClick={() => onDismiss()} size="small" kind="flat" intent="neutral">
            <AppIcon id="x" className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
