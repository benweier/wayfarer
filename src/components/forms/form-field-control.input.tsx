import { FieldControlContext } from '@/components/forms/form-field-control.component'
import { cx } from 'class-variance-authority'
import { type InputHTMLAttributes, type RefAttributes, use } from 'react'

export const FieldInput = ({
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
      aria-labelledby={ctx?.field.name ? `${ctx.field.name}-label` : props['aria-labelledby']}
      aria-describedby={
        ctx?.field.name ? `${ctx.field.name}-description ${ctx.field.name}-error` : props['aria-describedby']
      }
    />
  )
}
