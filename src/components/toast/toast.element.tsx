import { cx } from 'class-variance-authority'
import classes from './toast.module.css'
import { type ToastElementProps } from './toast.types'

export const ToastElement = ({ id, toast }: ToastElementProps) => {
  return (
    <div
      id={`toast-${id}`}
      className={cx(classes.toast, 'pointer-events-auto w-full rounded-lg px-4 py-3 md:w-96')}
      data-status={toast.status}
    >
      <div className={classes['toast-label']}>{toast.label}</div>
      {toast.description && <div className={classes['toast-description']}>{toast.description}</div>}
    </div>
  )
}
