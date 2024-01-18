import { cx } from 'class-variance-authority'
import { SYSTEM_TYPE_STYLES } from '@/config/system.styles'
import { type SystemTagProps } from './system-tag.types'

export const SystemTag = ({ type, children }: SystemTagProps) => {
  return <div className={cx('rounded-sm px-2 py-0.5 text-xs font-bold', SYSTEM_TYPE_STYLES[type])}>{children}</div>
}
