import { FieldControlContext } from '@/components/forms/form-field-control.component'
import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { cx } from 'class-variance-authority'
import { type HTMLAttributes, use } from 'react'

export const FieldErrorMessage = ({ id, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = use(FieldControlContext)

  if (!ctx) return null

  return (
    <ReactHookFormErrorMessage
      name={ctx.field.name}
      errors={ctx.fieldState?.error}
      render={({ message }) => (
        <div
          {...props}
          id={ctx?.field.name ? `${ctx.field.name}-error` : id}
          className={cx('typography-sm text-foreground-error-secondary mx-1', className)}
        >
          {message}
        </div>
      )}
    />
  )
}
