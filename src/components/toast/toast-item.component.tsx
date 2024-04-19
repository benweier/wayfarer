import { Button } from '@/components/button'
import { AppIcon } from '@/components/icons'
import { cx } from 'class-variance-authority'
import classes from './toast.module.css'
import type { ToastItemProps } from './toast.types'

export const ToastItem = ({ id, toast }: ToastItemProps) => {
  return (
    <div
      id={`toast-${id}`}
      className={cx(classes.toast, 'w-full rounded-lg py-3 px-4 md:w-96')}
      data-status={toast.status}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className={classes['toast-label']}>{toast.label}</div>
          {toast.description && <div className={classes['toast-description']}>{toast.description}</div>}
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
