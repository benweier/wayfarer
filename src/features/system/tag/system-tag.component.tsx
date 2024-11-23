import { cx } from '@/utilities/cx.helper'
import type { SystemTagProps } from './system-tag.types'

export const SystemTag = ({ type, className, children }: SystemTagProps) => {
  return (
    <div className={cx('system-tag', className)} data-system-type={type}>
      {children}
    </div>
  )
}
