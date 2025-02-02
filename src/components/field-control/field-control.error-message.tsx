import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { useFormState } from 'react-hook-form'
import { cx } from '@/utilities/cx.helper'
import { useFieldControl } from './field-control.context'
import type { HTMLAttributes } from 'react'

export const ErrorMessage = ({ id, className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = useFieldControl()
  const { errors } = useFormState()

  return (
    <ReactHookFormErrorMessage
      name={ctx.field.name}
      errors={errors}
      render={({ message }) => (
        <div
          {...props}
          id={ctx?.field.name ? `${ctx.field.name}-error` : id}
          className={cx('text-sm mx-1 text-foreground-error-secondary', className)}
          data-has-error={ctx.fieldState.invalid ? 'true' : 'false'}
        >
          {message}
        </div>
      )}
    />
  )
}
