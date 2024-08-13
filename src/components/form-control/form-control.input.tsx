import { cx } from 'class-variance-authority'
import { type InputHTMLAttributes, type RefAttributes, use } from 'react'
import { useFormState } from 'react-hook-form'
import { FormControlContext } from './form-control.component'

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>) => {
  const ctx = use(FormControlContext)
  const { errors } = useFormState()

  return (
    <input
      {...ctx}
      {...props}
      id={ctx?.name}
      className={cx('input', className)}
      data-has-error={ctx && errors[ctx.name] ? 'true' : 'false'}
      aria-labelledby={ctx?.name ? `${ctx.name}-label` : props['aria-labelledby']}
      aria-describedby={ctx?.name ? `${ctx.name}-description ${ctx.name}-error` : props['aria-describedby']}
    />
  )
}
