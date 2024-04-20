import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import type { ToastItemProps } from './toast.types'

export const ToastItem = ({ id, toast }: ToastItemProps) => {
  return (
    <div id={`toast-${id}`} className={'toast w-full rounded-lg py-3 px-4 md:w-96'} data-status={toast.status}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className={'toast-label'}>{toast.label}</div>
          {toast.description && <div className={'toast-description'}>{toast.description}</div>}
        </div>
        <div>
          <Button icon>
            <AppIcon id="x" className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
