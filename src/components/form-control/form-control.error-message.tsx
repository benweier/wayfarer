import { cx } from '@/utilities/cx.helper'
import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { type HTMLAttributes, use } from 'react'
import { useFormState } from 'react-hook-form'
import { FormControlContext } from './form-control.component'

export const ErrorMessage = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const formState = useFormState()
  const ctx = use(FormControlContext)

  if (!ctx) return null

  return (
    <ReactHookFormErrorMessage
      name={ctx.name}
      errors={formState.errors}
      render={({ message }) => (
        <div
          {...props}
          id={`${ctx.name}-error`}
          data-has-error={formState.errors[ctx.name] ? 'true' : 'false'}
          className={cx('typography-sm mx-1 text-foreground-error-secondary', className)}
        >
          {message}
        </div>
      )}
    />
  )
}
