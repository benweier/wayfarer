import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { use } from 'react'
import { useFormState } from 'react-hook-form'
import { cx } from '@/utilities/cx.helper'
import { FormControlContext } from './form-control.component'
import type { HTMLAttributes } from 'react'

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
          className={cx('text-sm mx-1 text-foreground-error-secondary', className)}
          data-has-error={formState.errors[ctx.name] ? 'true' : 'false'}
        >
          {message}
        </div>
      )}
    />
  )
}
