import { clsx } from '@/utilities/clsx.helper'
import type { SystemTagProps } from './system-tag.types'

export const SystemTag = ({ type, className, children }: SystemTagProps) => {
  return (
    <div className={clsx('system-tag', className)} data-system-type={type}>
      {children}
    </div>
  )
}
