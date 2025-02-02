import { cx } from '@/utilities/cx.helper'
import { useFieldControl } from './field-control.context'
import type { InputHTMLAttributes, RefAttributes } from 'react'

export function Input({
  id,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & RefAttributes<HTMLInputElement>) {
  const ctx = useFieldControl()

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
