import { FC, LabelHTMLAttributes } from 'react'
import { cx } from '@/utilities/cx'

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ className, children, ...props }) => {
  return (
    <label {...props} className={cx('label', className)}>
      {children}
    </label>
  )
}
