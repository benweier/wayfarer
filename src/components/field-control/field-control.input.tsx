import { cx } from 'class-variance-authority'
import { type InputHTMLAttributes, type RefAttributes, use } from 'react'
import { FieldControlContext } from './field-control.component'

export const Input = ({
  id,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>) => {
  const ctx = use(FieldControlContext)

  return (
    <input
      {...ctx}
      {...props}
      id={ctx?.field.name ?? id}
      className={cx('input', className)}
      data-has-error={ctx?.fieldState?.error ? 'true' : 'false'}
      aria-labelledby={ctx?.field.name ? `${ctx.field.name}-label` : props['aria-labelledby']}
      aria-describedby={
        ctx?.field.name ? `${ctx.field.name}-description ${ctx.field.name}-error` : props['aria-describedby']
      }
    />
  )
}
