import { FormControlContext } from '@/components/forms/form-control.component'
import { cx } from 'class-variance-authority'
import { type InputHTMLAttributes, type RefAttributes, use } from 'react'

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>) => {
  const ctx = use(FormControlContext)

  return (
    <input
      {...ctx}
      {...props}
      id={ctx?.name}
      className={cx('input', className)}
      aria-labelledby={ctx?.name ? `${ctx.name}-label` : props['aria-labelledby']}
      aria-describedby={ctx?.name ? `${ctx.name}-description ${ctx.name}-error` : props['aria-describedby']}
    />
  )
}
