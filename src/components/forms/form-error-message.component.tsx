import { FormControlContext } from '@/components/forms/form-control.component'
import { ErrorMessage as ReactHookFormErrorMessage } from '@hookform/error-message'
import { type HTMLAttributes, use } from 'react'
import { useFormState } from 'react-hook-form'

export const ErrorMessage = (props: HTMLAttributes<HTMLDivElement>) => {
  const formState = useFormState()
  const ctx = use(FormControlContext)

  if (!ctx) return null

  return (
    <ReactHookFormErrorMessage
      errors={formState.errors}
      name={ctx.name}
      render={({ message }) => (
        <div className="typography-sm text-foreground-error-secondary mx-1" {...props}>
          {message}
        </div>
      )}
    />
  )
}
