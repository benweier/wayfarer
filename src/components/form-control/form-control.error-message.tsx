import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { cx } from 'class-variance-authority'
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
          className={cx('typography-sm text-foreground-error-secondary mx-1', className)}
        >
          {message}
        </div>
      )}
    />
  )
}
