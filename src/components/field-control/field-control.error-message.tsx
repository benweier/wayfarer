import { cx } from '@/utilities/cx.helper'
import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { type HTMLAttributes, use } from 'react'
import { FieldControlContext } from './field-control.component'

export const ErrorMessage = ({ id, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
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
          className={cx('typography-sm mx-1 text-foreground-error-secondary', className)}
        >
          {message}
        </div>
      )}
    />
  )
}
