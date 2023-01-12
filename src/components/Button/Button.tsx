import { ButtonHTMLAttributes } from 'react'
import { cx } from '@/utilities/cx'

export const Button = ({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={cx('button', className)}>
      {children}
    </button>
  )
}
